import "../styles/Build.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

export default function Build() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "#000",
    zIndex: 1000,
  };

  const [keyCombo, setKeyCombo] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const recordedKeyPresses = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);
      setKeyCombo((prevKeys) => [...prevKeys, event.key]);
    };

    // Only add the event listener when the modal is not open
    if (!open) {
      window.addEventListener("keydown", recordedKeyPresses);
    }

    // Remove the event listener when the component unmounts or when the modal opens
    return () => {
      window.removeEventListener("keydown", recordedKeyPresses);
    };
  }, [open]); // The useEffect depends on the 'open' state

  const handleSave = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setKeyCombo([]);
  };
    
  const handleModalSave = () => {
      localStorage.setItem(name, JSON.stringify(keyCombo));
      handleClear(); // clear the key combo box after saving
      setName(""); // Clear the name field after saving
    handleModalClose();
  };


  return (
    <>
      <div className="end-game-button" onClick={handleModalClose}>&times;</div>
      <a className="click-here" tabIndex={0}>
        Click here to start
      </a>
      <label htmlFor="shortcut-label" className="shortcut-label">
        Enter keys/shortcuts (e.g., A, Ctrl+C, Alt+Tab):
      </label>
      <div className="container">
        <button className="clear" onClick={handleClear}>
          Clear
        </button>
        <textarea className="box" disabled value={keyCombo.length > 0 ? keyCombo.join(", ") : "Keys will auto appear here"} />
        <button onClick={handleSave} className="save">
          Save
              </button>

        <Modal open={open} onClose={handleModalClose}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter a name / description
            </Typography>
            <input
              type="text"
              className="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name / description"
            />
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={handleModalClose}>
                Close
              </button>
              <button type="button" className="btn-primary modal-save-button" onClick={handleModalSave}>
                Save
              </button>
            </div>
          </Box>
        </Modal>
          </div>
          <Link to="/KeyMasterTypseS/play-built-game">
          <button className="start-game-button">Start Game</button></Link>
    </>
  );
}
