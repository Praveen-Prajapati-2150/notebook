import React from 'react';

const TextArea = (props: any) => {
  const { text, handleChange } = props;

  return (
    <textarea
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        padding: '0 30%',
        fontSize: '13px',
        color: '#b7b7b7',
        outline: 'none',
        border: 'none',
        lineHeight: '23px',
        fontWeight: '300',
        // fontFamily: 'cousine',
        // gap: '5px',
        scrollbarWidth: 'thin',
        scrollBehavior: 'smooth',
        scrollbarColor: 'transparent',
        letterSpacing: '1px',
        // scrollPadding-bottom: '0px',
        // width: 100%;
        // padding: `calc(1em + 65px) max(-372px + 50vw, 1em) 5em`,
        // height: 100vh;
      }}
      spellCheck={true}
      className="background-transparent"
      value={text}
      onChange={handleChange}
      placeholder="Type your notes here..."
    />
  );
};

export default TextArea;
