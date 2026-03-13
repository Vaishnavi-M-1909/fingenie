"use client";

import { useState, useRef, useEffect } from "react";
import { MoveRight, Sparkles, Loader2, Image as ImageIcon, X, Copy, Pencil, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RecommendationCards from "@/components/RecommendationCards";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  recommendations?: Array<{
    id: string;
    title: string;
    type: string;
    url: string;
    author: string | null;
    description: string;
    thumbnailUrl: string | null;
  }>;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const MENTION_OPTIONS = [
    { id: "insights", label: "Latest Insights", description: "Inject your latest AI financial analysis" },
    { id: "transactions", label: "Recent Transactions", description: "Inject your last 10 transactions" },
    { id: "statements", label: "Statement Summary", description: "Inject your recent upload history" },
    { id: "summary", label: "Financial Summary", description: "Inject a top-down view of your finances" },
    { id: "tax", label: "Tax Resources", description: "Get AI-curated tax saving videos & articles" },
    { id: "investing", label: "Investing Resources", description: "Get videos & articles on investing" },
    { id: "budgeting", label: "Budgeting Resources", description: "Get tips on managing your budget" },
    { id: "savings", label: "Savings Resources", description: "Learn smart saving strategies" },
  ];

  useEffect(() => {
    async function fetchHistory() {
      setIsHistoryLoading(true);
      try {
        const res = await fetch("/api/chat");
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          } else {
            setMessages([
              { role: "assistant", content: "I am FinGenie. How can I assist you with your finances today?" }
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      } finally {
        setIsHistoryLoading(false);
      }
    }
    fetchHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Detect @ for suggestions
    const lastWord = value.split(" ").pop() || "";
    if (lastWord.startsWith("@")) {
      setMentionFilter(lastWord.slice(1).toLowerCase());
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectMention = (id: string) => {
    const words = input.split(" ");
    words.pop(); // Remove the partial @mention
    const newValue = [...words, `@${id} `].join(" ");
    setInput(newValue);
    setShowSuggestions(false);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = imagePreview;
    
    setInput("");
    setSelectedImage(null);
    setImagePreview(null);
    setShowSuggestions(false);

    // Context Injection Logic
    let injectedContext = "";
    const mentionMatches = userMessage.match(/@(\w+)/g);
    if (mentionMatches) {
      const types = mentionMatches.map(m => m.slice(1));
      try {
        const contexts = await Promise.all(types.map(async type => {
          const res = await fetch(`/api/chat/context?type=${type}`);
          if (res.ok) {
            const json = await res.json();
            return `--- Context: @${type} ---\n${JSON.stringify(json.data, null, 2)}`;
          }
          return "";
        }));
        injectedContext = contexts.filter(c => c).join("\n\n");
      } catch (err) {
        console.error("Context injection failed:", err);
      }
    }
    
    const tempUserMessageId = `temp-${Date.now()}`;
    setMessages(prev => [...prev, { 
      id: tempUserMessageId,
      role: "user", 
      content: userMessage || "Sent an image", 
      imageUrl: currentImage || undefined 
    }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          image: currentImage,
          injectedContext
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      
      const data = await response.json();
      
      // Update UI with real IDs and AI response
      setMessages(prev => {
        const next = [...prev];
        // Replace temp ID with real DB ID
        const idx = next.findIndex(m => m.id === tempUserMessageId);
        if (idx !== -1) {
          next[idx] = { ...next[idx], id: data.userMessageId };
        }
        // Add AI response with recommendations
        next.push({
          id: data.aiMessageId,
          role: "assistant",
          content: data.message,
          recommendations: data.recommendations,
        });
        return next;
      });
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "assistant", content: "System Error. Protocol failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleEditSubmit = async (messageId: string) => {
    if (!editInput.trim() || isLoading) return;
    
    // Find index of the edited message
    const msgIndex = messages.findIndex(m => m.id === messageId);
    if (msgIndex === -1) return;

    // Optimistic update: truncate following messages and update the edited message
    const updatedMessages = messages.slice(0, msgIndex + 1);
    updatedMessages[msgIndex] = { ...updatedMessages[msgIndex], content: editInput };
    
    setMessages(updatedMessages);
    setEditingMessageId(null);
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/chat/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editInput })
      });
      if (!response.ok) throw new Error("Failed to save edit");
      
      const data = await response.json();
      
      // Append the new AI response generated from the branched history
      setMessages(prev => [...prev, { 
        id: data.aiMessageId, 
        role: "assistant", 
        content: data.message,
        recommendations: data.recommendations
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "System Error. Edit failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      paddingBottom: "140px" 
    }}>
      
      {/* Immersive Header */}
      <header className="animate-reveal" style={{ padding: "4rem 4vw 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <h1 className="display-large" style={{ color: "var(--text-primary)" }}>
          Intelligence.
        </h1>
        <div className="rule-thick" style={{ width: "40px", marginTop: "1rem" }} />
      </header>

      {/* Editorial Chat Flow */}
      <main style={{ flex: 1, padding: "0 4vw", maxWidth: "900px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {messages.map((m, i) => {
          const messageKey = m.id ? String(m.id) : `index-${i}`;
          const isUser = m.role === "user";
          const isHovered = hoveredMessageId === messageKey;
          const isEditing = editingMessageId === m.id;

          return (
            <div 
              key={messageKey} 
              className="animate-reveal" 
              onMouseEnter={() => setHoveredMessageId(messageKey)}
              onMouseLeave={() => setHoveredMessageId(null)}
              style={{ 
                animationDelay: "0.1s",
                alignSelf: isUser ? "flex-end" : "flex-start",
                maxWidth: "85%",
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
                position: "relative",
                paddingBottom: isHovered && !isEditing ? "2.5rem" : "0.5rem",
                transition: "padding-bottom 0.2s ease"
              }}
            >
              <div className="eyebrow" style={{ 
                color: isUser ? "var(--text-tertiary)" : "var(--brand-primary)",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                {!isUser && <Sparkles size={14} />}
                {isUser ? "QUERY" : "FINGENIE"}
              </div>
              
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: isUser ? "1.05rem" : "1rem",
                fontWeight: isUser ? 500 : 400,
                lineHeight: 1.6,
                color: isUser ? "var(--bg-primary)" : "var(--text-secondary)",
                background: isUser ? "var(--text-primary)" : "var(--bg-secondary)",
                border: isUser ? "none" : "1px solid var(--border-light)",
                padding: "16px 20px",
                borderRadius: isUser ? "var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)" : "var(--radius-lg) var(--radius-lg) var(--radius-lg) 0",
                boxShadow: isUser ? "var(--shadow-hover)" : "none",
                position: "relative",
                width: "fit-content",
              }}>
                {isEditing ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", minWidth: "250px" }}>
                    <textarea 
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          m.id && handleEditSubmit(m.id);
                        }
                      }}
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-sm)",
                        padding: "8px",
                        color: "inherit",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        resize: "vertical"
                      }}
                      autoFocus
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }} onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setEditingMessageId(null)}
                        style={{ background: "transparent", border: "1px solid var(--border-light)", padding: "4px 8px", borderRadius: "4px", color: "inherit", cursor: "pointer", fontSize: "12px" }}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => m.id && handleEditSubmit(m.id)}
                        style={{ background: "var(--brand-primary)", border: "none", padding: "4px 8px", borderRadius: "4px", color: "white", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        <Check size={12} /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {m.imageUrl && (
                      <div style={{ marginBottom: "0.75rem", cursor: "pointer" }} onClick={() => setFullScreenImage(m.imageUrl!)}>
                        <img 
                          src={m.imageUrl} 
                          alt="Uploaded query" 
                          style={{ 
                            maxWidth: "100%", 
                            maxHeight: "200px", 
                            borderRadius: "var(--radius-sm)", 
                            display: "block",
                            border: "1px solid var(--border-light)" 
                          }} 
                        />
                      </div>
                    )}
                    <div className="markdown-prose" style={{ width: "100%" }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </>
                )}
              </div>

              {!isUser && m.recommendations && m.recommendations.length > 0 && (
                <div style={{ 
                  marginTop: "8px", 
                  width: "100%", 
                  maxWidth: "900px",
                  alignSelf: "flex-start",
                  animation: "revealUp 0.4s ease-out forwards"
                }}>
                  <RecommendationCards recommendations={m.recommendations} />
                </div>
              )}

              {/* Action Buttons Below Bubble */}
              {!isEditing && isHovered && (
                <div style={{
                  position: "absolute",
                  bottom: "4px",
                  [isUser ? "right" : "left"]: "12px",
                  display: "flex",
                  gap: "4px",
                  animation: "animate-reveal 0.2s ease-out"
                }}>
                  <div style={{
                    display: "flex",
                    gap: "4px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-sm)",
                    padding: "2px",
                    boxShadow: "var(--shadow-sm)",
                  }}>
                    <button 
                      onClick={() => handleCopy(m.content)}
                      title="Copy text"
                      style={{ background: "transparent", border: "none", color: "var(--text-tertiary)", cursor: "pointer", padding: "4px", borderRadius: "4px", display: "flex" }}
                    >
                      <Copy size={13} />
                    </button>
                    {isUser && m.id && (
                      <button 
                        onClick={() => { setEditInput(m.content); setEditingMessageId(m.id!); }}
                        title="Edit message"
                        style={{ background: "transparent", border: "none", color: "var(--text-tertiary)", cursor: "pointer", padding: "4px", borderRadius: "4px", display: "flex" }}
                      >
                        <Pencil size={13} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isHistoryLoading && (
          <div style={{ padding: "1rem", color: "var(--text-tertiary)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <Loader2 size={14} className="animate-spin" />
            Synchronizing neural ledger...
          </div>
        )}

        {isLoading && (
          <div className="animate-reveal" style={{ animationDelay: "0.1s" }}>
            <div className="eyebrow" style={{ color: "var(--brand-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Loader2 size={14} className="animate-spin" />
              PROCESSING
            </div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--text-tertiary)",
            }}>
              Analyzing financial vectors...
            </div>
          </div>
        )}
        <div ref={scrollRef} style={{ height: "1px" }} />
      </main>

      {/* Floating Soft Input Wrapper */}
      <div className="animate-fade-in-up" style={{
        position: "fixed",
        bottom: "24px",
        left: "250px", 
        right: 0,
        display: "flex",
        justifyContent: "center",
        padding: "0 4vw",
        pointerEvents: "none",
        zIndex: 50,
      }}>
        <div style={{
          width: "100%",
          maxWidth: "900px",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "16px",
          boxShadow: "var(--shadow-hover)",
          pointerEvents: "auto",
        }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", position: "relative" }}>
            {/* Mention Suggestions Dropdown */}
            {showSuggestions && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 12px)",
                left: "60px",
                width: "300px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-hover)",
                padding: "8px",
                zIndex: 60,
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}>
                <div className="eyebrow" style={{ padding: "8px", fontSize: "0.7rem", borderBottom: "1px solid var(--border-light)", marginBottom: "4px" }}>
                  CONTEXT TRIGGERS
                </div>
                {MENTION_OPTIONS.filter(opt => opt.id.includes(mentionFilter) || opt.label.toLowerCase().includes(mentionFilter)).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectMention(opt.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      transition: "background 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "var(--bg-primary)"}
                    onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ fontWeight: 600, color: "var(--brand-primary)", fontSize: "0.9rem" }}>@{opt.id}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{opt.description}</div>
                  </button>
                ))}
              </div>
            )}

            {imagePreview && (
              <div style={{ position: "relative", marginBottom: "8px", cursor: "pointer" }} onClick={() => setFullScreenImage(imagePreview)}>
                <img src={imagePreview} alt="Preview" style={{ height: "60px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }} />
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setImagePreview(null); }}
                  style={{ position: "absolute", top: "-8px", right: "-8px", background: "var(--accent-coral)", color: "white", border: "none", borderRadius: "50%", width: "20px", height: "20px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <input type="file" id="chat-image-upload" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
            <button 
              style={{ 
                background: "var(--bg-primary)",
                border: "1px solid var(--border-light)",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = "var(--brand-primary)"; e.currentTarget.style.borderColor = "var(--brand-primary)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-light)"; }}
              onClick={() => document.getElementById("chat-image-upload")?.click()}
              title="Attach Image"
            >
              <ImageIcon size={20} />
            </button>
            
            <input 
              className="input"
              style={{ 
                flex: 1,
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "12px 16px",
                fontSize: "1rem",
                fontFamily: "var(--font-body)",
              }}
              placeholder="Ask about your finances... use @ for context"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button 
              className="btn btn-primary"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              style={{ 
                borderRadius: "var(--radius-md)",
                padding: "0 20px",
                height: "46px",
                opacity: !input.trim() || isLoading ? 0.3 : 1
              }}
            >
              <MoveRight size={20} />
            </button>
          </div>
          
          <div style={{ margin: "12px 0 0 60px", display: "flex", gap: "12px", flexWrap: "wrap", opacity: (!input.trim() && !isLoading) ? 1 : 0, transition: "opacity 0.2s" }}>
            {["Analyze spending", "Savings strategy", "Help me with @tax", "Learn about @investing"].map(text => (
              <button 
                key={text}
                onClick={() => { setInput(text); }}
                style={{ 
                  background: "var(--bg-primary)", 
                  border: "1px solid var(--border-light)", 
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  padding: "6px 12px",
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--text-secondary)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; e.currentTarget.style.borderColor = "var(--border-light)"; }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {fullScreenImage && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem"
          }}
          onClick={() => setFullScreenImage(null)}
        >
          <img 
            src={fullScreenImage} 
            alt="Full screen preview" 
            style={{ 
              maxWidth: "100%", 
              maxHeight: "100%", 
              objectFit: "contain",
              borderRadius: "var(--radius-md)"
            }} 
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              padding: "0.5rem",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex"
            }}
            onClick={() => setFullScreenImage(null)}
          >
            <X size={24} />
          </button>
        </div>
      )}

    </div>
  );
}
