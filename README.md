# Chat App UI (Bootstrap 3)

A responsive, pixel-accurate chat application user interface built using **Bootstrap 3**, custom CSS, and interactive vanilla JavaScript/jQuery.

## Features

- **Header Bar**: Displays recipient profile info (avatar, active status dot, "Online" status) and action buttons (voice call, video call, search, and more options).
- **Chat Canvas**:
  - Subtle repeating vector doodle wallpaper background.
  - Centered date divider ("Today").
  - Left-aligned incoming messages with avatars, timestamps, and rounded bubbles.
  - Right-aligned outgoing messages in signature teal (`#00837b`) with double-check read receipts (`✓✓`).
  - Interactive file attachment card (`client_portal_update.zip`).
- **Mention Suggestions Popup**:
  - Autocomplete dropdown floating above the input with team members and roles (Rahul Sharma, Priya Nair, Vikram Reddy, Ananya Iyer, Suresh Kumar).
  - Interactive selection to insert mentions.
- **Footer Input Bar**:
  - Quick action buttons (Attachment clip, Photo gallery, `@` Mention toggle).
  - Clean text input with emoji trigger.
  - Teal send button with message sending support.

## Project Structure

```
chat-app/
├── assets/
│   ├── avatars/         # Team member profile pictures
│   └── images/          # SVG chat background doodle pattern
├── css/
│   └── style.css        # Custom styles and Bootstrap 3 overrides
├── js/
│   └── app.js           # Client-side interactive logic
├── index.html           # Main markup
└── README.md            # Project documentation
```

## How to Run

1. Open `index.html` directly in any modern browser, or
2. Serve locally with Python:
   ```bash
   python -m http.server 8085
   ```
   and open `http://localhost:8085/`.
