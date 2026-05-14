import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Paperclip, Smile, Settings, User, Bot, Loader2, Maximize2, Minimize2, MoreVertical, Building2, Phone, LifeBuoy, FileText, ChevronRight, CheckCircle2, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Picker from 'emoji-picker-react';
import { useLang, t } from './i18n';

export type Message = {
  id: string;
  sender: 'user' | 'agent' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read' | 'failed';
  attachments?: string[];
  isInternal?: boolean;
};

export default function SupportSystem() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [view, setView] = useState<'home' | 'chat' | 'tickets'>('home');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: lang === 'TR' ? 'Merhaba! Vivia Pet Canlı Destek sistemine hoş geldiniz. Size nasıl yardımcı olabilirim?' : 'Hello! Welcome to Vivia Pet Live Support. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, view, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onEmojiClick = (emojiObject: any) => {
    setInput(prevInput => prevInput + emojiObject.emoji);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date(),
      status: 'sending'
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    setShowEmojiPicker(false);

    try {
      // Mark as read immediately to simulate fast reception
      setMessages(prev => prev.map(m => m.id === userMessage.id ? { ...m, status: 'read' } : m));
      
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, lang })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: data.reply || (lang === 'TR' ? 'Üzgünüm, bir hata oluştu.' : 'Sorry, an error occurred.'),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI chat error:", error);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: lang === 'TR' ? 'Sistemlerimizde geçici bir sorun yaşıyoruz. Lütfen daha sonra tekrar deneyin.' : 'We are experiencing temporary issues with our systems. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const activeTickets: any[] = []; // Empty state system

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-[999]"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="bg-brand-teal hover:bg-brand-teal-dark active:scale-95 transition-all text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <MessageSquare className="w-6 h-6 relative z-10" />
              
              {/* Online indicator */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-20" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Chat / Dashboard Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-[1000] bg-background border border-border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
              isExpanded 
                ? 'inset-4 sm:inset-10 rounded-2xl' 
                : 'bottom-6 right-6 w-[380px] h-[600px] max-h-[calc(100vh-48px)] rounded-2xl'
            }`}
          >
            {/* Header */}
            <div className="bg-foreground text-background shrink-0 select-none">
              <div className="flex items-center justify-between p-4 pl-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-teal/20 rounded-full flex items-center justify-center text-brand-teal">
                    <LifeBuoy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide">
                      {lang === 'TR' ? 'Müşteri Hizmetleri' : 'Support Center'}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-background/70 font-medium">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {lang === 'TR' ? 'Canlı Destek Çevrimiçi' : 'Live Support Online'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden sm:block">
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="flex items-center px-2 pb-0 gap-2 overflow-x-auto scrollbar-hide">
                <button 
                  onClick={() => setView('home')}
                  className={`px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${view === 'home' ? 'border-brand-teal text-brand-teal' : 'border-transparent text-background/70 hover:text-background'}`}
                >
                  {lang === 'TR' ? 'Ana Panel' : 'Home'}
                </button>
                <button 
                  onClick={() => setView('chat')}
                  className={`px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${view === 'chat' ? 'border-brand-teal text-brand-teal' : 'border-transparent text-background/70 hover:text-background'}`}
                >
                  {lang === 'TR' ? 'Canlı Sohbet' : 'Live Chat'}
                </button>
                <button 
                  onClick={() => setView('tickets')}
                  className={`px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${view === 'tickets' ? 'border-brand-teal text-brand-teal' : 'border-transparent text-background/70 hover:text-background'}`}
                >
                  {lang === 'TR' ? 'Taleplerim' : 'Support Tickets'}
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-secondary/30">
              
              {/* Home View */}
              {view === 'home' && (
                <div className="flex-1 overflow-y-auto p-5 pb-8">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground mb-1">
                      {lang === 'TR' ? 'Size nasıl yardımcı olabiliriz?' : 'How can we help you today?'}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {lang === 'TR' ? 'Destek asistanlarımız ve uzman ekibimiz sorunlarınızı çözmek için burada.' : 'Our support assistants and expert team are here to solve your issues.'}
                    </p>
                  </div>
                  
                  <div className="grid gap-3">
                    <button onClick={() => setView('chat')} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-brand-teal/50 hover:shadow-md transition-all text-left group">
                      <div className="w-10 h-10 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                         <h4 className="font-semibold text-sm text-foreground">{lang === 'TR' ? 'Canlı Sohbet Başlat' : 'Start Live Chat'}</h4>
                         <p className="text-xs text-muted-foreground mt-0.5">{lang === 'TR' ? 'AI asistanımız veya canlı temsilcilerimizle görüşün' : 'Talk with our AI assistant or live agents'}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>

                    <button onClick={() => setView('tickets')} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-brand-teal/50 hover:shadow-md transition-all text-left group">
                      <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-foreground">{lang === 'TR' ? 'Taleplerimi Görüntüle' : 'View My Tickets'}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{lang === 'TR' ? 'Açık ve geçmiş destek taleplerinizi takip edin' : 'Track your open and past support requests'}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    
                    <div className="mt-4 p-4 rounded-xl border border-brand-teal/20 bg-brand-teal/5">
                      <div className="flex items-start gap-4">
                        <div className="min-w-8 min-h-8 w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-1">{lang === 'TR' ? 'Sistem Durumu: Tam Operasyonel' : 'System Status: Fully Operational'}</h4>
                          <p className="text-xs text-muted-foreground">
                            {lang === 'TR' ? 'Tüm sistemlerimiz normal şekilde çalışıyor. Sohbet asistanımız size anında destek vermeye hazır.' : 'All systems are operating normally. Our chat assistant is ready to provide instant support.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat View */}
              {view === 'chat' && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <div className="text-center my-4">
                      <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border">
                        {new Date().toLocaleDateString(lang === 'TR' ? 'tr-TR' : 'en-US', { weekday: 'long', hour: '2-digit', minute:'2-digit' })}
                      </span>
                    </div>
                    
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
                      >
                        <div className="flex items-end gap-2 mb-1">
                          {message.sender !== 'user' && (
                            <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center shrink-0 shadow-sm border border-border">
                              {message.sender === 'ai' ? <Bot className="w-3.5 h-3.5 text-background" /> : <User className="w-3.5 h-3.5 text-background" />}
                            </div>
                          )}
                          <div 
                            className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                              message.sender === 'user' 
                                ? 'bg-brand-teal text-white rounded-br-sm' 
                                : 'bg-background border border-border text-foreground rounded-bl-sm'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                        {message.sender === 'user' && (
                          <div className="flex items-center gap-1 mr-1 text-[10px] text-muted-foreground font-medium">
                            {message.status === 'sending' && <span className="opacity-70">Sending...</span>}
                            {message.status === 'sent' && <CheckCircle2 className="w-3 h-3 text-muted-foreground" />}
                            {message.status === 'read' && <CheckCircle2 className="w-3 h-3 text-brand-teal" />}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex items-end gap-2 max-w-[85%] mr-auto text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center shrink-0 shadow-sm border border-border">
                          <Bot className="w-3.5 h-3.5 text-background" />
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-background border border-border rounded-bl-sm flex gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Web Socket Connection Status */}
                  <div className="px-4 py-1.5 bg-green-500/10 border-t border-green-500/20 text-[10px] font-bold text-green-600 flex items-center justify-center gap-1.5 z-10 shrink-0">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {lang === 'TR' ? 'CANLI DESTEK BAĞLI' : 'LIVE SUPPORT CONNECTED'}
                  </div>

                  {/* Input Area */}
                  <div className="p-3 bg-background border-t border-border shrink-0 relative">
                    {/* Emoji Picker Popup */}
                    <AnimatePresence>
                      {showEmojiPicker && (
                        <motion.div
                          ref={emojiPickerRef}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full right-4 mb-2 z-50 shadow-2xl"
                        >
                          <Picker onEmojiClick={onEmojiClick} autoFocusSearch={false} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative flex items-center bg-secondary/50 border border-border rounded-xl focus-within:border-brand-teal focus-within:ring-1 focus-within:ring-brand-teal/30 transition-all">
                      <button className="p-2.5 text-muted-foreground hover:text-brand-teal transition-colors rounded-l-xl flex shrink-0">
                        <Paperclip className="w-4.5 h-4.5" />
                      </button>
                      <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={lang === 'TR' ? 'Bir mesaj yazın...' : 'Type a message...'}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 py-3 min-w-0"
                      />
                      <button 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                        className={`p-2.5 transition-colors flex shrink-0 ${showEmojiPicker ? 'text-brand-teal' : 'text-muted-foreground hover:text-brand-teal'}`}
                      >
                        <Smile className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="m-1 p-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-dark disabled:opacity-50 disabled:hover:bg-brand-teal transition-colors flex shrink-0 shadow-sm"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Tickets View */}
              {view === 'tickets' && (
                <div className="flex-1 overflow-y-auto p-4 bg-secondary/10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-foreground">
                      {lang === 'TR' ? 'Destek Talepleriniz' : 'Your Tickets'}
                    </h2>
                    <button className="px-3 py-1.5 bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors text-xs font-bold rounded-md shadow-sm">
                      {lang === 'TR' ? '+ Yeni Talep' : '+ New Ticket'}
                    </button>
                  </div>
                  
                  {activeTickets.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {activeTickets.map(ticket => (
                        <div key={ticket.id} className="p-4 bg-background rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex justify-between mb-2">
                            <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                            <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">{ticket.status}</span>
                          </div>
                          <h4 className="font-semibold text-foreground text-sm mb-2">{ticket.subject}</h4>
                          <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-border/50 pt-2 mt-2">
                            <span>Updated {ticket.updated}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center border border-border mb-4 shadow-sm text-brand-teal/50">
                        <Ticket className="w-8 h-8" />
                      </div>
                      <h3 className="text-foreground font-semibold mb-2">
                        {lang === 'TR' ? 'Talebiniz bulunmuyor' : 'No active tickets'}
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        {lang === 'TR' 
                          ? 'Şu anda açık bir destek talebiniz bulunmamaktadır. Sorularınız için canlı sohbeti kullanabilir veya yeni bir talep oluşturabilirsiniz.' 
                          : 'You currently have no open support tickets. You can use live chat for immediate assistance or create a new ticket.'}
                      </p>
                      <button 
                        onClick={() => setView('chat')}
                        className="mt-6 px-5 py-2.5 bg-background border border-border rounded-xl font-medium text-sm hover:border-brand-teal hover:text-brand-teal transition-all"
                      >
                        {lang === 'TR' ? 'Sohbete Git' : 'Go to Chat'}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
