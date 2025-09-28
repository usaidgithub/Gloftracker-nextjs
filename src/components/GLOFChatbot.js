import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Mountain, Droplets, Shield, MapPin, Clock, Download, Search, Menu, X, Settings } from 'lucide-react';

const GLOFChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "🏔️ Welcome to GLOF Tracker AI Assistant! I'm here to help you with Glacial Lake Outburst Floods, disaster management, and early warning systems in India. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const messagesEndRef = useRef(null);

  // Your GROQ API Key
const API_KEY = process.env.NEXT_PUBLIC_GROK_API_KEY;


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // GROQ API Integration
  const callGroqAPI = async (userMessage) => {
    const systemPrompt = `You are a specialized AI assistant for GLOF (Glacial Lake Outburst Floods) disaster management and early warning systems in India. Your expertise includes:

1. Glacial Lake Outburst Floods (GLOFs) - causes, mechanisms, and impacts
2. Glacial lakes in Indian Himalayas (Uttarakhand, Himachal Pradesh, Sikkim, Arunachal Pradesh)
3. Early warning systems and monitoring technologies
4. Disaster management and emergency response protocols
5. Prevention and mitigation strategies
6. Natural disasters in Himalayan regions
7. Risk assessment and hazard mapping
8. Community-based disaster preparedness

Provide accurate, technical, and actionable information. Use emojis appropriately and structure responses clearly. Focus on Indian context and practical applications for disaster management officials, researchers, and communities.also dont use bold word font styles use simple font without any bold style.give the answer in well structured way `;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('GROQ API Error:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await callGroqAPI(currentInput);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `❌ Error: ${error.message}. Please check your connection and try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { icon: AlertTriangle, text: "GLOF Risk Assessment", query: "Explain GLOF risk assessment methodology for Indian Himalayas" },
    { icon: Mountain, text: "Glacial Lakes in India", query: "List the most dangerous glacial lakes in India and their current risk status" },
    { icon: Shield, text: "Prevention Strategies", query: "What are the most effective GLOF prevention and mitigation strategies?" },
    { icon: Droplets, text: "Early Warning Systems", query: "How do GLOF early warning systems work and what technologies are used?" }
  ];

  const sidebarItems = [
    { icon: MapPin, text: "Risk Maps", desc: "View GLOF risk zones" },
    { icon: Clock, text: "Real-time Data", desc: "Live monitoring feeds" },
    { icon: Download, text: "Reports", desc: "Download analysis reports" },
    { icon: Search, text: "Research", desc: "Scientific publications" }
  ];

  const suggestedQueries = [
    'Uttarakhand GLOF prevention',
    'Disaster management protocols',
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#111827',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      
      {/* Sidebar */}
      <div style={{
        width: isMobile ? (sidebarOpen ? '280px' : '0') : '320px',
        backgroundColor: '#1f2937',
        transition: 'width 0.3s ease-in-out',
        overflow: 'hidden',
        flexShrink: 0,
        position: isMobile ? 'fixed' : 'static',
        height: '100%',
        zIndex: isMobile ? 50 : 1,
        transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)'
      }}>
        {/* Sidebar Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          padding: '0 20px',
          borderBottom: '1px solid #374151',
          backgroundColor: '#1f2937'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#2563eb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mountain size={18} />
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>GLOF Tracker</h1>
          </div>
          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* Sidebar Content */}
        <div style={{ padding: '20px', height: 'calc(100% - 64px)', overflowY: 'auto' }}>
          {/* API Status */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>System Status</h2>
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid #10b981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981'
                }}></div>
                <span style={{ fontSize: '14px' }}>AI System Online</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <h2 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>Features</h2>
          <div style={{ marginBottom: '24px' }}>
            {sidebarItems.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                marginBottom: '4px'
              }}
              onMouseEnter={(e) => e.target.closest('div').style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.closest('div').style.backgroundColor = 'transparent'}
              >
                <item.icon size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.text}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <h2 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>Quick Actions</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputMessage(action.query);
                  if (isMobile) setSidebarOpen(false);
                }}
                style={{
                  padding: '12px',
                  backgroundColor: '#374151',
                  borderRadius: '8px',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.2s',
                  fontSize: '12px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}
              >
                <action.icon size={16} style={{ color: '#3b82f6', marginBottom: '6px' }} />
                <div style={{ fontWeight: '500', lineHeight: '1.2' }}>{action.text}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100vh'
      }}>
        {/* Header */}
        <div style={{
          height: '64px',
          backgroundColor: '#1f2937',
          borderBottom: '1px solid #374151',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <button 
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '4px'
                }}
              >
                <Menu size={20} />
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>GLOF AI Assistant</h1>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                  Disaster Management & Early Warning
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981'
            }}></div>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>System Online</span>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: '#111827'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                maxWidth: '70%',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: message.type === 'user' ? '#2563eb' : 'transparent',
                  background: message.type === 'user' ? '#2563eb' : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  flexShrink: 0
                }}>
                  {message.type === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '18px',
                  backgroundColor: message.type === 'user' ? '#2563eb' : '#1f2937',
                  color: 'white',
                  wordBreak: 'break-word'
                }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-line', lineHeight: '1.4' }}>
                    {message.content}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    opacity: 0.6,
                    margin: '8px 0 0 0'
                  }}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                maxWidth: '70%'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
                }}>
                  <Bot size={18} />
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '18px',
                  backgroundColor: '#1f2937'
                }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0.16s'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0.32s'
                    }}></div>
                  </div>
                  <p style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    margin: '6px 0 0 0'
                  }}>AI thinking...</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #374151',
          backgroundColor: '#1f2937',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about GLOF prevention, glacial lakes, disaster management..."
              style={{
                flex: 1,
                padding: '14px 16px',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '24px',
                color: 'white',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              style={{
                padding: '14px 20px',
                backgroundColor: !inputMessage.trim() || isTyping ? '#4b5563' : '#2563eb',
                border: 'none',
                borderRadius: '24px',
                color: 'white',
                cursor: !inputMessage.trim() || isTyping ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.2s',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <Send size={16} />
              Send
            </button>
          </div>
          
          {/* Suggested Queries */}
          <div style={{
            marginTop: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {suggestedQueries.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#374151',
                  borderRadius: '16px',
                  fontSize: '12px',
                  border: 'none',
                  color: '#d1d5db',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default GLOFChatbot;