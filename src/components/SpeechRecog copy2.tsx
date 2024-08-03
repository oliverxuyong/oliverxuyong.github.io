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

const SpeechRecog = ({sendTextToParent,playBackStatus,isListening}) => {
  //const [isListening, setIsListening] = useState(0);
  const [text, setText] = useState('The spoken text will appear here after you click the button above.');
  console.log('enter SpeechRecog()|', "playBackStatus=", playBackStatus, 'isListening=', isListening);

  recognition.onresult = (event) => {
    //console.log(event.results.map((result) => result[0]).join(""));
    //console.log('RESULTS：', event.results);
    //console.log('最新内容：', event.results[event.results.length - 1][0]);
    let transcript = event.results[event.results.length - 1][0].transcript;
    transcript = replaceNumbersWithWords(transcript);
    setText(transcript);
    sendTextToParent(transcript);
  };

/*
  useEffect(() => {


    recognition.onaudioend = () => { //
      console.log('audio-end event:');
    };
    recognition.onerror = () => { //
      console.log('error event: isListening=', isListening, 'playBackStatus=', playBackStatus);
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
*/
  let i = 0;
  useEffect(() => {
    i = i + 1;
    console.log('into useEffect.i=', i,"isListening=",isListening);
    recognition.onend = (e) => {
      console.log('onend event: isListening=', isListening, 'playBackStatus=', playBackStatus);
      //if (isListening) recognition.start();
    };

    isListening ? recognition.start() : recognition.stop();

    return () => recognition.stop();
  }, [isListening]);

/*
  useEffect(() => { //这个useEffect是为了让recognition.start()和recognition.stop()在isListening改变时执行。
    i = i + 1;
    
    recognition.onend = () => { //这里绑定了一个事件。如果它与isListening无关，它应该在另一个useEffect中定义。
      console.log('onend event: isListening=', isListening, 'playBackStatus=', playBackStatus);
      console.log('onend event: start():, but tmply not to...');
      //recognition.start();
      if (isListening && !playBackStatus) {
        console.log(" 符合isListening&&!playBackStatus条件,start(),tmply not to...");
        //recognition.start();
      }else{
        console.log(" 不符合isListening&&!playBackStatus条件,不执行start()");
      }
    };

    
    console.log('enter SpeechRecog useEffect on isListening=', isListening, "i=",i);
    if (isListening) {
      console.log('execute start():');
      recognition.start();
    }else{
      console.log('execute stop():');
      recognition.stop()
    };
    //return () => recognition.stop();
  }, [isListening]);*/

  /*
  useEffect(() => { //这个useEffect是为了让recognition.start()和recognition.stop()在playBackStatus改变时执行。
    console.log('enter SpeechRecog useEffect on playbackstatus=', playBackStatus);
    if (playBackStatus === true && isListening === true) {
      console.log('playBackStatus and isListening is true, now stop listening: tmply not to...');
      //recognition.stop();
    }
    if (playBackStatus === false && isListening === true) {
      console.log('playBackStatus is false and isListening true, now start listening: tmply not to...');
      //recognition.start();
    }
  },[playBackStatus]); */

  return (
<div></div>
  );
};

export default SpeechRecog;
