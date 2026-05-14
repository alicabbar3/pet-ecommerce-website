import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const REAL_GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const REAL_RESEND_API_KEY = process.env.RESEND_API_KEY;
  console.log('API key at start:', REAL_GEMINI_API_KEY?.substring(0,4));
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat Route
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const apiKey = REAL_GEMINI_API_KEY;
      const { messages, lang } = req.body;
      
      // If API key is missing or is the default placeholder, use a simulated response
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
        console.log('Using simulated AI response due to missing or placeholder API key.');
        const isTr = lang === 'TR';
        
        // Return a realistic auto-responder based on their message
        setTimeout(() => {
          return res.status(200).json({ 
            reply: isTr 
              ? 'Destek ekibimiz şu anda çok yoğun ancak talebinizi aldık. Lütfen sipariş numaranızı iletebilir misiniz? (Not: Gemini API yapılandırılmadığı için bu otomatik bir yanıttır.)' 
              : 'Our support team is currently experiencing high volume, but we have received your request. Could you please provide your order number? (Note: This is an auto-reply since the Gemini API key is not configured or is a placeholder.)'
          });
        }, 1500);
        return;
      }

      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are a helpful and professional customer support AI assistant for Vivia Pet. You solve customer problems related to pet products, order support, and general inquiries. 
      Respond consistently in the user's preferred language (currently: ${lang}).
      Keep responses concise, helpful, and friendly. Do not use markdown unless necessary for links. If the user issue is complex or angry, offer to escalate to a human agent.`;
      
      const history = messages.slice(0, -1).map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));
      
      const latestMessage = messages[messages.length - 1].content;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: latestMessage }] }
        ],
        config: { systemInstruction }
      });
      
      return res.status(200).json({ reply: response.text });
    } catch (err) {
      console.error('AI chat error:', err);
      const prefix = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 4) : 'none';
      return res.status(500).json({ error: String(err), prefix });
    }
  });

  // API Route for Emails
  app.post('/api/email', async (req, res) => {
    try {
      const apiKey = REAL_RESEND_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'RESEND_API_KEY environment variable is missing.' });
      }

      const resend = new Resend(apiKey);
      const { to, type, data } = req.body;

      if (!to || !type) {
        return res.status(400).json({ error: 'Missing required fields: to, type' });
      }

      let subject = 'Notification from Vivia Pet';
      let html = '<p>Hello!</p>';

      if (type === 'REGISTER') {
        subject = 'Welcome to Vivia Pet!';
        html = `<h1>Welcome aboard, ${data?.firstName || 'Pet Lover'}!</h1><p>Your account has been created successfully. Enjoy shopping for your furry friends!</p>`;
      } else if (type === 'CHECKOUT') {
        subject = 'Order Confirmation - Vivia Pet';
        html = `<h1>Thank you for your order!</h1><p>We've received your order and are processing it. We'll send you another email when it ships.</p>`;
      } else if (type === 'SHIPPING') {
        subject = 'Your Order has Shipped! - Vivia Pet';
        html = `<h1>Good news!</h1><p>Your order is on its way. You can track it in your account dashboard.</p>`;
      } else if (type === 'PASSWORD_RESET') {
        subject = 'Password Reset Request - Vivia Pet';
        html = `<h1>Password Reset</h1><p>Click the link below to reset your password:</p><a href="#">Reset Password</a>`;
      }

      const { data: result, error } = await resend.emails.send({
        from: 'Vivia Pet <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      });

      if (error) {
        return res.status(400).json({ error });
      }

      return res.status(200).json({ success: true, id: result?.id });
    } catch (err) {
      console.error('Email error:', err);
      return res.status(500).json({ error: String(err) });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
