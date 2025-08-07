const express = require('express');
const router = express.Router();

// Create group
router.post('/create', async (req, res) => {
  const client = req.app.get('whatsappClient');
  const { name, participants } = req.body;
  try {
    const group = await client.createGroup(name, participants);
    res.json({ status: 'created', id: group.gid._serialized });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add member(s)
router.post('/add', async (req, res) => {
  const client = req.app.get('whatsappClient');
  const { chatId, participants } = req.body;
  try {
    await client.addParticipants(chatId, Array.isArray(participants) ? participants : [participants]);
    res.json({ status: 'added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove member(s)
router.post('/remove', async (req, res) => {
  const client = req.app.get('whatsappClient');
  const { chatId, participants } = req.body;
  try {
    await client.removeParticipants(chatId, Array.isArray(participants) ? participants : [participants]);
    res.json({ status: 'removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Group info
router.get('/info/:chatId', async (req, res) => {
  const client = req.app.get('whatsappClient');
  try {
    const chat = await client.getChatById(req.params.chatId);
    if (!chat.isGroup) return res.status(400).json({ error: 'Not a group' });
    res.json({ id: chat.id._serialized, name: chat.name, participants: chat.participants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
