import React, { useState } from 'react';
import icon from '../Images/ChatbotImg.jpg'; 

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const manualReplies = {
    menu: "Today's menu includes Paneer Butter Masala, Jeera Rice, Roti, and Salad.",
    timing: "Our mess service is open from 8 AM to 10 PM daily.",
    location: "We currently serve Pune, Mumbai, and Nashik.",
    subscribe: "You can subscribe by filling out our form or contacting us via WhatsApp.",
    price: "Our plans start at ₹1500/month for vegetarian meals.",
    hello: "Hi! I'm your SwaadBite assistant. Ask me anything about food, plans, or timing!"
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    const lower = input.toLowerCase();
    const key = Object.keys(manualReplies).find(k => lower.includes(k));

    if (key) {
      setMessages(prev => [...prev, { text: manualReplies[key], sender: 'bot' }]);
    } else {
      setMessages(prev => [...prev, { text: 'Typing...', sender: 'bot' }]);
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_OPENAI_API_KEY',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful chatbot for SwaadBite.' },
              { role: 'user', content: input },
            ],
          }),
        });

        const data = await res.json();
        setMessages(prev => [
          ...prev.filter(m => m.text !== 'Typing...'),
          { text: data.choices[0].message.content, sender: 'bot' },
        ]);
      } catch (error) {
        setMessages(prev => [
          ...prev.filter(m => m.text !== 'Typing...'),
          { text: 'Sorry, something went wrong.', sender: 'bot' },
        ]);
      }
    }
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="w-14 h-14 rounded-full bg-orange-500 shadow-lg hover:animate-pulse flex items-center justify-center"
        onClick={toggleChat}
      >
        <img src={icon} alt="chatbot" className="w-9 h-9 rounded-full bg-white p-1" />
      </button>

      {isOpen && (
        <div className="w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden mt-4 animate-slide-up">
          <div className="bg-orange-500 text-white text-lg font-bold p-3">SwaadBite Assistant</div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === 'user' ? 'bg-orange-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="bg-orange-500 text-white px-4" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;