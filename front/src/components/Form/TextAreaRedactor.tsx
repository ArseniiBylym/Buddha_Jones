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
        editorValue: EditorState.createEmpty(),
        editorHTML: this.props.value,
    };

    addCopyPasteHandler = () => {
        const area = document.getElementById('copyPasteField');
        if (!area) {
            return;
        }
        area.onpaste = (event: any) => {
            var items = event.clipboardData.items;
            for (let index in items) {
                if (index) {
                    var item = items[index];
                    if (item.kind === 'file') {
                        var blob = item.getAsFile();
                        var reader = new FileReader();
                        reader.onload = (e: any) => {
                            this.updateTextField(e.target.result);
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            } 
        };
    }

    componentDidMount = () => {
        const contentBlock = htmlToDraft(this.props.value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorValue: editorState,
            });
        }

        setTimeout(() => {
            this.addCopyPasteHandler();
        }, 500);
    }

    updateTextField = (imgData) => {
        let newTextareaValue = this.state.editorHTML.slice();
        newTextareaValue = newTextareaValue + `<img width="300" height="auto" src="${imgData}" alt="">`;
        const contentBlock = htmlToDraft(newTextareaValue);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorValue: editorState,
            });
            this.props.onChange(newTextareaValue);
        }
    }

    onEditorStateChange = (editor) => {
        const editorHTML = draftToHtml(convertToRaw(editor.getCurrentContent()));
        this.setState({
            editorValue: editor,
            editorHTML: editorHTML 
        });
        const emptyTagIndex = editorHTML.indexOf('<p></p>');
        let cleanedHTML = '';
        if (emptyTagIndex !== -1) {
            cleanedHTML = editorHTML.split('<p></p>').join('');
        } else {
            cleanedHTML = editorHTML;
        }
        this.props.onChange(cleanedHTML);
    }

    // uploadImageCallBack = (file) => {
    // }

    render() {
        return (
            <div id="copyPasteField">
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