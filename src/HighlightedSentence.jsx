//import { useEffect } from 'react';
import React, { useState } from 'react';
import './HighlightedSentence.css';

const HighlightedSentence = ({ sentence, matchedPos }) => {
  const [level, setLevel] = useState(3);
  const [previousLevel, setPreviousLevel] = useState(level);
  const [prevLevel4DoubleClick, setPrevLevel4DoubleClick] = useState(level);
  const [showTranslation, setShowTranslation] = useState(true);
  const [fontsize, setFontsize] = useState(1.2);
  //const [wordArray_Full] = useState(sentence.split("||")[0].split(' '));

  const handleButtonPress = (newLevel) => {
    setLevel(newLevel);
  };

  const handleFullButtonPress = (e) => {
    //console.log('full button press, level=', level);
    setPreviousLevel(level);
    setLevel(0);
  };

  const handleFullButtonRelease = (e) => {
    //console.log('full button release, level=', level);
    setLevel(previousLevel);
  };

  const handleFullButtonDoubleClick = () => {
    if (level === 0) {
      //console.log('double click,level should be 0, =', level,"prevousLevel=",previousLevel);
      setLevel(prevLevel4DoubleClick);
    }else{
      //console.log('double click,should not 0, level=', level);
      setPrevLevel4DoubleClick(level);
      setLevel(0);
    }
  };

  const handleShowTranslationButtonPress = () => {
    setShowTranslation(!showTranslation);
  }
  
  //let fontsize = 1.0;
  const handleFontSize = () => {
    let new_size = fontsize + 0.1;
    if (new_size > 1.5) {
      new_size = 1.0;
    }
    setFontsize(new_size);
    //console.log("fontsize=", fontsize,"new_size=",new_size);
    const elements = document.getElementsByClassName('english-text');
    elements[0].style.fontSize = new_size + 'em';

  }
  //console.log("translation",showTranslation);
  const wordArray = sentence.split("||")[level].split(' ');
  const wordArray_Full = sentence.split("||")[0].split(' ');
  //const nolcs_pos = findNonOverlappingLCS(sentence, text); //ordered as the same order of appearance in sentence.
  //console.log('nolcs=', nolcs_pos);
  const wordlist = wordArray.map((word, i) => {
    //let returnvalue: JSX.Element;
    if (matchedPos[i]) {
      wordArray[i] = wordArray_Full[i];
      return (
        <p className="word" style={{ color: 'green' }} key={i}>
          {wordArray_Full[i] + ' '}
        </p>
      );
    } else {
      return (
        <p className="word" key={i}>
          {word + ' '}
        </p>
      );
    }
  });

  return (
    <div>
      <div style={{alignItems: 'center', display: 'flex',justifyContent:'center', marginBottom:'5px'}} >
                <button onMouseDown={handleFontSize}>
            Font Size
          </button>
      </div>
      <div className="highlighted-sentence">
        <div className="english-text-and-translation">
          {/* Render the highlighted sentence here based on the matchedPos */}
          <div className="english-text">{wordlist}</div>
          <div className="translation" >
            {showTranslation ? sentence.split("||")[6] : ''}
          </div>
        </div>
        <div className="blanklevel-controls">
          <button id='fulltext-button'
            onMouseDown={handleFullButtonPress}
            onTouchStart={handleFullButtonPress}
            onMouseUp={handleFullButtonRelease}
            onTouchEnd={handleFullButtonRelease}
            onDoubleClick={handleFullButtonDoubleClick}
            >Full
          </button>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button 
              key={lvl} onMouseDown={() => handleButtonPress(lvl)}
              {...(level === lvl ? { style: { backgroundColor:'#bbb' } } : {})}
            >
              Lev {lvl}
            </button>
          ))}
          <button onMouseDown={handleShowTranslationButtonPress} style={{ marginLeft: '5px' }}>
            CHN
          </button>
        </div>

      </div>



    </div>
  );
};

export default HighlightedSentence;
