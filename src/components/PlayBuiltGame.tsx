import { useState, useEffect, useCallback } from 'react';
import Game from './Game';

export default function PlayBuiltGame() { 
    const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
    const [userAttempts, setUserAttempts] = useState([]);
    const [keys, setKeys] = useState<{ name: string; sequence: string[]; }[]>([]);

    useEffect(() => {
        const loadKeys = () => {
            try {
                const loadedKeys = Object.keys(localStorage).map(key => {
                    const item = localStorage.getItem(key);
                    return {
                        name: key,
                        sequence: item ? JSON.parse(item) : []
                    };
                });
                if (loadedKeys.length > 0) {
                    setKeys(loadedKeys);
                    setCurrentKeyIndex(0);
                } else {
                    console.log("No keys found in localStorage.");
                }
            } catch (error) {
                console.error("Error loading keys from localStorage:", error);
            }
        };
    
        loadKeys();
    }, []);
    

    const handleTellMe = (sequence: string[]) => { // Add type annotation
        alert(`The correct keys for this action are: ${sequence.join(" + ")}`);
    };

    const handleNext = useCallback(() => {
        setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % keys.length);
        setUserAttempts([]);
    }, [keys.length]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setUserAttempts((prevAttempts: any[]) => {
                const newAttempts = [...prevAttempts, event.key];
                const correctSequence = keys[currentKeyIndex]?.sequence || [];
                if (newAttempts.slice(-correctSequence.length).join('') === correctSequence.join('')) {
                    alert('Correct!');
                    handleNext();
                }
                return newAttempts;
            });
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNext, keys, currentKeyIndex]);

    if (keys.length === 0) {
        return <div>Loading keys or no keys available...</div>;
    }

    return (
        <Game 
            keys={keys} 
            onTellMe={() => handleTellMe(keys[currentKeyIndex]?.sequence)} 
            onNext={handleNext}
        />
    );
}
