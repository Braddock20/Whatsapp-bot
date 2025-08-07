const express = require('express');
const router = express.Router();

// List all contacts
router.get('/list', async (req, res) => {
  const client = req.app.get('whatsappClient');
  try {
    const contacts = await client.getContacts();
    res.json(contacts.map(c => ({
      id: c.id._serialized,
      name: c.name,
      number: c.number,
      pushname: c.pushname,
      isBusiness: c.isBusiness
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get contact profile picture
router.get('/photo/:contactId', async (req, res) => {
  const client = req.app.get('whatsappClient');
  try {
    const url = await client.getProfilePicUrl(req.params.contactId);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
