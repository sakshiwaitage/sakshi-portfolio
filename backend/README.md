# Portfolio Backend - Resume Server

A simple Express.js backend server that serves your resume PDF file for your portfolio website.

## Features

- Serve resume PDF file for download
- CORS enabled for frontend communication
- RESTful API endpoints
- Error handling

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file (optional, already has defaults):
   ```bash
   cp .env.example .env
   ```

### Adding Your Resume

1. Place your `resume.pdf` file in the `backend/public/resume/` folder
2. Make sure the file is named exactly `resume.pdf`

### Running the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Health Check

```
GET /api/health
```

Returns the status of the backend.

### Download Resume

```
GET /api/resume
```

Downloads your resume PDF file as an attachment.

### View Resume

```
GET /api/resume/view
```

Opens the resume PDF in the browser.

## Frontend Integration

Update your frontend to call these endpoints:

```javascript
// Download resume
const handleResumeDownload = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/resume");
    if (!response.ok) throw new Error("Resume not found");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sakshi_Waitage_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading resume:", error);
  }
};

// View resume in new tab
const handleResumeView = () => {
  window.open("http://localhost:5000/api/resume/view", "_blank");
};
```

## Troubleshooting

- **"Resume not found" error**: Make sure `resume.pdf` exists in `backend/public/resume/` folder
- **CORS errors**: Check that the frontend URL is included in the CORS whitelist in `server.js`
- **Port already in use**: Change the PORT in `.env` to a different port number

## Deployment

When deploying to production, update:

1. The CORS origin to your production domain
2. The PORT environment variable
3. Ensure the resume file exists on the server
