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

/**
 关于start()和stop()，playBackStatus和isListening的几个场景：
 1. listening之后，出现的endevent要自动再次start()。
    条件：listening=true，playBackStatus=false。
 2. play开始后，如果出现endevent，不再start()，也不必做stop()。
    条件：listening=true，playBackStatus=true。
 3. play结束后，如果isListening=true，但却出现过endevent或errorevent，表明此时实际上已经stop，需要start()。
 以上1和3可以合并。
 4. 按start，先执行stop()，再start()。
 5. 按stop，isListening=false实际上还在listening，这时会实际上执行一个start。（这个是effect里变量一直是初始值造成的？）
 */

const SpeechRecog = ({sendTextToParent,playBackStatus}) => {
  const [isListening, setIsListening] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isStopPressed, setIsStopPressed] = useState(false);
  const [isEndEvent, setIsEndEvent] = useState(false);
  const [isErrorEvent, setIsErrorEvent] = useState(false);
  const [text, setText] = useState('The spoken text will appear here after you click the button above.');

  console.log('enter SpeechRecog()|', "playBackStatus=", playBackStatus, 'isListening=', isListening);
  const toggleIsListening = () => {
    console.log('toggleIsListening()...');
    if (!isListening && !playBackStatus) {
      setIsStartPressed(true);
      setIsListening(true);
    }else{
      setIsStopPressed(true);
      setIsListening(false);
    }
    //setIsListening((prevIsListening) => !prevIsListening);
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

    recognition.onaudioend = () => { //
      console.log('audio-end event:');
    };
    recognition.onerror = () => { //
      setIsErrorEvent(true);
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
    recognition.onend = () => { //这里绑定了一个事件。如果它与isListening无关，它应该在另一个useEffect中定义。
      console.log('onend event:');
      setIsEndEvent(true);
      //console.log(' isListening=', isListening, 'playBackStatus=', playBackStatus);
      //recognition.start();

      /*出现onend有三种情况：
      1. start后，说话后静默四五秒，或没说话静默二秒：
        isListening=true，playBackStatus=false，这时应该执行recognition.start()。
      2. 主动按下stop后，并且执行了recognition.stop()，从而出现endevent：
        isListening=false，playBackStatus=false，这时应该不执行recognition.start()。
      3. 在islistening=true，playBackStatus=true时，因为干扰，可能会出现endevent：


      */
      if (isListening && !playBackStatus) {
        console.log(" 符合isListening&&!playBackStatus条件,start()");
        //recognition.stop()
        recognition.start();
        //setIsEndEvent(false);
      }else{
        console.log(" 不符合isListening&&!playBackStatus条件,不执行start()");
      }
    };

    i = i + 1;
    console.log('enter SpeechRecog useEffect on isListening=', isListening, "and on playBackStatus=",playBackStatus,"i=",i);
    if (isListening && !playBackStatus && isStartPressed) {
      console.log('execute start():');
      recognition.start();
      setIsStartPressed(false);
      //setIsEndEvent(false);
    };

    if (isListening && !playBackStatus && !isStartPressed && (isEndEvent || isErrorEvent)) {
      console.log('execute start():');
      recognition.start();
      setIsStartPressed(false);
      setIsEndEvent(false);
      setIsErrorEvent(false);
      //setIsEndEvent(false);
    };
    //return () => recognition.stop();

    if (playBackStatus === true && isListening === true) { //拷过来的一部分，待修改。。。
      //console.log('playBackStatus is true, now stop listening: tmply not to...');
      //recognition.stop();
    }
    if (playBackStatus === false && isListening === true) {
      //console.log('playBackStatus is false, now start listening: tmply not to...');
      //recognition.start();
    }



  }, [isListening,playBackStatus]);

  useEffect(() => { //这个useEffect是为了让recognition.start()和recognition.stop()在playBackStatus改变时执行。
    //console.log('enter SpeechRecog useEffect on playbackstatus=', playBackStatus);
    if (playBackStatus === true && isListening === true) {
      //console.log('playBackStatus is true, now stop listening: tmply not to...');
      //recognition.stop();
    }
    if (playBackStatus === false && isListening === true) {
      //console.log('playBackStatus is false, now start listening: tmply not to...');
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
        onClick={toggleIsListening}>
      <i className="fas fa-microphone"></i>
      {isListening ? ' STOP' : ' START'}
      </button>
    </div>
  </div>
  );
};

export default SpeechRecog;
