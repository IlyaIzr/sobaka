import React from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

class ReadDraft extends React.Component {  
  constructor(props) {
    super(props);
    const content = window.localStorage.getItem('content');
    if (content) {
      this.state1.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)));
    } else {
      this.state1.editorState = EditorState.createEmpty();
    }
  };

  state1 ={
    editorState: EditorState.createEmpty()
  };

  render() {
    const texto = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)))
    const options = {weekday: 'long', hour: 'numeric', minute: 'numeric', day: '2-digit', year: 'numeric', month: '2-digit', era: 'long'}
    return (
      <div className="row">
        <div className="row col-0 col-md-1 col-lg-2 col-xl-3"></div>
        <div className="col-12    col-md-10 col-lg-8 col-xl-6">
          <div className="card allblack">
            <div className="card-body bg-dark allblack">
              <h4 className="card-title  allblack" id='title'>{this.props.title}</h4>
                <Editor
                  editorState={texto}
                  className="card-text px-5 "
                  readOnly={true}
                />
              <div className="card-subtitle text-muted text-right">
                  <div>{this.props.authorFirstName}</div>
                  <div>{this.props.createdAt.toDate().toLocaleDateString("ru-RU", options)}</div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    )
  };
};

export default ReadDraft;