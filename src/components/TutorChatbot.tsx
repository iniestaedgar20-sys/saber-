import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ChevronDown, 
  RotateCcw, 
  Copy, 
  Check, 
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Maximize2,
  Minimize2,
  BookOpen
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

interface TutorChatbotProps {
  activeCourseId?: string;
  onNavigate?: (view: string, courseId?: string) => void;
}

export const TutorChatbot: React.FC<TutorChatbotProps> = ({ activeCourseId, onNavigate }) => {
  const { currentUser, courses } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active course context
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  // Conversation history
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'tutor',
        text: `Olá ${currentUser?.displayName || 'aluno'}! 👋 Sou o teu **Tutor Saber+**.
Estou aqui para te explicar passo a passo qualquer dúvida que tenhas durante as tuas aulas de **Excel**, **CapCut**, **Manicure**, **Cutilagem** ou **Maquiagem**.

Podes perguntar livremente ou clicar numa das sugestões rápidas abaixo!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Listen to custom event to open tutor with specific context
  useEffect(() => {
    const handleOpenWithQuestion = (e: any) => {
      setIsOpen(true);
      if (e.detail?.question) {
        handleSendMessage(e.detail.question);
      }
    };

    window.addEventListener('open-tutor-question', handleOpenWithQuestion);
    return () => {
      window.removeEventListener('open-tutor-question', handleOpenWithQuestion);
    };
  }, [activeCourse, messages]);

  // Preset question suggestions based on course context
  const getSuggestions = () => {
    if (activeCourse?.id === 'course-excel-zero') {
      return [
        'Como funciona a função PROCV com exemplo?',
        'Como usar a função SE com aprovado/reprovado?',
        'Quais os atalhos de teclado mais úteis?',
        'Como fixar células com o cifrão ($)?'
      ];
    }
    if (activeCourse?.id?.includes('capcut')) {
      return [
        'Como sincronizar o vídeo com a batida da música?',
        'Como colocar legendas automáticas em português?',
        'Qual a melhor configuração para exportar em 1080p?',
        'Como fazer cortes rápidos sem perder o ritmo?'
      ];
    }
    if (activeCourse?.id?.includes('cutilagem') || activeCourse?.id?.includes('manicure')) {
      return [
        'Qual o ângulo correto para segurar o alicate?',
        'Como tirar a cutícula inteira sem repicar?',
        'O que fazer se a cutícula começar a sangrar?',
        'Dicas para o esmalte não descascar rápido'
      ];
    }
    if (activeCourse?.id?.includes('makeup')) {
      return [
        'Qual a ordem correta dos produtos de pele?',
        'Como evitar que a base fique craquelada?',
        'Como acertar o tom do corretivo e da base?',
        'Dica para fazer um esfumado básico e elegante'
      ];
    }
    return [
      'Como funciona o método de estudo das aulas?',
      'Dúvida de Excel: como fazer uma soma condicional?',
      'Dúvida de CapCut: como cortar vídeos rapidamente?',
      'Dúvida de Cutilagem: qual o ângulo do alicate?'
    ];
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          studentName: currentUser?.displayName || 'Aluno',
          courseTitle: activeCourse?.title,
          lessonTitle: activeCourse?.modules?.[0]?.lessons?.[0]?.title,
          history: messages.slice(-5)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const tutorReply = data.reply || 'Desculpa, não consegui obter a resposta agora. Podes tentar reformular a tua pergunta?';

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: tutorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorMsg]);
    } catch (err) {
      console.error('Failed to contact AI tutor API:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: `Tive uma breve falha de conexão, mas aqui está a recomendação prática:

- Se for sobre **Excel**, lembra-te de usar \`=SOMA()\`, \`=SE()\` ou \`=PROCV()\` e fixar com a tecla **F4**.
- Se for sobre **CapCut**, usa a tecla **C** para cortar e **V** para selecionar, exportando a 1080p e 30fps.
- Se for sobre **Cutilagem**, inclina o alicate a **45 graus** e nunca puxes a pele.

Podes tentar enviar a tua pergunta novamente!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'tutor',
        text: 'Histórico limpo! Em que posso te ajudar agora?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to format simple markdown-like text (bold, code blocks, bullet points)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // Header line
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-[#F3F5F0] text-sm pt-1 border-b border-[#344448] pb-1">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }

          // Bullet item
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1 text-[#F3F5F0]">
                <span className="text-[#D6F36A] font-bold">•</span>
                <span>{renderInlineStyles(content)}</span>
              </div>
            );
          }

          // Numbered item
          if (/^\d+\.\s/.test(trimmed)) {
            const match = trimmed.match(/^(\d+\.)\s(.*)$/);
            if (match) {
              return (
                <div key={idx} className="flex items-start gap-1.5 pl-1 text-[#F3F5F0]">
                  <span className="text-[#75C9B7] font-mono font-bold">{match[1]}</span>
                  <span>{renderInlineStyles(match[2])}</span>
                </div>
              );
            }
          }

          // Empty line
          if (trimmed === '') {
            return <div key={idx} className="h-1" />;
          }

          // Default text line
          return (
            <p key={idx} className="text-[#F3F5F0]">
              {renderInlineStyles(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // Inline formatting helper (**bold**, `code`)
  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-[#111719] text-[#D6F36A] font-mono text-[11px] border border-[#344448]">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#F3F5F0]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Action Button (Always Visible) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#192326] border border-[#344448] text-xs font-semibold text-[#F3F5F0] shadow-xl animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#D6F36A] animate-pulse" />
            <span>Tutor IA para Dúvidas</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Abrir Tutor de Dúvidas IA"
            className="w-14 h-14 rounded-2xl bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] flex items-center justify-center shadow-2xl shadow-[#D6F36A]/20 transition-all hover:scale-105 active:scale-95 group relative border border-[#c2e256]"
          >
            <Bot className="w-7 h-7 text-[#111719] group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#75C9B7] rounded-full border-2 border-[#111719]" />
          </button>
        </div>
      )}

      {/* Floating Chat Dialog */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-[#192326] border border-[#344448] shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-3 sm:inset-10 rounded-2xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-[#141B1D] border-b border-[#344448] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#202D30] border border-[#D6F36A]/40 flex items-center justify-center text-[#D6F36A]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#F3F5F0]">
                    Tutor Saber+ IA
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] text-[#75C9B7] font-semibold bg-[#75C9B7]/15 px-2 py-0.5 rounded-full border border-[#75C9B7]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#75C9B7] animate-pulse" />
                    Online
                  </span>
                </div>
                <div className="text-[11px] text-[#A4B2AF] truncate max-w-[200px]">
                  {activeCourse ? activeCourse.title : 'Esclarecimento de Dúvidas'}
                </div>
              </div>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-1 text-[#A4B2AF]">
              <button
                onClick={handleClearHistory}
                title="Limpar conversa"
                className="p-1.5 hover:text-[#F3F5F0] hover:bg-[#202D30] rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Reduzir janela" : "Expandir janela"}
                className="hidden sm:block p-1.5 hover:text-[#F3F5F0] hover:bg-[#202D30] rounded-lg transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Minimizar"
                className="p-1.5 hover:text-[#F3F5F0] hover:bg-[#202D30] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Course Banner */}
          {activeCourse && (
            <div className="px-4 py-2 bg-[#111719] border-b border-[#344448] flex items-center justify-between text-[11px] shrink-0">
              <span className="text-[#A4B2AF] flex items-center gap-1.5 truncate">
                <BookOpen className="w-3.5 h-3.5 text-[#D6F36A] shrink-0" />
                <span>Contexto: <strong className="text-[#F3F5F0]">{activeCourse.title}</strong></span>
              </span>
              <span className="text-[#75C9B7] font-semibold shrink-0">
                Pronto a explicar
              </span>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl shadow-sm ${
                      isUser
                        ? 'bg-[#D6F36A] text-[#111719] font-medium rounded-tr-sm'
                        : 'bg-[#202D30] border border-[#344448] text-[#F3F5F0] rounded-tl-sm'
                    }`}
                  >
                    {isUser ? (
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>

                  {/* Metadata and Copy Button */}
                  <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#A4B2AF]">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="hover:text-[#F3F5F0] transition-colors flex items-center gap-1"
                        title="Copiar explicação"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#75C9B7]" />
                            <span className="text-[#75C9B7]">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#202D30] border border-[#344448] text-xs text-[#A4B2AF] w-fit">
                <Bot className="w-4 h-4 text-[#D6F36A] animate-bounce" />
                <span>O Tutor está a preparar a explicação detalhada...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Pills */}
          <div className="p-2.5 bg-[#141B1D] border-t border-[#344448] shrink-0">
            <div className="flex items-center gap-1 text-[10px] text-[#A4B2AF] mb-1.5 px-1 font-semibold uppercase tracking-wider">
              <Lightbulb className="w-3 h-3 text-[#D6F36A]" />
              <span>Dúvidas Frequentes da Aula:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {getSuggestions().map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-[#192326] hover:bg-[#202D30] border border-[#344448] hover:border-[#D6F36A] text-[11px] text-[#A4B2AF] hover:text-[#F3F5F0] whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#111719] border-t border-[#344448] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Escreve a tua dúvida sobre a aula..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#192326] border border-[#344448] text-xs text-[#F3F5F0] placeholder:text-[#A4B2AF]/50 focus:outline-none focus:border-[#D6F36A] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Enviar mensagem"
              className="p-2.5 rounded-xl bg-[#D6F36A] hover:bg-[#c2e256] text-[#111719] font-bold transition-all disabled:opacity-40 disabled:hover:bg-[#D6F36A]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
