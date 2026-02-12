import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', '*'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Resume download endpoint
app.get('/api/resume', (req, res) => {
  const resumePath = path.join(__dirname, 'public', 'resume', 'resume.pdf');
  
  // Check if file exists
  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ 
      error: 'Resume not found. Please add your resume.pdf to backend/public/resume/ folder.' 
    });
  }

  // Send the file for download
  res.download(resumePath, 'Sakshi_Waitage_Resume.pdf', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).json({ error: 'Error downloading resume' });
    }
  });
});

// Resume view endpoint (for opening in browser)
app.get('/api/resume/view', (req, res) => {
  const resumePath = path.join(__dirname, 'public', 'resume', 'resume.pdf');
  
  // Check if file exists
  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ 
      error: 'Resume not found. Please add your resume.pdf to backend/public/resume/ folder.' 
    });
  }

  // Send the file for viewing
  res.sendFile(resumePath);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
  console.log(`📄 Resume endpoint: http://localhost:${PORT}/api/resume`);
  console.log(`👀 View resume: http://localhost:${PORT}/api/resume/view`);
});
