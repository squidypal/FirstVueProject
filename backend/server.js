const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'leaderboard_db',
  waitForConnections: true,
  connectionLimit: 10
})

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vue_app'
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, default: 'player' },
  createdAt: { type: Date, default: Date.now }
})

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema)
const Contact = mongoose.model('Contact', ContactSchema)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.get('/api/leaderboard', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM leaderboard ORDER BY score DESC'
    )
    res.json(rows)
  } catch (err) {
    console.error('GET /api/leaderboard error:', err)
    res.status(500).json({ error: 'Failed to fetch leaderboard data' })
  }
})

app.post('/api/leaderboard', async (req, res) => {
  const { player_name, score, email } = req.body

  if (!player_name || score === undefined || score === null) {
    return res.status(400).json({ error: 'player_name and score are required' })
  }

  if (typeof score !== 'number' || score < 0) {
    return res.status(400).json({ error: 'score must be a non-negative number' })
  }

  try {
    if (email) {
      const [rows] = await pool.query(
        'SELECT * FROM leaderboard WHERE email = ?',
        [email]
      )
      const existing = rows[0]
      if (existing) {
        if (score > existing.score) {
          await pool.query(
            'UPDATE leaderboard SET score = ?, player_name = ? WHERE id = ?',
            [score, player_name, existing.id]
          )
        }
        const [updated] = await pool.query(
          'SELECT * FROM leaderboard WHERE id = ?',
          [existing.id]
        )
        return res.json(updated[0])
      }
    }

    const [result] = await pool.query(
      'INSERT INTO leaderboard (player_name, score, email) VALUES (?, ?, ?)',
      [player_name, score, email || null]
    )
    const [newEntry] = await pool.query(
      'SELECT * FROM leaderboard WHERE id = ?',
      [result.insertId]
    )
    res.status(201).json(newEntry[0])
  } catch (err) {
    console.error('POST /api/leaderboard error:', err)
    res.status(500).json({ error: 'Failed to update leaderboard' })
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {
    const contact = new Contact({ name, email, message })
    await contact.save()
    res.status(201).json({ message: 'Contact inquiry saved successfully' })
  } catch (err) {
    console.error('POST /api/contact error:', err)
    res.status(500).json({ error: 'Failed to save contact inquiry' })
  }
})

app.get('/api/login', async (req, res) => {
  const { email, name } = req.query

  if (!email) {
    return res.status(400).json({ error: 'email is required' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {
    let user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      user = new User({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        role: 'player'
      })
      await user.save()
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    })
  } catch (err) {
    console.error('GET /api/login error:', err)
    res.status(500).json({ error: 'Failed to retrieve user' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
