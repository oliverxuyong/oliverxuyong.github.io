import React, { useState, useEffect } from 'react';
import { replaceNumbersWithWords } from './MyLib.js';


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

const SpeechTohjgText = ({sendTextToParent}) => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('The spoken text will appear here after you click the button above.');
  //console.log('enter SpeechToText()...');

  recognition.onresult = (event) => {
    //console.log(event.results.map((result) => result[0]).join(""));
    //console.log('RESULTS：', event.results);
    //console.log('最新内容：', event.results[event.results.length - 1][0]);
    let transcript = event.results[event.results.length - 1][0].transcript;
    transcript = replaceNumbersWithWords(transcript);
    setText(transcript);
    sendTextToParent(transcript);
  };

  let i = 0;
  useEffect(() => {
    i = i + 1;
    //console.log('into useEffect.i=', i);

    isListening ? recognition.start() : recognition.stop();

    return () => recognition.stop();
  }, [isListening]);

  return (
    <div>
      <br />
      <div style={{display:'flex', justifyContent:'center'}}> 
        
        <button style={{height:30,backgroundColor:'green', color:'white',padding:'5px', borderRadius:'5px', fontWeight:'bold',  boxShadow:'0 2px 5px rgba(0,0,0,0.2)', transition:'0.3s', border:'1px solid r'}} color="primary" onClick={() => setIsListening((prevIsListening) => !prevIsListening)}>
        <i className="fas fa-microphone"></i>
        {isListening ? ' STOPp' : ' STARTttt'}
        </button>
      </div>
    </div>
  );
};

export default SpeechTohjgText;
