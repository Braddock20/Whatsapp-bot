# WhatsApp Bot API

A **production-ready WhatsApp automation REST API** built with [whatsapp-web.js](https://wwebjs.dev/) and Express.

## Features

- QR authentication (scan with WhatsApp mobile)
- Send/receive text and media
- Fetch/download WhatsApp statuses
- Group management
- Contact info endpoints
- RESTful JSON API
- Deployable to Render, Railway, Heroku, etc.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**  
   Copy `.env.example` to `.env` and modify as needed.

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Scan the QR code shown in logs with your WhatsApp mobile app.**

5. **API docs:** See endpoints in `src/api/` or test with Postman.

## Deploy

- Deploy to Render, Railway, or any Node.js host.
- The default port is set via `$PORT`.

---
