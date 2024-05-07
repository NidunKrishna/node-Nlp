import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/bot?message=${message}`);
      setResponse(res.data.answer || 'No response from server');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Chat with NLP Bot</h1>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        <h2>Bot Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
