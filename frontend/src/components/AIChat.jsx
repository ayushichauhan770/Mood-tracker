import axios from "axios";
import { useState } from "react";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", {
        question: question,
      });

      setAnswer(res.data.reply);
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <textarea
        placeholder="Ask something..."
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          height: "80px",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={askAI}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "lavender",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Ask AI
      </button>

      <p style={{ marginTop: "20px" }}>
        <strong>AI Answer:</strong> {answer}
      </p>
    </div>
  );
}

export default AIChat;
