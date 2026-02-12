# Setup Guide: Resume Backend

## Project Structure

Your portfolio now has two separate servers:

```
sakshi-portfolio/
├── frontend/        (React + Vite) - Port 5173
├── backend/         (Express.js) - Port 5000
├── package.json     (Frontend)
└── ...
```

## Step 1: Prepare Your Resume

1. Locate your resume PDF file
2. Place it in: `backend/public/resume/`
3. **Important:** Rename it to exactly `resume.pdf`

Example path: `backend/public/resume/resume.pdf`

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:

- **express**: Web server framework
- **cors**: Handle cross-origin requests
- **dotenv**: Environment variables

## Step 3: Run the Backend

In the `backend` folder, run:

```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

You should see:

```
✅ Backend server is running on http://localhost:5000
📄 Resume endpoint: http://localhost:5000/api/resume
👀 View resume: http://localhost:5000/api/resume/view
```

## Step 4: Run the Frontend (in another terminal)

In the root folder, run:

```bash
npm run dev
```

You should see:

```
➜  Local:   http://localhost:5173/
```

## Step 5: Test It Out

1. Open `http://localhost:5173/` in your browser
2. Click the "Resume" button on the hero section
3. Your resume should download!

## Files Created

### Backend Files:

```
backend/
├── server.js                 # Main Express server
├── package.json             # Backend dependencies
├── .env                     # Environment variables
├── .env.example             # Example env file
├── .gitignore              # Git ignore rules
├── README.md               # Backend documentation
└── public/resume/
    ├── resume.pdf          # YOUR RESUME HERE
    └── README.md           # Instructions
```

### Updated Frontend Files:

```
src/sections/
└── hero-section.tsx        # Updated with resume download functionality
```

## API Endpoints

| Method | Endpoint           | Purpose                     |
| ------ | ------------------ | --------------------------- |
| GET    | `/api/health`      | Check if backend is running |
| GET    | `/api/resume`      | Download resume PDF         |
| GET    | `/api/resume/view` | View resume in browser      |

## Troubleshooting

### "Resume not found" Error

- Check that `resume.pdf` exists in `backend/public/resume/`
- Ensure the filename is exactly `resume.pdf` (case-sensitive)

### CORS Error in Browser Console

- Make sure the backend server is running on `http://localhost:5000`
- Check that both servers are running in separate terminals

### Port Already in Use

- Change PORT in `backend/.env` to a different number (e.g., 5001)
- Update the URL in `hero-section.tsx` accordingly

### Backend Module Errors

- Delete `backend/node_modules` and `backend/package-lock.json`
- Run `npm install` again

## Running Both Servers Together

Option 1: Two Separate Terminals

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

Option 2: Use Concurrently (Optional)
Install concurrently:

```bash
npm install -D concurrently
```

Add to root `package.json` scripts:

```json
"dev:all": "concurrently \"npm run dev\" \"cd backend && npm run dev\""
```

Then run:

```bash
npm run dev:all
```

##Production Deployment

When deploying:

1. Update CORS in `backend/server.js`:

```javascript
origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
```

2. Update frontend API URL in `hero-section.tsx`:

```javascript
const response = await fetch("https://your-backend-domain.com/api/resume");
```

3. Set environment variables on your hosting platform

4. Ensure resume.pdf is present on the server

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Check the terminal output of both servers
3. Verify resume.pdf is in the correct location
4. Ensure both servers are running on the correct ports
