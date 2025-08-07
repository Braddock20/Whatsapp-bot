const express = require('express');
const router = express.Router();

router.post('/send', async (req, res) => {
  const client = req.app.get('whatsappClient');
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing "to" or "message"' });
  }

  try {
    const response = await client.sendMessage(to, message);
    res.json({ status: 'sent', messageId: response.id.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send media (image/video/audio)
router.post('/send-media', async (req, res) => {
  const client = req.app.get('whatsappClient');
  const { to, mimetype, filename, data } = req.body;

  if (!to || !mimetype || !filename || !data) {
    return res.status(400).json({ error: 'Missing media info or recipient' });
  }

  try {
    const { MessageMedia } = require('whatsapp-web.js');
    const media = new MessageMedia(mimetype, data, filename);
    const response = await client.sendMessage(to, media);
    res.json({ status: 'sent', messageId: response.id.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
