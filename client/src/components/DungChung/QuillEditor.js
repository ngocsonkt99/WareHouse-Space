import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';
import { message } from 'antd';
const QuillClipboard = Quill.import('modules/clipboard');
const Parchment = Quill.import('parchment');

class Clipboard extends QuillClipboard {

    getMetaTagElements = (stringContent) => {
        const el = document.createElement('div');
        el.innerHTML = stringContent;
        return el.getElementsByTagName('meta');
    };

    async onPaste(e) {
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = await clipboardData.getData('Text');

        const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
        if (urlMatches.length > 0) {
            e.preventDefault();
            urlMatches.forEach(link => {
                axios.get(link)
                    .then(payload => {
                        // let title, image, url, description;
                        let title, image, url;
                        for (let node of this.getMetaTagElements(payload)) {
                            if (node.getAttribute("property") === "og:title") {
                                title = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:image") {
                                image = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:url") {
                                url = node.getAttribute("content");
                            }
                            // if (node.getAttribute("property") === "og:description") {
                            //     description = node.getAttribute("content");
                            // }
                        }

                        const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

                        let range = this.quill.getSelection();
                        let position = range ? range.index : 0;
                        this.quill.pasteHTML(position, rendered, 'silent');
                        this.quill.setSelection(position + rendered.length);
                    })
                    .catch(error => console.error(error));
            });

        } else {
            //console.log('when to use this') 보통 다른 곳에서  paste 한다음에  copy하면 이쪽 걸로 한다. 
            super.onPaste(e);
        }
    }

}
Quill.register('modules/clipboard', Clipboard, true);

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create();
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        imgTag.setAttribute('width', '100%');
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {

    static create(value) {
        if (value && value.src) {
            const videoTag = super.create();
            videoTag.setAttribute('src', value.src);
            videoTag.setAttribute('title', value.title);
            videoTag.setAttribute('width', '100%');
            videoTag.setAttribute('controls', '');

            return videoTag;
        } else {
            const iframeTag = document.createElement('iframe');
            iframeTag.setAttribute('src', value);
            iframeTag.setAttribute('frameborder', '0');
            iframeTag.setAttribute('allowfullscreen', true);
            iframeTag.setAttribute('width', '100%');
            return iframeTag;
        }
    }

    static value(node) {
        if (node.getAttribute('title')) {
            return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
        } else {
            return node.getAttribute('src');
        }
        // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
    }

}

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class QuillEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    onPollsChange;
    _isMounted;

    constructor(props) {
        super(props);

        this.state = {
            editorHtml: "",
            files: [],
        };

        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
        this.inputOpenFileRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (html) => {
        console.log('html', html)
        // https://youtu.be/BbR-QCoKngE
        // https://www.youtube.com/embed/ZwKhufmMxko
        // https://tv.naver.com/v/9176888
        // renderToStaticMarkup(ReactHtmlParser(html, options));

        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    // I V F P들을  눌렀을떄 insertImage: this.imageHandler로 가서  거기서 inputOpenImageRef를 클릭 시킨다. 
    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    videoHandler = () => {
        this.inputOpenVideoRef.current.click();
    };

    fileHandler = () => {
        this.inputOpenFileRef.current.click();
    };


    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            console.log(file.name);
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot);
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    storage.ref('images').child(file.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            const quill = this.reactQuillRef.getEditor();
                            quill.focus();

                            let range = quill.getSelection();
                            let position = range ? range.index : 0;
                            quill.insertEmbed(position, "image", { src: fireBaseUrl });
                            quill.setSelection(position + 1);

                            if (this._isMounted) {
                                this.setState({
                                    files: [...this.state.files, file]
                                }, () => { this.props.onFilesChange(this.state.files) });
                            }
                            else {
                                return message.err('Upload file thất bại');
                            }
                        })
                })
        }
    };

    insertVideo = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            console.log(file.name);
            const uploadTask = storage.ref(`/videos/${file.name}`).put(file);
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot);
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    storage.ref('videos').child(file.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            const quill = this.reactQuillRef.getEditor();
                            quill.focus();

                            let range = quill.getSelection();
                            let position = range ? range.index : 0;
                            quill.insertEmbed(position, "video", { src: fireBaseUrl });
                            quill.setSelection(position + 1);

                            if (this._isMounted) {
                                this.setState({
                                    files: [...this.state.files, file]
                                }, () => { this.props.onFilesChange(this.state.files) });
                            }
                            else {
                                return message.error('Up load file thất bại')
                            }
                        })
                })
        }
    }

    render() {
        return (
            <div style={{ height: 450 }}>
                <div id="toolbar">
                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="1" />
                        <option value="2" />
                        <option value="" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-insertImage">
                        <i className="far fa-file-image"></i>
                    </button>
                    <button className="ql-insertVideo">
                        <i className="fas fa-file-video"></i>
                    </button>
                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-video" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />



                </div>
                <ReactQuill
                    style={{ height: 400 }}
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                />
                <input type="file" accept="image/*" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />
                <input type="file" accept="video/*" ref={this.inputOpenVideoRef} style={{ display: "none" }} onChange={this.insertVideo} />
            </div>
        )
    }

    modules = {
        // syntax: true,
        toolbar: {
            container: "#toolbar",
            //id ="toorbar"는  그 위에 B I U S I V F P 이거 있는 곳이다. 
            handlers: {
                insertImage: this.imageHandler,
                insertVideo: this.videoHandler
            }
        },

    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'image', 'video', 'link', "code-block", "video-link", "blockquote", "clean"
    ];
}

export default QuillEditor;