import "../styles/Build.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to return the appropriate class name based on modal state
  const getBlurClass = () => {
    return open ? "container blur-background" : "";
  };
  return (
    <>
      <div className="end-and-click-here-buttons">
        <a className="click-here" tabIndex={0}>
          Click here to start
        </a>
        <div className={`start-game-button ${getBlurClass()}`}>&times;</div>
      </div>

      <label htmlFor="shortcut-label" className="shortcut-label">
        Enter keys/shortcuts (e.g., A, Ctrl+C, Alt+Tab):
      </label>
      <div className={`container ${getBlurClass()}`}>
        <button className="clear">Clear</button>
        <textarea className="box" disabled>
          Keys will auto appeaer here
        </textarea>

        {/* Modal */}
        <button onClick={handleOpen} className="save">
          Save
        </button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="modal-header"
            >
              Enter a name / description
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}

            <button
              type="button"
              className="modal-btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              x
            </button>
            <input
              type="text"
              className="name"
              placeholder="Enter a name / description"
            />

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-primary modal-save-button"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <button className={`start-game-button ${getBlurClass()}`}>Start Game</button>
    </>
  );
}
