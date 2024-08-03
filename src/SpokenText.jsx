import React from 'react';

const SpokenText = ({ spokenText, matchedPos }) => {
  const wordArray = spokenText.replace(/^\s/, "").split(' '); //remove leading space
  //console.log('enter spokenText. wordArray=',wordArray);
  const wordlist = wordArray.map((word, i) => {
    //let returnvalue: JSX.Element;
        if (matchedPos[i]) {
      return (
        <p className="word" style={{ color: 'green' }} key={i}>
          {word + ' '}
        </p>
      );
    } else {
      return (
        <p className="word" style={{ color: 'red' }} key={i}>
          {word + ' '}
        </p>
      );
    }
  });
  return (
    <div style={{
      backgroundColor:'white', 
      minHeight:'80px',
      marginTop:'-8px',
      marginLeft:'4px',
      marginRight:'4px',
      padding:'5px',
      paddingTop:'12px', 
      borderRadius:'5px', 
      transition:'0.3s', 
      border:'1px solid'}}>
      {wordlist}
      
    </div>
  );
}

export default SpokenText;
