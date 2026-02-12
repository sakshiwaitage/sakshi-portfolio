# 🎯 Quick Start Checklist

## ⚡ 3-Minute Setup

### Phase 1: Add Your Resume (30 seconds)

- [ ] Find your resume PDF file
- [ ] Navigate to: `backend/public/resume/`
- [ ] Place your resume there
- [ ] Rename it to exactly: `resume.pdf`

### Phase 2: Install Backend Dependencies (2 minutes)

```bash
# Open terminal/command prompt
cd backend
npm install
```

Wait for installation to complete. You'll see: `added XX packages`

### Phase 3: Start Both Servers (30 seconds)

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Look for: `✅ Backend server is running on http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
npm run dev
```

Look for: `➜  Local:   http://localhost:5173/`

---

## ✨ Testing (1 minute)

- [ ] Open browser: `http://localhost:5173/`
- [ ] Scroll to hero section
- [ ] Click the **Resume** button
- [ ] File should download automatically
- [ ] Check Downloads folder for PDF

---

## 📋 Detailed Setup (if needed)

### Step 1: Prepare Resume

```
sakshi-portfolio/
└── backend/
    └── public/
        └── resume/
            └── resume.pdf  ← Place your file here
```

### Step 2: Install Dependencies

```bash
# Make sure you're in the backend folder
cd backend

# Install packages
npm install

# You should see: added 57 packages (example)
```

### Step 3: Run Backend Server

```bash
npm run dev
```

**Expected Output:**

```
✅ Backend server is running on http://localhost:5000
📄 Resume endpoint: http://localhost:5000/api/resume
👀 View resume: http://localhost:5000/api/resume/view
```

### Step 4: Run Frontend Server (New Terminal)

```bash
npm run dev
```

**Expected Output:**

```
➜  Local:   http://localhost:5173/
```

### Step 5: Test the Feature

1. Go to: `http://localhost:5173/`
2. Click the Resume button
3. PDF downloads!

---

## 🔍 Verification Steps

Run these to verify everything works:

### Check Backend is Running

```bash
# In any terminal, run:
curl http://localhost:5000/api/health
```

Expected: `{"status":"Backend is running!"}`

### Check Resume File

```bash
# Windows:
dir backend\public\resume\

# Mac/Linux:
ls backend/public/resume/
```

Expected: `resume.pdf` should be listed

### Check Frontend Loads

Open: `http://localhost:5173/` in browser
Expected: See portfolio homepage

---

## ❌ Troubleshooting (Common Issues)

### Issue: "Cannot find module" Error

**Solution:**

```bash
cd backend
rm -rf node_modules
npm install
```

### Issue: "Port 5000 already in use"

**Solution:**

1. Edit `backend/.env`
2. Change `PORT=5000` to `PORT=5001`
3. Update `src/utils/api.ts` line 3

### Issue: "Resume not found" Error

**Solution:**

- [ ] Check: `backend/public/resume/resume.pdf` exists
- [ ] Check: Filename is exactly `resume.pdf` (case-sensitive)
- [ ] Restart backend server

### Issue: CORS Error in Console

**Solution:**

- [ ] Make sure backend is running on `http://localhost:5000`
- [ ] Check both processes are in separate terminals
- [ ] Refresh the browser page

### Issue: Downloaded File is Not a PDF

**Solution:**

- [ ] Check the actual file in `backend/public/resume/`
- [ ] Make sure it's a valid PDF file
- [ ] Re-add the resume file

---

## 📁 File Locations Reference

**Resume Location:**

```
c:\Users\SAKSHI WAITAGE\OneDrive\Desktop\sakshi-portfolio\backend\public\resume\resume.pdf
```

**Backend Server:**

```
c:\Users\SAKSHI WAITAGE\OneDrive\Desktop\sakshi-portfolio\backend\server.js
```

**Frontend Component:**

```
c:\Users\SAKSHI WAITAGE\OneDrive\Desktop\sakshi-portfolio\src\sections\hero-section.tsx
```

**API Utilities:**

```
c:\Users\SAKSHI WAITAGE\OneDrive\Desktop\sakshi-portfolio\src\utils\api.ts
```

---

## 🚀 What You Get

✅ Functional resume download button
✅ Professional PDF serving system
✅ CORS-enabled backend
✅ Responsive UI feedback (downloading state)
✅ Error handling and user messages
✅ Ready for production deployment
✅ Clean, maintainable code structure

---

## 📞 Need Help?

Check these files for more information:

1. `RESUME_BACKEND_README.md` - Complete feature explanation
2. `SETUP_GUIDE.md` - Detailed setup instructions
3. `ARCHITECTURE.md` - System architecture overview
4. `backend/README.md` - Backend documentation
5. `src/utils/api.ts` - API utility functions

---

## ⏰ Time Estimates

| Task                 | Time         |
| -------------------- | ------------ |
| Add resume file      | 30 sec       |
| Install dependencies | 1-2 min      |
| Start servers        | 30 sec       |
| Test feature         | 1 min        |
| **Total**            | **~3-4 min** |

---

## ✅ Success Criteria

You'll know it's working when:

- [ ] Backend shows: "✅ Backend server is running"
- [ ] Frontend loads at: `http://localhost:5173/`
- [ ] Resume button shows "Resume" text
- [ ] Clicking it downloads `Sakshi_Waitage_Resume.pdf`
- [ ] No errors in browser console
- [ ] No errors in terminal

---

## 🎉 You're All Set!

Once you see the resume downloading, your backend is ready!

Next: Deploy to production when you want to go live.
