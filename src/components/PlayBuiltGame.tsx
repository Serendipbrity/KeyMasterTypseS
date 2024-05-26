import { useState, useEffect, useCallback, useRef } from "react";
import Game from "./Game";

interface Key {
  name: string;
  sequence: string[];
}

export default function PlayBuiltGame() {
  // Function to remove the unwanted localStorage item on page load
  function removeUnwantedLocalStorageItem() {
    localStorage.removeItem("debug");
  }

  // Call the function on page load
  window.addEventListener("load", removeUnwantedLocalStorageItem);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [userAttempts, setUserAttempts] = useState<string[]>([]);
  const [keys, setKeys] = useState<Key[]>([]);

  // Refs to hold the latest values of keys and currentKeyIndex
  const keysRef = useRef<Key[]>(keys);
  const currentKeyIndexRef = useRef<number>(currentKeyIndex);

  useEffect(() => {
    const loadKeys = () => {
      try {
        const loadedKeys: Key[] = Object.keys(localStorage).map((key) => {
          // Clear debug so that it doesn't interfere with the game
          localStorage.removeItem("debug");
          const item = localStorage.getItem(key);
          return {
            name: key,
            sequence: item ? JSON.parse(item) : [],
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

  // Update refs when state changes
  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  useEffect(() => {
    currentKeyIndexRef.current = currentKeyIndex;
  }, [currentKeyIndex]);

  const handleTellMe = useCallback((sequence: string[]) => {
    alert(`The correct keys for this action are: ${sequence.join(" + ")}`);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % keysRef.current.length);
    setUserAttempts([]); // Clear user attempts
    console.log(currentKeyIndexRef);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setUserAttempts((prevAttempts) => {
        const newAttempts = [...prevAttempts, event.key];
        const correctSequence =
          keysRef.current[currentKeyIndexRef.current]?.sequence || [];

        if (
          newAttempts.slice(-correctSequence.length).join("") ===
          correctSequence.join("")
        ) {
          alert("Correct!");
          setUserAttempts([]); // Clear attempts immediately
          setCurrentKeyIndex(
            (prevIndex) => (prevIndex + 1) % keysRef.current.length
          ); // Move to next key
        }
        return newAttempts;
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (keys.length === 0) {
    return <div>Loading keys or no keys available...</div>;
  }

  return (
    <div className="content-container">
      <Game
        keys={keys}
        onTellMe={() => handleTellMe(keys[currentKeyIndex]?.sequence)}
        onNext={handleNext}
      />
      <div>
        <h3>User Attempts:</h3>
        <ul>
          {userAttempts.map((attempt, index) => (
            <li key={index}>{attempt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
