import React from 'react';
import './Preview.css';
import { connect } from 'react-redux';
import { Editor } from 'draft-js';
import * as actionTypes from '../../store/actions';

const mapStateToProps = state => {
  return {
    editorState: state.previewContent,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    editEditorStateHandler: (editorState) => dispatch({
      type: actionTypes.EDIT_PREVIEW_CONTENT,
      content: editorState,
    })
  };
}

const Preview = (props) => {
  const editor = React.useRef(null);

  return (
    <div className="editorContainer">
      <div className="paper">
        <Editor
          ref={editor}
          editorState={props.editorState}
          onChange={editorState => props.editEditorStateHandler(editorState)}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);