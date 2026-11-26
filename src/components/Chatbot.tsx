import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const responses: Record<string, string> = {
    hi: 'Hello! Welcome to Vinayaga Coir Products.',
    hello: 'Hi, how can I help you today?',
    hey: 'Hey there! Welcome to Vinayaga Coir Products. How can we assist you?',
    product: 'We offer Coir Fiber, Coco Peat and Coir Rope.',
    products: 'We offer Coir Fiber, Coco Peat and Coir Rope.',
    price: 'Please contact us on WhatsApp for latest pricing.',
    pricing: 'Please contact us on WhatsApp for latest pricing.',
    contact: 'Call us at +91 9443408684.',
    email: 'You can reach us at nivendhan03@gmail.com.',
    location: 'We are located at 75VQ+VJ, Ponnakannikadu, Tamil Nadu 614804, India.',
    export: 'Yes! We export to 20+ countries worldwide.',
    quality: 'Our products are premium quality, eco-friendly, and sustainably manufactured.',
    hours: 'Our business hours are Mon - Sat, 6 AM - 6 PM IST.',
    timing: 'Our business hours are Mon - Sat, 6 AM - 6 PM IST.',
    about: 'Vinayaga Coir Products is a premier manufacturer and exporter of premium quality coir products based in Tamil Nadu, India.',
    certified: 'We are ISO Certified and produce 100% natural, eco-friendly coir solutions.',
    'வணக்கம்': 'வணக்கம்! Vinayaga Coir Products-க்கு வரவேற்கிறோம்.',
    'பொருட்கள்': 'எங்களிடம் Coir Fiber, Coco Peat மற்றும் Coir Rope கிடைக்கும்.',
    'விலை': 'தயவுசெய்து WhatsApp-ல் எங்களை தொடர்புகொள்ளவும்.',
    'தொடர்பு': '+91 9443408684 எண்ணில் எங்களை தொடர்புகொள்ளவும்.',
};

function getBotResponse(input: string): string {
    const lower = input.toLowerCase().trim();
    for (const [key, value] of Object.entries(responses)) {
        if (lower.includes(key)) return value;
    }
    return "For detailed or unknown inquiries, please contact the admin directly: Call +91 9443408684 or email nivendhan03@gmail.com.";
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            text: 'Hello! Welcome to Vinayaga Coir Products. How can I help you?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text: input.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        const botReply: Message = {
            id: Date.now() + 1,
            text: getBotResponse(input),
            sender: 'bot',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg, botReply]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isOpen ? 'bg-primary-900 text-white rotate-0' : 'bg-primary-800 text-white'
                    }`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 left-6 z-40 w-[340px] max-h-[500px] bg-white rounded-2xl shadow-2xl border border-primary-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-left ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-primary-800 text-white p-4 flex items-center gap-3">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Vinayaga Chat</h3>
                        <p className="text-primary-200 text-xs">Typically replies instantly</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: '320px' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-primary-800 text-white rounded-br-md'
                                    : 'bg-primary-50 text-eco-text rounded-bl-md'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-primary-100 flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 bg-primary-50 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="p-2.5 bg-primary-800 text-white rounded-full hover:bg-primary-700 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </>
    );
}
