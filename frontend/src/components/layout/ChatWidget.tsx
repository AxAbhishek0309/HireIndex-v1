import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Headphones, Send, FileText, User, BarChart, BookOpen, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  isUser: boolean;
  text: string;
  options?: Array<{
    icon?: React.ReactNode;
    text: string;
    action: string;
  }>;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate responses based on user's message
const generateBotResponse = (userMessage: string): Message => {
  // Convert to lowercase for easier matching
  const input = userMessage.toLowerCase();
  
  // Initial response options
  const welcomeOptions = [
    { 
      icon: <FileText className="h-4 w-4" />,
      text: "Analyze my resume",
      action: "resume_analysis"
    },
    { 
      icon: <User className="h-4 w-4" />,
      text: "Career advice",
      action: "career_advice"
    },
    { 
      icon: <BarChart className="h-4 w-4" />,
      text: "ATS scoring tips",
      action: "ats_tips"
    }
  ];

  // Check for resume-related queries
  if (input.includes('resume') || input.includes('cv') || input.includes('upload')) {
    return {
      id: (Date.now() + 1).toString(),
      isUser: false,
      text: "I'd be happy to help with your resume! Our analyzer can evaluate your resume for ATS compatibility, keywords, format, and content quality. Ready to upload your resume for analysis?",
      options: [
        { 
          icon: <FileText className="h-4 w-4" />,
          text: "Upload resume",
          action: "upload_resume"
        },
        { 
          icon: <Lightbulb className="h-4 w-4" />,
          text: "Resume tips",
          action: "resume_tips"
        }
      ]
    };
  }
  
  // Check for job search related queries
  else if (input.includes('job') || input.includes('search') || input.includes('interview') || input.includes('applications')) {
    return {
      id: (Date.now() + 1).toString(),
      isUser: false,
      text: "Looking for job search advice? I can help with job application strategies, interview tips, or optimizing your application materials for specific roles.",
      options: [
        { 
          icon: <BookOpen className="h-4 w-4" />,
          text: "Interview advice",
          action: "interview_tips"
        },
        { 
          icon: <BarChart className="h-4 w-4" />,
          text: "Application strategies",
          action: "application_strategies"
        }
      ]
    };
  }
  
  // Check for ATS related queries
  else if (input.includes('ats') || input.includes('tracking') || input.includes('system') || input.includes('score')) {
    return {
      id: (Date.now() + 1).toString(),
      isUser: false,
      text: "Applicant Tracking Systems (ATS) are used by employers to screen resumes. To improve your ATS score, focus on relevant keywords, use standard section headers, and ensure your resume is properly formatted. Would you like more specific ATS optimization tips?",
      options: [
        { 
          icon: <BarChart className="h-4 w-4" />,
          text: "ATS optimization",
          action: "ats_optimization"
        },
        { 
          icon: <FileText className="h-4 w-4" />,
          text: "Check my resume",
          action: "check_resume"
        }
      ]
    };
  }

  // Check for how/what/features queries
  else if (input.includes('how') || input.includes('what') || input.includes('features') || input.includes('do')) {
    return {
      id: (Date.now() + 1).toString(),
      isUser: false,
      text: "ResumeCraft offers several features to boost your job search: resume ATS analysis, keyword optimization, formatting assistance, industry-specific recommendations, and personalized improvement suggestions. What would you like to explore first?",
      options: [
        { 
          icon: <BarChart className="h-4 w-4" />,
          text: "ATS Analysis",
          action: "ats_analysis"
        },
        { 
          icon: <Lightbulb className="h-4 w-4" />,
          text: "Optimization Tools",
          action: "optimization_tools"
        }
      ]
    };
  }
  
  // Default response for other queries
  else {
    return {
      id: (Date.now() + 1).toString(),
      isUser: false,
      text: "Thanks for reaching out! I can help with resume analysis, career advice, job search strategies, and ATS optimization. What would you like assistance with today?",
      options: welcomeOptions
    };
  }
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      isUser: false,
      text: 'Hi there! How can I help you with your resume or job search today?',
      options: [
        { 
          icon: <FileText className="h-4 w-4" />,
          text: "Resume Analysis",
          action: "resume_analysis"
        },
        { 
          icon: <BarChart className="h-4 w-4" />,
          text: "ATS Tips",
          action: "ats_tips"
        },
        { 
          icon: <User className="h-4 w-4" />,
          text: "Career Advice",
          action: "career_advice"
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (action: string) => {
    let response: Message;
    
    switch(action) {
      case 'resume_analysis':
        response = {
          id: Date.now().toString(),
          isUser: true,
          text: "I'd like to analyze my resume"
        };
        break;
      case 'ats_tips':
        response = {
          id: Date.now().toString(),
          isUser: true,
          text: "Can you provide ATS optimization tips?"
        };
        break;
      case 'career_advice':
        response = {
          id: Date.now().toString(),
          isUser: true,
          text: "I need career advice"
        };
        break;
      default:
        response = {
          id: Date.now().toString(),
          isUser: true,
          text: "Tell me more about " + action
        };
    }
    
    setMessages(prev => [...prev, response]);
    
    // Generate bot response based on the selected option
    setTimeout(() => {
      const botResponse = generateBotResponse(response.text);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

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
    
    // Generate appropriate bot response after a delay
    setTimeout(() => {
      const botMessage = generateBotResponse(userMessage.text);
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
          <div
            className="
              w-11 h-11 rounded-full
              flex items-center justify-center mr-3
              bg-gradient-to-br from-white via-gray-100 to-gray-200
              dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
              shadow-md border border-gray-200 dark:border-gray-700
            "
          >
            <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
          <div key={message.id} className={`mb-4 ${message.isUser ? 'text-right' : ''}`}>
            <span className={`inline-block py-2 px-3 max-w-[80%] rounded-lg ${
              message.isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {message.text}
            </span>
            
            {/* Display interactive options for bot messages */}
            {!message.isUser && message.options && (
              <div className="mt-2 flex flex-wrap gap-2">
                {message.options.map((option, index) => (
                  <Button 
                    key={index}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 text-sm py-1 rounded-full bg-white text-gray-900 border border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-800 dark:hover:text-white"
                    onClick={() => handleOptionClick(option.action)}
                  >
                    {option.icon}
                    {option.text}
                  </Button>
                ))}
              </div>
            )}
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
            className="flex-1 border border-gray-300 rounded-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 h-11 px-4"
          />
          <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full ml-2 h-11 px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
