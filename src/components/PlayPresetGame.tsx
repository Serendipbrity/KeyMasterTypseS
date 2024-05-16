import { useState, useEffect } from "react";
import Game from "./Game";

// preset options for Mac
const macPresetKeys = [
  { name: "Copy", sequence: ["Meta", "c"] },
  { name: "Paste", sequence: ["Meta", "v"] },
];

export default function Preset() {
  // start at the first key sequence
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  // store the user's key attempts
  const [userAttempts, setUserAttempts] = useState<string[]>([]);

  // Function to handle the "Tell Me" button click
  const handleTellMe = (keyIndex) => {
    const currentKeySequence = macPresetKeys[keyIndex].sequence;
    const updatedKeySequence = currentKeySequence.map(key =>
      key === "Meta" ? "Command" : key
    );
    alert(`The shortcut is: ${updatedKeySequence.join(" + ")}`);
  };

  // Next button
  const handleNext = () => {
    setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % macPresetKeys.length);
    setUserAttempts([]); // Reset the attempts array for the next sequence
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setUserAttempts((prevAttempts) => {
        const newAttempts = [...prevAttempts, event.key];
        const isCorrect = macPresetKeys[currentKeyIndex].sequence.every((key, index) =>
          newAttempts[newAttempts.length - macPresetKeys[currentKeyIndex].sequence.length + index] === key
        );

        if (newAttempts.length > macPresetKeys[currentKeyIndex].sequence.length) {
          newAttempts.shift();
        }

        if (isCorrect && newAttempts.length === macPresetKeys[currentKeyIndex].sequence.length) {
          alert('Correct!');
          handleNext(); // Advance to the next key sequence
        }
        return newAttempts;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentKeyIndex]);

  return (
    <div className="content-container">
      <Game
        keys={macPresetKeys}
        onTellMe={handleTellMe}
        onNext={handleNext}
      />
    </div>
  );
}
