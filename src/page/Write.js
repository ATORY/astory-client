import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

import { Head } from '../components';
import './Write.css';

var Size = Quill.import('attributors/style/size');
Size.whitelist = ['15px', '16px', '18px'];
Quill.register(Size, true);

class Write extends React.Component {

  constructor(props) {
    super(props);
    this.writer = null;
    this.modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['code-block'],
        [{ 'color': [] }, { 'background': [] }],
        // ['clean']
      ],
    };

    this.formats = [
      'header', 'color', 'background',
      'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
      'list', 'bullet', 'indent',
      'link', 'image', 
    ];
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  componentDidMount() {
    this.writer.focus();
  }

  render() {
    return (
      <div>
        <Head />
        <div className="write write-wrapper">
          <ReactQuill ref={(quill) => { this.writer = quill; }}
                      theme="snow" 
                      placeholder='a story'
                      modules={this.modules}
                      formats={this.formats}
                      value={this.state.text}
                      onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}


export default Write;
