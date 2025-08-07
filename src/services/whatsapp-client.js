const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

let client;
let clientStatus = 'initializing';

function setupWhatsappClient(app) {
  const authPath = process.env.SESSION_PATH || '.wwebjs_auth';

  client = new Client({
    authStrategy: new LocalAuth({ dataPath: authPath }),
    puppeteer: { headless: true, args: ['--no-sandbox'] }
  });

  client.on('qr', async (qr) => {
    clientStatus = 'qr';
    // Print QR in terminal
    require('qrcode-terminal').generate(qr, { small: true });
    // Generate PNG for web preview
    const qrPath = path.join(__dirname, '../../public/qr.png');
    const qrImage = await qrcode.toFile(qrPath, qr, { width: 300 });
  });

  client.on('ready', () => {
    clientStatus = 'ready';
    console.log('WhatsApp Client Ready');
  });

  client.on('authenticated', () => {
    clientStatus = 'authenticated';
    console.log('WhatsApp Client Authenticated');
  });

  client.on('auth_failure', () => {
    clientStatus = 'auth_failure';
    console.error('Auth Failure - restart needed');
  });

  client.on('disconnected', () => {
    clientStatus = 'disconnected';
    console.error('WhatsApp Client Disconnected');
  });

  client.initialize();

  // Make client available to all routes
  app.set('whatsappClient', client);
}

function getWhatsappClient(app) {
  return app.get('whatsappClient');
}

function getClientStatus() {
  return clientStatus;
}

module.exports = { setupWhatsappClient, getWhatsappClient, getClientStatus };
