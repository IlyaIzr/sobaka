import React from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      const contentState = editorState.getCurrentContent();
      this.saveContent(contentState);
      this.state.editorState = editorState;
    }
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.handleChange = this._handleChange.bind(this);
    
    const content = window.localStorage.getItem('content');

    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }

  };
  state = {
    title: '',
    content: '',
    editorState: EditorState.createEmpty()
  };

  componentDidMount(){
    this.refs.editor.focus();
  };
  
  saveContent = (content) => {
    //console.log(content);    
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    this.setState({content: JSON.stringify(convertToRaw(content))})
  };  
  _handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.content) {
      this.props.createProject(this.state)
    };
    window.localStorage.removeItem("content");        
    this.props.history.push('/');     //this is router property history, it'll push us back tu parentheses directory
  };

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  };
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  };
  render() {
    const {editorState} = this.state;
    const { auth } = this.props
    //console.log(this.state.content.length)
    let className = 'RichEditor-editor form-group px-2 py-0 rounded ';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    };
    
    return (
      <div className="container my-2 text-light">
        <div className="row">
          <div className="col-0 col-lg-2"></div>
          <div className="col-12 col-lg-8">
            <form className="" onSubmit={this.handleSubmit}>
              <fieldset>
                <div className="form-group">                  
                  <label htmlFor="title">Название</label>
                  <input className="form-control" type="text" id='title' onChange={this.handleChange} />
                </div>
              <div className="form-group">
                    <div className={className} id="toInvis" onClick={this.focus}>
                      <Editor           
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        ref="editor"
                        spellCheck={true}
                        className="form-control "
                        id="content"
                        placeholder="напишите что-то ниже"
                      />
                      <div className="RichEditor-root rounded mb-3 ">
                    <InlineStyleControls
                      editorState={editorState}
                      onToggle={this.toggleInlineStyle}
                    />
                      
                {(auth.uid) ?
                    (this.state.content.length>135) ? (
                    <div className="text-right text-dark">
                    <button className="btn btn-outline-light btn-sm purple">Отправить</button>
                    </div>) :
                    (<div className="text-right text-light">
                    <button className="btn btn-outline-light btn-sm" disabled data-toggle="tooltip"
        data-placement="top" title="Напишите больше">не отправить...</button>
                    </div>
                    )
                : 
                <div className="text-muted text-right" data-toggle="tooltip"
                data-placement="top" title="Вы можете зарегестрироваться">Вы не вошли в профиль, данные сохранятся в браузере
                </div>
                }                      
                    </div>


                  </div>
              </div>
              </fieldset> 
            </form>
          </div>
        </div>
      </div>
    );
  }
};

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
};

var INLINE_STYLES = [
  {label: 'Bold ', style: 'BOLD'},
  {label: 'Italic ', style: 'ITALIC'},
  {label: 'Underline ', style: 'UNDERLINE'},
  {label: 'Monospace ', style: 'CODE'},
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  };
};

const mapStateToProps = (state) => {
  //console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
