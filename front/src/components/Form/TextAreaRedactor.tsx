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
        editorValue: '',
        editorHTML: this.props.value,
    };

    // addCopyPasteHandler = () => {
    //     const area = document.getElementById('copyPasteField');
    //     if (!area) {
    //         return;
    //     }
    //     area.onpaste = (event: any) => {
    //         var items = event.clipboardData.items;
    //         for (let index in items) {
    //             if (index) {
    //                 var item = items[index];
    //                 if (item.kind === 'file') {
    //                     var blob = item.getAsFile();
    //                     var reader = new FileReader();
    //                     reader.onload = (e: any) => {
    //                         this.updateTextField(e.target.result);
    //                     };
    //                     reader.readAsDataURL(blob);
    //                 }
    //             }
    //         } 
    //     };
    // }

    componentDidUpdate = () => {
        // console.log('Updated value', this.props.value)
    }

    componentDidMount = () => {
        // console.log('Mounted value', this.props.value)
        const contentBlock = htmlToDraft(this.props.value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorValue: editorState,
            });
        }

        // setTimeout(() => {
        //     this.addCopyPasteHandler();
        // }, 500);
    }

    // updateTextField = (imgData) => {
    //     let newTextareaValue = this.state.editorHTML.slice();
    //     newTextareaValue = newTextareaValue + `<img width="300" height="auto" src="${imgData}" alt=""><br><p></p>`;
    //     const contentBlock = htmlToDraft(newTextareaValue);
    //     if (contentBlock) {
    //         const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    //         const editorState = EditorState.createWithContent(contentState);
    //         this.setState({
    //             editorValue: editorState,
    //         });
    //         this.props.onChange(newTextareaValue);
    //     }
    // }

    onEditorStateChange = (editor) => {
        const editorHTML = draftToHtml(convertToRaw(editor.getCurrentContent()));
        this.setState({
            editorValue: editor,
            editorHTML: editorHTML 
        });
        // const emptyTagIndex = editorHTML.indexOf('<p></p>');
        // let cleanedHTML = '';
        // if (emptyTagIndex !== -1) {
        //     cleanedHTML = editorHTML.split('<p></p>').join('');
        // } else {
        //     cleanedHTML = editorHTML;
        // }
        // this.props.onChange(cleanedHTML);
        this.props.onChange(editorHTML);
    }

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', 'https://api.imgur.com/3/image');
              xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
              const data = new FormData();
              data.append('image', file);
              xhr.send(data);
              xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
              });
              xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
              });
            }
          );

        // return new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onload = () => {
        //         const obj = {
        //             data: {link: reader.result}
        //         };
        //       resolve(obj);
        //     };
        //     reader.onerror = error => {
        //       reject(error);
        //     };
        //   });
    }

    render() {
        if (!this.state.editorValue) {
            return null;
        }
        return (
            <div id="copyPasteField">
                <Editor
                    editorState={this.state.editorValue}
                    onEditorStateChange={this.onEditorStateChange}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbarClassName="demo-toolbar"
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'image', 'textAlign', ],
                        inline: {
                            options: ['bold', 'italic', 'underline'],
                        },
                        textAlign: {
                            options: ['left', 'center', 'right', 'justify'],
                        },
                        image: {
                            defaultSize: {
                                height: 'auto',
                                width: '300px',
                            },  
                            uploadCallback: this.uploadImageCallBack,
                            // alt: {present: true, mandatory: true},
                            previewImage: true 
                        },
                    }}
                />
            </div>
        );
    }
}