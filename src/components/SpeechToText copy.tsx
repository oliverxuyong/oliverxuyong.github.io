import React, { useState, useEffect } from 'react';
import { replaceNumbersWithWords } from './MyLib.js';
//import { fabClasses } from '@mui/material';

const speechRecognition =
(window as unknown as Window & { SpeechRecognition: any }).SpeechRecognition || (window as unknown as Window & { webkitSpeechRecognition: any }).webkitSpeechRecognition;
if (!speechRecognition) {
alert('Speech Recognition API is not supported in this browser');
//return;
}
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
//recognition.lang = 'cmn-Hans-CN'; // 设置为普通话中文

//好像没有这个方法 recognition.timeout = 30000;
//recognition.maxAlternatives = 1; //xu


const SpeechToText = ({sendTextToParent,playBackStatus}) => {

  console.log('enter SpeechToText()...', "playBackStatus=", playBackStatus);



  const [isListening, setIsListening] = useState(0);
  const [text, setText] = useState('The spoken text will appear here after you click the button above.');
  console.log('enter SpeechToText()...', "isListening=", isListening);
  //console.log('SpeechToText | playBackStatus=', playBackStatus);

  const toggleIsListening = () => {
    console.log('toggleIsListening()...');

    setIsListening((prevIsListening) => !prevIsListening);



  }

useEffect(() => {

  recognition.onresult = (event) => {
    //console.log(event.results.map((result) => result[0]).join(""));
    //console.log('RESULTS：', event.results);
    //console.log('最新内容：', event.results[event.results.length - 1][0]);
    let transcript = event.results[event.results.length - 1][0].transcript;
    transcript = replaceNumbersWithWords(transcript);
    setText(transcript);
    sendTextToParent(transcript);
  };

  recognition.onend = () => { //这里绑定了一个事件。如果它与isListening无关，它应该在另一个useEffect中定义。
    console.log('onend event: start():');
    console.log(' isListening=', isListening, 'playBackStatus=', playBackStatus);
    recognition.start();
    if (isListening && !playBackStatus) {
      console.log(" 符合isListening&&!playBackStatus条件,start()");
      //recognition.start();
    }else{
      console.log(" 不符合isListening&&!playBackStatus条件,不执行start()");
    }
  };

  recognition.onaudioend = () => { //
    console.log('audio-end event:');
  };
  recognition.onerror = () => { //
    console.log('error event:');
  };
  recognition.onnomatch = () => { //
    console.log('no-match event:');
  };

  recognition.onsoundend = () => { //
    console.log('sound-end event:');
  };
  recognition.onsoundstart = () => { //
    console.log('sound-start event:');
  };
  recognition.onspeechend = () => { //
    console.log('speech-end event:');
  };
  recognition.onspeechstart = () => { //
    console.log('speech-start event:');
  };
  recognition.onstart = () => { //
    console.log('start event:');
  };
}, []);

  let i = 0;
  useEffect(() => { //这个useEffect是为了让recognition.start()和recognition.stop()在isListening改变时执行。
    i = i + 1;
    console.log('into useEffect.i=', i);
    if (isListening) {
      console.log('execute start():');
      recognition.start();
    }else{
      console.log('execute stop():');
      recognition.stop()
    };
    //return () => recognition.stop();
  }, [isListening]);

  useEffect(() => { //这个useEffect是为了让recognition.start()和recognition.stop()在playBackStatus改变时执行。
    //console.log('in SpeechToText useEffect - playbackstatus=', playBackStatus);
    if (playBackStatus === true && isListening === true) {
      console.log('playBackStatus is true, now stop listening: tmply not to...');
      //recognition.stop();
    }
    if (playBackStatus === false && isListening === true) {
      console.log('playBackStatus is false, now start listening: tmply not to...');
      //recognition.start();
    }
  },[playBackStatus]);

  return (
    <div>
      <br />
      <div style={{display:'flex', justifyContent:'center'}}> 
        
        <button style={{height:30,
          backgroundColor:'green', 
          color:'white',padding:'5px', 
          borderRadius:'5px', 
          fontWeight:'bold',  
          boxShadow:'0 2px 5px rgba(0,0,0,0.2)', 
          transition:'0.3s', 
          border:'1px solid r'}} 
          color="primary" 
          //</div>onClick={() => setIsListening((prevIsListening) => !prevIsListening)}>
          //</div>onClick={() => setIsListening(!isListening)}>
          onClick={toggleIsListening}>
        <i className="fas fa-microphone"></i>
        {isListening ? ' STOP' : ' START'}
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
