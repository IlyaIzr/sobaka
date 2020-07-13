import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../store/actions/projectActions';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import { useHistory } from 'react-router-dom';
import InlineStyleControls from '../components/draftjs/InlineStyleControls';
import SaveButtons from '../components/SaveButtons';

const CreateProject = ({ createProject, auth }) => {
  const history = useHistory();
  const content = window.localStorage.getItem('content');
  let initEditorState;
  if (content) {
    initEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  } else {
    initEditorState = EditorState.createEmpty();
  }

  const [editorState, setEditorState] = React.useState(initEditorState);
  const [formState, setFormState] = useState({
    title: '',
    content: ''
  });

  const editorRef = useRef(null);
  
  useEffect(() => {editorRef.current.focus()}, [])

  const saveContent = content => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    setFormState({ ...formState, content: JSON.stringify(convertToRaw(content)) })
  };

  const onChange = editorStateProp => {
    const contentState = editorStateProp.getCurrentContent();
    saveContent(contentState);
    setEditorState(editorStateProp);
  }

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formState.content) {
      createProject({ ...formState, ...editorState })
    };
    window.localStorage.removeItem("content");
    history.push('/');
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = e => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = inlineStyle => {
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  };

  let className = 'RichEditor-editor form-group px-2 py-0 rounded ';
  const contentState = editorState.getCurrentContent();
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
          <form className="" onSubmit={handleSubmit}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="title">Название</label>
                <input className="form-control" type="text" id='title' onChange={handleChange} />
              </div>
              <div className="form-group">
                <div className={className} id="toInvis">
                  <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    spellCheck={true} 
                    ref={editorRef}
                    className="form-control "
                    id="content"
                    placeholder="напишите что-то ниже"
                  />
                  <div className="RichEditor-root rounded mb-3 ">
                    <InlineStyleControls
                      editorState={editorState}
                      onToggle={toggleInlineStyle}
                    />
                    
                    <SaveButtons uid={auth.uid} contentLength={formState.content.length}/>                    
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

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
