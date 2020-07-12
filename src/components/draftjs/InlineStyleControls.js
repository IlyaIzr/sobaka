import React from 'react';
import StyleButton from './StyleButton';

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  const INLINE_STYLES = [
    { label: 'Bold ', style: 'BOLD' },
    { label: 'Italic ', style: 'ITALIC' },
    { label: 'Underline ', style: 'UNDERLINE' },
    { label: 'Monospace ', style: 'CODE' },
  ];

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default InlineStyleControls;