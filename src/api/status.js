const express = require('express');
const router = express.Router();

router.get('/fetch', async (req, res) => {
  const client = req.app.get('whatsappClient');
  try {
    const chats = await client.getChats();
    const statusChats = chats.filter(c => c.isStatus);
    const result = [];

    for (const status of statusChats) {
      const messages = await status.fetchMessages({ limit: 10 });
      for (const msg of messages) {
        if (msg.hasMedia) {
          const media = await msg.downloadMedia();
          result.push({
            id: msg.id.id,
            type: media.mimetype,
            data: `data:${media.mimetype};base64,${media.data}`
          });
        }
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post your own status (text or media)
router.post('/post', async (req, res) => {
  const client = req.app.get('whatsappClient');
  const { text, mimetype, filename, data } = req.body;
  try {
    if (text) {
      await client.sendMessage('status@broadcast', text);
      res.json({ status: 'posted', type: 'text' });
    } else if (mimetype && filename && data) {
      const { MessageMedia } = require('whatsapp-web.js');
      const media = new MessageMedia(mimetype, data, filename);
      await client.sendMessage('status@broadcast', media);
      res.json({ status: 'posted', type: 'media' });
    } else {
      res.status(400).json({ error: 'Provide either text or media info' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
