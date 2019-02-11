import * as React from 'react';
import { observer } from 'mobx-react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import './TextAreaRedactor.css';

@observer
export class TextAreaRedactor extends React.Component<any, {}> {

    state = {
        editorValue: EditorState.createEmpty()
    };

    componentDidMount = () => {
        const contentBlock = htmlToDraft(this.props.value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorValue: editorState,
            });
        }
    }

    onEditorStateChange = (editor) => {
        const editorHTML = draftToHtml(convertToRaw(editor.getCurrentContent()));
        this.setState({
            editorValue: editor,
            editorHTML: editorHTML 
        });
        this.props.onChange(editorHTML);
    }

    // uploadImageCallBack = (file) => {
    // }

    render() {
        return (
            <div className="my-class">
                <Editor
                    editorState={this.state.editorValue}
                    onEditorStateChange={this.onEditorStateChange}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbarClassName="demo-toolbar"
                    // toolbar={{
                    //     image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    // }}
                />
            </div>
        );
    }
}