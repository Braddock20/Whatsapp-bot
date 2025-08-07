require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { setupWhatsappClient, getClientStatus } = require('./services/whatsapp-client');

// API routers
const messageRoutes = require('./api/messages');
const statusRoutes = require('./api/status');
const groupRoutes = require('./api/groups');
const contactRoutes = require('./api/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Optionally serve QR as PNG for browser preview
app.use('/public', express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/messages', messageRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/contacts', contactRoutes);

// Health check & status
app.get('/api/health', (req, res) => res.json({ status: 'ok', whatsapp: getClientStatus() }));

// WhatsApp client setup
setupWhatsappClient(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
