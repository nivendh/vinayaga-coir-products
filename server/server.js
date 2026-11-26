// Vinayaga Coir Products Main Express API Server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import enquiryRoutes from './routes/enquiry.js';

// Load environment variables
const envResult = dotenv.config();
if (envResult && envResult.parsed) {
  Object.keys(envResult.parsed).forEach((key) => {
    process.env[key] = envResult.parsed[key];
  });
}

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',   // Vite dev server
    'http://localhost:4173',   // Vite preview
    'http://localhost:3000',
    'https://vinayagacoirproducts.vercel.app',
    'https://vinayagacoirproducts.com',
    'https://www.vinayagacoirproducts.com',
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ─────────────────────────────────────────────────
app.use('/api/enquiry', enquiryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vinayaga Coir Products API is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ── Server Start ───────────────────────────────────────────
function startServer() {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📋 Enquiry API:  POST http://localhost:${PORT}/api/enquiry`);
    console.log(`💚 Health check: GET  http://localhost:${PORT}/api/health\n`);
  });
}

startServer();
