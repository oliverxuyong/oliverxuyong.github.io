import React, { useRef, useState,useEffect } from 'react';

// Define the AudioPlayer functional component
const AudioPlayer = ({audiofile,sendPlaybackStatus}) => {
  //console.log("entered AudioPlayer.");
  // Create a ref for the audio element
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  //console.log("testfun:",testfun);
  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.playbackRate = 1.0;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleSlowPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.playbackRate = 0.7;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }


  useEffect(() => {
    setIsPlaying(false);
  },[audiofile]);

  useEffect(() => {
    //console.log("entered AudioPlay useEffect on isPlaying.",isPlaying);
    sendPlaybackStatus(isPlaying);
  },[isPlaying]);

  // Effect to handle the end of the audio playback
  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
      //sendPlaybackStatus(false);
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('ended', handleEnded);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <button
       onClick={togglePlayPause} onDoubleClick={toggleSlowPlayPause}
       style={{backgroundColor:'orange', padding:'5px', borderRadius:'5px', fontWeight:'bold',  boxShadow:'0 2px 5px rgba(0,0,0,0.2)', transition:'0.3s', border:'1px solid r'}}
       >
        {isPlaying ? 'PAUSE' : 'PLAY'}
      </button>
      <audio ref={audioRef} src={audiofile} />
    </div>
  );
};


export default AudioPlayer;
