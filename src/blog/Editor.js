import { memo, useEffect, useRef } from 'react';
import Quill from 'quill';

import '../../node_modules/quill/dist/quill.bubble.css';
import '../../node_modules/quill/dist/quill.core.css';

const Editor = memo(
  ({ value, onChange }) => {
    const ref = useRef();

    useEffect(() => {
      const editor = new Quill(ref.current, {
        theme: 'bubble',
      });

      editor.on('text-change', () => {
        if (!onChange) return;
        onChange(editor.root.innerHTML);
      });
    }, [onChange]);

    return <div ref={ref} dangerouslySetInnerHTML={{ __html: value }} />;
  },
  () => {
    return true;
  },
);

export default Editor;
