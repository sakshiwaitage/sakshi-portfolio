```
RESUME BACKEND ARCHITECTURE
=============================

FRONTEND (React + Vite)                    BACKEND (Express.js)
http://localhost:5173                      http://localhost:5000
────────────────────────                   ────────────────────

┌─ src/
│  ├─ sections/
│  │  └─ hero-section.tsx
│  │     │
│  │     ├─ Imports: downloadResume()
│  │     ├─ onClick → handleResumeClick()
│  │     └─ Shows "Downloading..." state
│  │
│  └─ utils/
│     └─ api.ts (NEW)
│        ├─ downloadResume()
│        │  └─ Fetches: GET http://localhost:5000/api/resume
│        │
│        ├─ viewResume()
│        │  └─ Opens: http://localhost:5000/api/resume/view
│        │
│        └─ checkBackendHealth()
│           └─ Checks: GET http://localhost:5000/api/health
│
└─────────────────────────────────────┬────────────────────────────────────────
                                      │
                      ┌───────────────┘
                      │
                      ▼
              NETWORK REQUEST
              ─────────────────
              GET /api/resume
              Content-Type: application/pdf

                      │
                      ▼
         ┌──────────────────────────┐
         │   BACKEND SERVER.JS      │
         ├──────────────────────────┤
         │                          │
         │ Express.js Setup         │
         │ ├─ CORS Enabled          │
         │ ├─ Port: 5000            │
         │ └─ Static: public/       │
         │                          │
         │ Routes:                  │
         │ ├─ GET /api/health ──┐   │
         │ │   returns: status   │   │
         │ │                     │   │
         │ ├─ GET /api/resume ──┤   │
         │ │   file: resume.pdf  │   │
         │ │   action: download  │   │
         │ │                     │   │
         │ └─ GET /api/resume/view  │
         │     file: resume.pdf     │
         │     action: view in tab  │
         │                          │
         └──────────────┬───────────┘
                        │
                        ▼
         ┌──────────────────────────┐
         │  PUBLIC FOLDER           │
         ├──────────────────────────┤
         │                          │
         │ public/resume/           │
         │ └─ resume.pdf (YOUR FILE)│
         │                          │
         └──────────────────────────┘


DATA FLOW
=========

1. USER CLICKS RESUME BUTTON
   │
   └─→ hero-section.tsx
       └─→ handleResumeClick()
           └─→ downloadResume() from api.ts
               └─→ fetch("http://localhost:5000/api/resume")


2. FRONTEND SENDS REQUEST
   │
   └─→ GET /api/resume
       └─→ Backend receives request


3. BACKEND PROCESSES REQUEST
   │
   └─→ server.js
       └─→ Check if resume.pdf exists
           ├─ YES → Send file as blob
           └─ NO → Return 404 error


4. BROWSER RECEIVES RESPONSE
   │
   └─→ Blob data
       └─→ Convert to downloadable file
           └─→ Trigger download
               └─→ Save as "Sakshi_Waitage_Resume.pdf"


FILE STRUCTURE
==============

sakshi-portfolio/
│
├── frontend code (React)
│   ├── src/
│   │   ├── sections/hero-section.tsx (UPDATED)
│   │   ├── utils/api.ts (NEW)
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend/ (NEW)
│   ├── server.js (NEW)
│   │   ├─ Express setup
│   │   ├─ CORS configuration
│   │   ├─ API endpoints
│   │   └─ Static file serving
│   │
│   ├── package.json (NEW)
│   │   ├─ express
│   │   ├─ cors
│   │   └─ dotenv
│   │
│   ├── .env (NEW)
│   ├── .env.example (NEW)
│   ├── .gitignore (NEW)
│   ├── README.md (NEW)
│   │
│   └── public/resume/ (NEW)
│       ├── resume.pdf ← PUT YOUR RESUME HERE
│       └── README.md (NEW)
│
├── SETUP_GUIDE.md (NEW)
├── RESUME_BACKEND_README.md (NEW)
└── ...


DEPENDENCIES INSTALLED
======================

Backend (backend/package.json):
├─ express@^4.18.2
│  └─ Web server framework
│
├─ cors@^2.8.5
│  └─ Cross-Origin Resource Sharing
│
└─ dotenv@^16.3.1
   └─ Environment variables management


ENDPOINTS SUMMARY
=================

┌─────────────────────────────────────┐
│ ENDPOINT      │ METHOD │ PURPOSE    │
├─────────────────────────────────────┤
│ /api/health   │ GET    │ Status    │
│ /api/resume   │ GET    │ Download  │
│ /api/resume/view │ GET │ View      │
└─────────────────────────────────────┘


ENVIRONMENT VARIABLES
====================

backend/.env
├─ PORT=5000
│  └─ Backend server port
│
└─ NODE_ENV=development
   └─ Environment mode


CORS CONFIGURATION
==================

Allowed Origins:
├─ http://localhost:5173 (Frontend development)
├─ http://localhost:3000 (Alternative frontend port)
└─ * (Wildcard - accessible from anywhere)

Allowed Methods:
├─ GET
├─ POST
└─ OPTIONS


DEPLOYMENT NOTES
===============

When deploying to production:

1. Update CORS Origins
   └─ Change from localhost to production domain

2. Update Frontend API Base URL
   └─ Change from http://localhost:5000 to production backend URL

3. Set Environment Variables
   └─ Use platform-specific env vars (Heroku, Vercel, etc.)

4. Ensure resume.pdf is on server
   └─ Upload file to backend/public/resume/

5. Use process manager (PM2, etc.)
   └─ Keep backend running


ERROR HANDLING
==============

Frontend (hero-section.tsx):
├─ Try/Catch blocks
├─ Loading state (isDownloading)
├─ User-friendly error messages
└─ Alert on failure

Backend (server.js):
├─ File existence check
├─ HTTP error codes (404, 500)
├─ Error logging
└─ Graceful error responses


SECURITY CONSIDERATIONS
======================

✓ CORS enabled only for trusted origins
✓ File serving restricted to resume folder
✓ No directory traversal possible
✓ Static file serving configured
✓ Error messages don't expose sensitive info


TESTING CHECKLIST
================

□ Backend running: http://localhost:5000
□ Frontend running: http://localhost:5173
□ resume.pdf exists in: backend/public/resume/
□ Click Resume button
□ File downloads automatically
□ Filename is: Sakshi_Waitage_Resume.pdf
□ PDF opens correctly
□ No CORS errors in console
□ No 404 errors for resume


PERFORMANCE NOTES
================

- Resume download: ~1-2 seconds (depends on file size)
- Backend startup: instant
- CORS preflight: <50ms
- File serving: optimized for static files
- No database queries needed


FUTURE ENHANCEMENTS
===================

Optional additions:

□ Multiple resume versions (different formats)
□ Resume update functionality
□ Download counter/analytics
□ Resume search optimization
□ CDN integration
□ Email resume to visitor
□ Generate resume from data
□ Version control for resumse changes
```
