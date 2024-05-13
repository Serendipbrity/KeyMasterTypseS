
import Game from "./Game";

const macPresetKeys = [
  { name: "Copy", sequence: ["Meta", "C"] },
  { name: "Paste", sequence: ["Meta", "V"] },
  // Add other shortcuts here
];

export default function Preset() {
  const handleTellMe = (sequence: string[]) => {
    alert(`The shortcut is: ${sequence.join(" + ")}`);
  };
  const handleNext = (setCurrentKey: React.Dispatch<React.SetStateAction<number>>, keys: { name: string, sequence: string[] }[]) => {
    setCurrentKey((current) => (current + 1) % keys.length);
  };
  return (
      <>
        <Game keys={macPresetKeys} onTellMe={handleTellMe} onNext={handleNext}/>
      </>
  );
}
