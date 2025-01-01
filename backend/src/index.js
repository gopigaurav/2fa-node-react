import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import db from "./config/db.js"
import authRoutes from './routes/authRoutes.js';
import './config/passportConfig.js'
// import twoFaRoutes from './routes/twoFaRoutes.js';

// Load environment variables
dotenv.config();
db()

const app = express();

const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json({limit: "100mb"}));
app.use(urlencoded({limit: "100mb", extended: true}))

const corsOptions = {
    origin: ["http://localhost:3001"],
    credentials: true
}

app.use(cors(corsOptions));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60
  }
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/2fa', twoFaRoutes);

// listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});