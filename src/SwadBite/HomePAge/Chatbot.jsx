import React, { useState } from "react";
import icon from "../Images/ChatbotImg.jpg";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Manual Replies with multiple keywords
  const manualReplies = [
    {
      keywords: ["menu", "food", "today"],
      reply:
        "Today's menu includes Paneer Butter Masala, Jeera Rice, Roti, and Salad.",
    },
    {
      keywords: ["timing", "time", "open", "close"],
      reply: "Our mess service is open from 8 AM to 10 PM daily.",
    },
    {
      keywords: ["location", "city", "serve", "available"],
      reply: "We currently serve Pune ",
    },
    {
      keywords: ["subscribe", "join", "membership"],
      reply:
        "You can subscribe by filling out our form or contacting us via WhatsApp.",
    },
    {
      keywords: ["price", "cost", "plan", "fees"],
      reply: "Our plans start at ₹1500/month for vegetarian meals.",
    },
    {
      keywords: ["hello", "hi", "hey"],
      reply:
        "Hi! I'm your SwaadBite assistant. Ask me anything about food, plans, or timing!",
    },
    {
      keywords: ["cancel", "unsubscribe", "stop"],
      reply:
        "You can cancel your subscription anytime by contacting support on WhatsApp.",
    },
    {
      keywords: ["veg", "vegetarian"],
      reply: "Yes, we offer vegetarian plans starting at ₹1500/month.",
    },
    {
      keywords: ["non-veg", "chicken", "fish", "egg"],
      reply:
        "Currently, we only serve vegetarian meals. Non-veg options will be added soon!",
    },
    {
      keywords: ["delivery", "deliver", "order"],
      reply: "We provide doorstep delivery across all our serving cities.",
    },
    {
      keywords: ["contact", "support", "help", "phone"],
      reply: "You can reach our support team at +91 9876543210.",
    },
    {
      keywords: ["offer", "discount", "deal"],
      reply: "We currently offer a 10% discount for students with valid ID cards.",
    },
  ];

  // ✅ Function to detect manual reply
  const findManualReply = (input) => {
    const lower = input.toLowerCase();
    for (let item of manualReplies) {
      if (item.keywords.some((word) => lower.includes(word))) {
        return item.reply;
      }
    }
    return null;
  };

  const toggleChat = () => setIsOpen(!isOpen);

  // ✅ Send message handler
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 1️⃣ Check manual replies first
    const reply = findManualReply(input);
    if (reply) {
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      return;
    }

    // 2️⃣ Otherwise show "Typing..." and call backend AI
    setMessages((prev) => [
      ...prev,
      { text: "Typing...", sender: "bot", temp: true },
    ]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev.filter((m) => !m.temp), // remove typing message
        { text: data.reply, sender: "bot" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((m) => !m.temp),
        { text: "Sorry, something went wrong.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Toggle Button */}
      <button
        className="w-14 h-14 rounded-full bg-orange-500 shadow-lg hover:animate-pulse flex items-center justify-center"
        onClick={toggleChat}
      >
        <img
          src={icon}
          alt="chatbot"
          className="w-9 h-9 rounded-full bg-white p-1"
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden mt-4 animate-slide-up">
          <div className="bg-orange-500 text-white text-lg font-bold p-3">
            SwaadBite Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-orange-500 text-white px-4"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;