import React, { useState, useEffect } from 'react';
//import Button from '@mui/material/Button';
import HighlightedSentence from './HighlightedSentence.jsx'; // Add this import statement
//import './App.css';
import SpeechRecog from './SpeechRecog.tsx'; // Adjust the import path as needed
import SpokenText from './SpokenText.jsx'; // Add this import statement
import AudioPlayer from './AudioPlayer.jsx';
import { findNonOverlappingLCS } from './MyLib.js';

// Function to read a text file and return its content as a string
const fetchMaterial = async (file) => {
  const response = await fetch(file);
  const material = await response.text();
  return material;
};

export default function WorkShop({material}) {
  //const [sentences, setSentences] = useState('');
  const [sentsArray, setSentsArray] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [spokenText, setSpokenText] = useState(" The recognized text will appear here when you speak.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [sentPos,setSentPos] = useState([]);
  const [spokenTextPos,setSpokenTextPos] = useState([]);
  const [audiofile, setAudiofile] = useState('');
  const [sentence, setSentence] = useState("preset sentence || level 1||level 2||level 3||level 4||level 5");
  const [isListening, setIsListening] = useState(false);
  //console.log("entered WorkShop.");
  // Load and read the text file on component mount
  useEffect(() => {
    //console.log("entered workshop's useEffect on material.");
    const loadText = async () => {
      //console.log("entered workshop async loadtext...");
      const filepath = '/'+ material + '/' + material + '.txt';
      const text = await fetchMaterial(filepath); // Ensure the file is correctly placed in the public directory
      //read a file and return its content as a string:
      //const text = fetch(filepath).then(response => response.json());
      //console.log("text=",text);
      //const text = fetchMaterial(filepath); // Ensure the file is correctly placed in the public directory
      const sents = text.split(/\r?\n/).map(s => s.trim()).filter(s => s); // Split into sentences
      //const sents = text.split("\n").map(s => s.trim()).filter(s => s);
      //setSentences(text);
      //console.log(filepath); 
      //console.log("Workshop useEffect on material, sents=",sents);
      setSentsArray(sents);
      //console.log("Workshop useEffect on material, sentsArray=",sentsArray)
      setCurrentSentenceIndex(0);
      //setSpokenText(" know how wowo much money he makes because he didn't want us to have a joint checking account.");
    };
    loadText();
  }, [material]);

  // Handlers for navigating between sentences
  const handlePrevious = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSentenceIndex < sentsArray.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  const receiveSpokenText = (text) => {
    setSpokenText(text);
    //console.log("workshop - received spoken text:", text);
    //console.log("app's text:",text);
  };

  const receivePlaybackStatus = (playBackStatus) => {
    //console.log("workshop received playback status:", playBackStatus);
    setIsPlaying(playBackStatus);
  };
  //console.log("Workshop root, sentsArray=",sentsArray)

  useEffect(() => {
    //console.log('Workshop useEffect on currentSentenceIndex=', currentSentenceIndex);
    //console.log('Workshop useEffect currentSentence: sentsArray=',sentsArray)
    let currentSentence = sentsArray[currentSentenceIndex] || '';
    console.log("Workshop, currentSentence=",currentSentence);
    setSentence(currentSentence);
    setAudiofile('/'+ material + '/' + material + '_' + (currentSentenceIndex+1) + '.mp3');
    },[currentSentenceIndex, sentsArray]);


  useEffect(() => {
    const [sentPos,spokenTextPos] = findNonOverlappingLCS(sentence.split("||")[0], spokenText); //
    setSentPos(sentPos);
    setSpokenTextPos(spokenTextPos);
    },[sentence,spokenText]);

  console.log("workshop sentence=",sentence)

  return (
    <div>
      <div>
        {
          sentence.length === 0 ? "" : <HighlightedSentence sentence={sentence} matchedPos={sentPos}/>}
      </div>

      <div style={{ marginTop:'10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>  
        <button 
            onClick={handlePrevious} 
            disabled={currentSentenceIndex === 0}
            style={{ padding:"3px", marginLeft:'10px',fontWeight:'bold',  boxShadow:'0 2px 5px rgba(0,0,0,0.2)' }}
        >
          <i className="fas fa-chevron-left"></i>PREV
        </button>

        <AudioPlayer audiofile={audiofile} sendPlaybackStatus={receivePlaybackStatus} /> 
          
        <button 
          onClick={handleNext} 
          disabled={currentSentenceIndex === sentsArray.length - 1}
          style={{ padding:'3px', marginRight: '10px',fontWeight:'bold',  boxShadow:'0 2px 5px rgba(0,0,0,0.2)'}}
        >
          NEXT<i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div>
        <SpeechRecog sendTextToParent={receiveSpokenText} playBackStatus={isPlaying} isListening={isListening}/>
      </div>
      
      <div>
        <SpokenText spokenText={spokenText} matchedPos={spokenTextPos}/>
      </div>
    
    </div>
  );
}
