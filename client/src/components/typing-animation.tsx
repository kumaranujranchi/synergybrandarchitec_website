import { useEffect, useState, useRef } from 'react';

interface TypingAnimationProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterPhrase?: number;
  className?: string;
}

export default function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterPhrase = 2000,
  className = '',
}: TypingAnimationProps) {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const currentPhrase = phrases[currentPhraseIndex];
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Clear any existing timeout when component unmounts or dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    // If we're typing and haven't completed the current phrase
    if (isTyping && currentText.length < currentPhrase.length) {
      timeoutRef.current = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
      }, typingSpeed);
    } 
    // If we've completed typing the current phrase
    else if (isTyping && currentText.length === currentPhrase.length) {
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, delayAfterPhrase);
    } 
    // If we're deleting and still have text left
    else if (!isTyping && currentText.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrentText(currentText.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } 
    // If we've completely deleted the text, move to the next phrase
    else if (!isTyping && currentText.length === 0) {
      setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      setIsTyping(true);
    }
  }, [currentText, isTyping, currentPhrase, currentPhraseIndex, phrases.length, typingSpeed, deletingSpeed, delayAfterPhrase]);
  
  return (
    <div className={`inline-flex ${className}`}>
      <span>{currentText}</span>
      <span className="animate-blink ml-1">|</span>
    </div>
  );
}