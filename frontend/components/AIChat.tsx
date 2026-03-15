'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '0',
    role: 'assistant',
    content:
      "Hi! I'm the AI Physiotherapy Assistant for Dr. Majid's Clinic. 👋\n\nI can help you:\n• Understand your symptoms\n• Suggest possible treatments\n• Recommend exercises\n• Answer your physiotherapy questions\n\nHow can I help you today?",
  },
];

// Local rule-based responses for common queries (fallback when OpenAI key not set)
function getLocalResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('back pain') || msg.includes('backache')) {
    return "Back pain is one of the most common conditions we treat. Causes include poor posture, muscle strain, herniated discs, and degenerative changes.\n\n**Recommended exercises:**\n• Cat-Cow Stretch\n• Pelvic Tilts\n• Child's Pose\n• Bird-Dog\n\nFor a comprehensive assessment, please book an appointment with Dr. Majid!";
  }
  if (msg.includes('neck') || msg.includes('cervical')) {
    return "Neck pain often comes from poor posture (especially 'tech neck' from screens), muscle tension, or cervical spondylosis.\n\n**Quick relief tips:**\n• Chin tucks\n• Gentle neck rotations\n• Heat therapy\n• Ergonomic workstation setup\n\nIf pain persists >2 weeks or radiates to arms, please consult Dr. Majid!";
  }
  if (msg.includes('knee') || msg.includes('knee pain')) {
    return "Knee pain can arise from osteoarthritis, patellofemoral syndrome, ligament injuries, or meniscal issues.\n\n**Helpful exercises:**\n• Straight leg raises\n• Mini squats\n• Step-ups\n• Hamstring strengthening\n\nOur clinic offers advanced knee physiotherapy including shockwave therapy and manual techniques!";
  }
  if (msg.includes('shoulder') || msg.includes('frozen shoulder')) {
    return "Frozen shoulder (adhesive capsulitis) causes gradual stiffening and pain. It can take 12–24 months if untreated.\n\n**Treatment at our clinic:**\n• Joint mobilisation\n• Capsular stretching\n• Ultrasound therapy\n• Progressive range-of-motion exercises\n\nEarly treatment gives the best results. Book an appointment now!";
  }
  if (msg.includes('sciatica') || msg.includes('sciatic')) {
    return "Sciatica causes shooting pain from the lower back through the leg, due to sciatic nerve compression.\n\n**Relief strategies:**\n• Piriformis stretch\n• Neural mobilisation exercises\n• Avoid prolonged sitting\n• Ice/heat therapy\n\nPersistent sciatica needs proper physiotherapy assessment. Dr. Majid specialises in this!";
  }
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule')) {
    return "To book an appointment with Dr. Majid:\n\n📅 **Online:** Scroll to the Booking section on this website\n📱 **WhatsApp:** Use the WhatsApp button to message us directly\n📞 **Call:** +91 XXX XXX XXXX\n\nClinics hours: Mon–Fri 9AM–6PM, Sat 9AM–2PM\n\nWe'll confirm your appointment within 2 hours!";
  }
  if (msg.includes('exercise') || msg.includes('workout')) {
    return "Exercise is a cornerstone of physiotherapy recovery! Specific exercises depend on your condition.\n\n**General principles:**\n• Start gently and progress gradually\n• Consistency is key (daily is better than intense occasional)\n• Stop if exercise causes sharp/worsening pain\n• Warm up before exercise\n\nFor a personalised exercise prescription, book a consultation with Dr. Majid!";
  }
  if (msg.includes('price') || msg.includes('cost') || msg.includes('fee')) {
    return "For consultation and treatment fees, please contact us directly:\n\n📞 **Call:** +91 XXX XXX XXXX\n📱 **WhatsApp:** Use the button on this page\n\nPricing varies based on treatment type and duration. We aim to make quality physiotherapy accessible to all patients in J&K!";
  }

  return "Thank you for your question! For accurate medical advice tailored to your specific condition, I recommend booking a consultation with Dr. Majid.\n\n**Quick contact options:**\n📅 Book online via the Booking section\n📱 WhatsApp us directly\n📞 Call +91 97971 52316\n\nIs there anything specific about physiotherapy I can help you understand?";
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const OPENAI_KEY = process.env.NEXT_PUBLIC_OPENAI_KEY;

      if (OPENAI_KEY && OPENAI_KEY !== 'your_openai_api_key_here') {
        // Use OpenAI if key is configured
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  "You are a helpful AI physiotherapy assistant for Dr. Majid's Advanced Physiotherapy Clinic in Sopore, Jammu & Kashmir, India. You help patients understand symptoms, suggest treatments, and recommend exercises. Always be caring and professional. Encourage people to book appointments with Dr. Majid for personalised care. Keep responses concise but helpful.",
              },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: 'user', content: userMessage.content },
            ],
            max_tokens: 350,
            temperature: 0.7,
          }),
        });

        if (!response.ok) throw new Error('OpenAI request failed');
        const data = await response.json();
        const botResponse = data.choices?.[0]?.message?.content ?? getLocalResponse(userMessage.content);

        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'assistant', content: botResponse },
        ]);
      } else {
        // Use local rule-based responses
        await new Promise((r) => setTimeout(r, 800)); // Simulate API delay
        const botResponse = getLocalResponse(userMessage.content);
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'assistant', content: botResponse },
        ]);
      }
    } catch {
      const botResponse = getLocalResponse(userMessage.content);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: botResponse },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="fixed z-[1000]"
        style={{
          bottom: '160px',
          right: '28px',
          width: '52px',
          height: '52px',
          background: 'linear-gradient(135deg, #0A84FF, #0068cc)',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(10,132,255,0.4)',
          color: 'white',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 3.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Physiotherapy Assistant"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X size={20} /> : <Bot size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ bottom: '230px' }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                background: 'linear-gradient(135deg, #0A84FF, #0068cc)',
                borderRadius: '24px 24px 0 0',
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Bot size={18} style={{ color: 'white' }} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>
                  AI Physio Assistant
                </p>
                <p className="text-white text-xs" style={{ opacity: 0.7 }}>
                  Ask about symptoms or treatments
                </p>
              </div>
              <div
                className="ml-auto w-2 h-2 rounded-full"
                style={{ background: '#34c759', boxShadow: '0 0 6px #34c759' }}
              />
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={msg.role === 'user' ? 'message-user' : 'message-bot'}
                >
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <strong style={{ color: msg.role === 'user' ? 'white' : 'var(--text-primary)' }}>
                          {line.slice(2, -2)}
                        </strong>
                      ) : (
                        line
                      )}
                      {i < msg.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              ))}
              {isLoading && (
                <div className="message-bot flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" style={{ color: '#0A84FF' }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions */}
            <div
              className="flex gap-2 px-4 pb-2 overflow-x-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {['Back pain relief', 'Knee exercises', 'Book appointment'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full flex-shrink-0 transition-all"
                  style={{
                    background: 'rgba(10,132,255,0.1)',
                    border: '1px solid rgba(10,132,255,0.2)',
                    color: '#0A84FF',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <input
                type="text"
                placeholder="Ask about symptoms or treatments..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm outline-none"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-inter)',
                }}
                maxLength={500}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #0A84FF, #0068cc)' : 'var(--glass-bg)',
                  border: '1px solid var(--border)',
                  color: input.trim() ? 'white' : 'var(--text-muted)',
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
