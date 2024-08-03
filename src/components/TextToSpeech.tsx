import React, { useEffect, useState } from 'react';
//在文本框中输入或粘贴一段话，则自动speak。
//这个speech的效果不好。
const TextToSpeech: React.FC = () => {
    const [text, setText] = useState('');

    useEffect(() => {
        const speechSynthesis = window.speechSynthesis;

        const speak = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        };

        speak();

        return () => {
            speechSynthesis.cancel();
        };
    }, [text]);

    return (
        <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    );
};

export default TextToSpeech;