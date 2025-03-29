import ReactQuill from 'react-quill';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = forwardRef<any, RichTextEditorProps>(
  ({ value, onChange, placeholder = "Write your content here..." }, ref) => {
    const quillRef = useRef<any>(null);
    
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (quillRef.current) {
          quillRef.current.focus();
        }
      },
      clear: () => {
        if (quillRef.current) {
          quillRef.current.getEditor().setText('');
        }
      },
      getEditor: () => {
        if (quillRef.current) {
          return quillRef.current.getEditor();
        }
        return null;
      },
    }));

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }]
      ]
    };

    return (
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;