# code-editor

Code Editor

A lightweight, browser-based code editor for HTML, CSS, and JavaScript, built with React and TypeScript.

The project is designed to provide a simple coding environment directly in the browser, with local file access, CodeMirror-based editing, and a live preview.

Live Demo: https://code-editor-ochre-eight.vercel.app

---

Features

- ✨ Edit HTML, CSS, and JavaScript
- 📝 Powered by CodeMirror
- 📁 Open and work with local project files
- 💾 Save changes back to local files
- ▶️ Run and preview the project directly in the browser
- 🔄 Live preview using an isolated "iframe"
- 📱 Responsive interface for desktop and mobile screens
- 🌐 Works without a backend
- ⚡ Lightweight frontend architecture
- 🔷 Written entirely in TypeScript
- 🚀 Deployed with Vercel

---

Supported Languages

Language| Support
HTML| ✅
CSS| ✅
JavaScript| ✅

The editor currently focuses specifically on frontend web development.

---

Tech Stack

Frontend

- "React" (https://react.dev/)
- "TypeScript" (https://www.typescriptlang.org/)
- "CodeMirror" (https://codemirror.net/)

Browser APIs

- File System Access API
- iframe
- Standard browser APIs for file and preview handling

Build & Deployment

- Vite
- Vercel

---

How It Works

The editor works entirely in the browser.

A local web project can be opened through the browser's file system capabilities. The application reads the project files and represents them inside the editor.

The files can then be edited through CodeMirror.

When the project is executed, the editor builds the required preview content from the HTML, CSS, and JavaScript files and displays the result inside an "iframe".

Basic workflow

Local Project
     │
     ▼
File System Access API
     │
     ▼
Project Files
     │
     ├── HTML
     ├── CSS
     └── JavaScript
     │
     ▼
CodeMirror Editor
     │
     ▼
Build Preview
     │
     ▼
iframe
     │
     ▼
Running Web Page

---

Browser Compatibility

The project uses the File System Access API, which means browser support is currently limited.

Recommended

- Google Chrome
- Chromium-based browsers

Limitations

Firefox does not currently provide the File System Access API functionality required by this project.

Therefore, some file-management features will not work correctly in unsupported browsers.

For the latest browser compatibility information, see:

- "MDN — File System API" (https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
- "Chrome Developers — File System Access API" (https://developer.chrome.com/docs/capabilities/web-apis/file-system-access)

---

Getting Started

Requirements

Make sure you have:

- Node.js
- npm

installed on your system.

Clone the repository

git clone https://github.com/fouad8080/code-editor.git

Then enter the project directory:

cd code-editor

Install dependencies

npm install

Start the development server

npm run dev

Vite will provide a local development URL, usually:

http://localhost:5173

Open it using a supported Chromium-based browser.

---

Build for Production

Create a production build:

npm run build

To preview the production build locally:

npm run preview

---

Project Structure

A simplified project structure:

code-editor/
├── public/
├── src/
│   ├── components/
│   ├── ...
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

The exact structure may change as the project develops.

---

Current Scope

The current version intentionally focuses on the core functionality of a lightweight frontend code editor.

Currently supported

- HTML editing
- CSS editing
- JavaScript editing
- Local file access
- File saving
- CodeMirror integration
- Project preview
- Responsive interface

Currently not supported

- Backend/server-side languages
- Python
- Node.js runtime
- Package management
- npm integration
- Git integration
- Extensions/plugins
- Full IDE functionality
- Firefox File System Access support

---

Security Considerations

The project executes user-written HTML, CSS, and JavaScript inside a browser preview.

Because JavaScript execution is involved, the preview environment should be treated carefully when working with untrusted code.

The project is intended primarily for editing and running the user's own frontend projects.

---

Roadmap

Possible future improvements include:

- [ ] Better error reporting
- [ ] JavaScript console output
- [ ] Improved file and folder management
- [ ] Search and replace
- [ ] Keyboard shortcuts
- [ ] Editor settings
- [ ] Themes
- [ ] Multiple editor tabs
- [ ] Better mobile editing experience
- [ ] Improved browser compatibility
- [ ] AI-assisted code completion
- [ ] Offline/PWA improvements

The roadmap is subject to change as the project evolves.

---

Why This Project?

This project was built as a practical exploration of modern web development technologies.

It combines:

- React application architecture
- TypeScript
- Code editor integration
- Browser APIs
- Local file management
- Dynamic code execution
- Responsive UI development

Rather than implementing a traditional text editor, the goal is to create a lightweight coding environment that runs directly in the browser.

---

License

This project is currently available for personal and educational use.

See the repository for the applicable license information.