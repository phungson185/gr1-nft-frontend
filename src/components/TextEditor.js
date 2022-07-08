import { useEffect, useRef, useState } from 'react';

const TextEditor = ({ name, onChangeComment }) => {
  const [isReady, setIsReady] = useState(false);

  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setIsReady(true);
  }, []);

  return (
    <>
      {isReady && (
        <CKEditor
          name={name}
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChangeComment(data);
          }}
        />
      )}
    </>
  );
};

export default TextEditor;
