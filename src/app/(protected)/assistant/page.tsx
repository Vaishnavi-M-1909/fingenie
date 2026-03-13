"use client";

import { useState, useRef, useEffect } from "react";
import { MoveRight, Sparkles, Loader2, Image as ImageIcon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchHistory() {
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
      }
    }
    fetchHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-5)
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "assistant", content: "System Error. Protocol failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      paddingBottom: "140px" // Space for fixed input
    }}>
      
      {/* Immersive Header */}
      <header className="animate-reveal" style={{ padding: "40px 4vw 24px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <h1 className="display-large" style={{ color: "var(--text-primary)" }}>
          Intelligence.
        </h1>
        <div className="rule-thick" style={{ width: "40px", marginTop: "1rem" }} />
      </header>

      {/* Editorial Chat Flow */}
      <main style={{ flex: 1, padding: "0 4vw", maxWidth: "900px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
          <div key={i} className="animate-reveal" style={{ 
            animationDelay: "0.1s",
            alignSelf: isUser ? "flex-end" : "flex-start",
            maxWidth: "85%",
            display: "flex",
            flexDirection: "column",
            alignItems: isUser ? "flex-end" : "flex-start"
          }}>
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
              boxShadow: isUser ? "var(--shadow-hover)" : "none"
            }}>
              {m.content}
            </div>
          </div>
        )})}

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
        left: "250px", // Exact width of the sidebar
        right: 0,
        display: "flex",
        justifyContent: "center", // Center exactly in the remaining space
        padding: "0 24px",
        pointerEvents: "none",
        zIndex: 50,
      }}>
        {/* Input Card Container */}
        <div style={{
          flex: 1,
          maxWidth: "800px",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "16px",
          boxShadow: "var(--shadow-hover)",
          pointerEvents: "auto",
        }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input type="file" id="chat-image-upload" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.length) alert("Image upload functionality is active but processing requires visual model integration coming in the next update."); e.target.value = ''; }} />
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
            placeholder="Ask about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
        
        {/* Soft Suggested Actions */}
        <div style={{ margin: "12px 0 0 60px", display: "flex", gap: "12px", flexWrap: "wrap", opacity: (!input.trim() && !isLoading) ? 1 : 0, transition: "opacity 0.2s" }}>
          {["Analyze spending", "Savings strategy"].map(text => (
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
    </div>
  );
}
