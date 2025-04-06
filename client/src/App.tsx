import { useState } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ResumeAnalyzer from "@/pages/ResumeAnalyzer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resume-analyzer" component={ResumeAnalyzer} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header onChatToggle={toggleChat} />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
