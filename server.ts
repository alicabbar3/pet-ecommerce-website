import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Emails
  app.post('/api/email', async (req, res) => {
    try {
      const apiKey = process.env.RESEND_API_KEY;
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
