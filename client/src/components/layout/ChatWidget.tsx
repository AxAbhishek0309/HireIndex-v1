import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Headset, Send } from 'lucide-react';

interface Message {
  id: string;
  isUser: boolean;
  text: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      isUser: false,
      text: 'Hi there! How can I help you with your resume or job search today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      text: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        text: 'Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our resume analyzer to improve your job application materials.'
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-24 right-4 sm:right-8 w-full max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
      <div className="flex justify-between items-center bg-blue-600 text-white p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
            <Headset className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">Live Support</h3>
            <p className="text-xs opacity-80">We typically reply within minutes</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:text-gray-200">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 h-80 overflow-y-auto bg-gray-50">
        {messages.map(message => (
          <div key={message.id} className={`mb-2 ${message.isUser ? 'text-right' : ''}`}>
            <span className={`inline-block py-2 px-3 max-w-[80%] rounded-lg ${
              message.isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {message.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..." 
            className="flex-1 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-l-none"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
