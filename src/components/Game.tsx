import "../styles/Game.css";
import { useState } from "react";

export default function Game({ keys, onTellMe, onNext }) {
  const [currentKey, setCurrentKey] = useState(0);

  return (
    <div className="game-container">
      <div className="tell-me-container">
        <button
          className="tell-me"
          onClick={() => onTellMe(currentKey)}
        >
          Tell Me!
        </button>
        <div className="answer">{}</div>
        <div className="game-key-name">{keys[currentKey].name}</div>
        <button className="end-game-button" aria-label="Close">
          &#215;
        </button>
      </div>

      <div className="disclaimer">
        (Certain shortcuts may be specific to applications such as Visual
        Studio Code and may not function in the editor below.)
      </div>
      <div
        className="codepen game-card"
        data-default-tab="html,result"
        data-slug-hash="GRLvYmK"
        data-editable="true"
        data-user="brittani-court"
        data-prefill='{"title":"KeyMaster","tags":[],"scripts":[],"stylesheets":[]}'
      >
        <pre data-lang="html" contentEditable="true" className="content">
          {/* HTML content editable section */}
          &lt;div&gt; &lt;h1&gt;👋 Hello World!&lt;/h1&gt; &lt;p&gt;Welcome to
          KeyMaster!&lt;/p&gt; &lt;ul&gt; &lt;li&gt;Use this editor to
          practice and visualize your keyboard shortcuts.&lt;/li&gt;
          &lt;li&gt;Feel free to edit, add, or remove any part of this HTML
          snippet.&lt;/li&gt; &lt;/ul&gt; &lt;/div&gt; &lt;!-- End of HTML
          content --&gt; &lt;!-- Note: This is a safe environment to
          experiment with HTML. Your changes are temporary and reset on page
          refresh. --&gt;
        </pre>
      </div>
      <script
        async
        src="https://cpwebassets.codepen.io/assets/embed/ei.js"
      ></script>
      <button
        className="next-button"
        onClick={() => {
          onNext();
          setCurrentKey((prevKey) => (prevKey + 1) % keys.length);
        }}
      >
        Next
      </button>
    </div>
  );
}
