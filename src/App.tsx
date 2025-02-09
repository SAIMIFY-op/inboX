import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [roomId, setRoomId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [isJoined, setIsJoined] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && roomId && roomId.length === 6) {
      setIsJoined(true);
    }
  };

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setRoomId(value);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInputText(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#111] rounded-lg p-6 sm:p-8 w-full max-w-md mx-auto">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">InboX</h1>
          <form onSubmit={handleJoin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-gray-300 text-sm">Enter Name</label>
              <input
                id="username"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 rounded bg-white text-black placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="roomcode" className="text-gray-300 text-sm">Enter Room Code</label>
              <input
                id="roomcode"
                type="text"
                value={roomId}
                onChange={handleRoomCodeChange}
                placeholder="Enter 6-digit room code"
                maxLength={6}
                pattern="\d{6}"
                className="w-full p-3 rounded bg-white text-black placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-400">Room code must be 6 digits</p>
            </div>
            <button
              type="submit"
              disabled={!userId || roomId.length !== 6}
              className="w-full p-3 bg-[#0095ff] text-white rounded font-semibold hover:bg-[#0077cc] transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col max-h-screen">
      <div className="bg-[#111] px-4 py-3 sm:py-4 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-white font-semibold text-lg sm:text-xl">InboX - {roomId}</h1>
        <span className="text-gray-400 text-sm">{userId}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
        {messages.map((message) => (
          <div key={message.id} className="flex justify-end">
            <div className="bg-[#0095ff] text-white rounded-lg px-4 py-2 max-w-[85%] sm:max-w-[70%] break-words">
              <p className="text-sm sm:text-base">{message.text}</p>
              <p className="text-xs text-blue-100 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 sm:p-4 bg-[#111] border-t border-gray-800 relative">
        <div className="flex items-center gap-2 max-w-5xl mx-auto">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-400 hover:text-gray-300 transition-colors p-2"
            >
              <Smile className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  theme="dark"
                  height={350}
                  width={300}
                />
              </div>
            )}
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type message here"
            className="flex-1 bg-[#222] text-white placeholder-gray-500 focus:outline-none p-2 sm:p-3 rounded-lg text-sm sm:text-base"
          />
          <button
            type="submit"
            className="text-[#0095ff] hover:text-[#0077cc] transition-colors disabled:opacity-50 p-2"
            disabled={!inputText.trim()}
          >
            <Send className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;