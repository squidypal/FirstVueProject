# FirstVueProject

Full-stack Vue 3 app — MySQL leaderboard, MongoDB user/contact storage, Pinia state management.

## Setup

**Requirements:** Node.js ≥ 20, MySQL, MongoDB

```sh
# 1. Database
mysql -u root -p < backend/schema.sql

# 2. Backend  (http://localhost:3000)
cd backend && cp .env.example .env   # fill in DB credentials
npm install && npm start

# 3. Frontend  (http://localhost:5173)
cd .. && npm install && npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/leaderboard` | All entries, sorted by score desc |
| `POST` | `/api/leaderboard` | Add/update score — body: `{ player_name, score, email? }` |
| `POST` | `/api/contact` | Save inquiry — body: `{ name, email, message }` |
| `GET` | `/api/login?email=&name=` | Find or auto-create user by email |

## Pinia Stores

- **`userStore`** — current user (`name`, `email`, `role`); actions: `login()`, `logout()`. Used by NavBar, HomeView, ContactForm.
- **`leaderboardStore`** — MySQL entries + computed `totalPlayers`, `averageScore`; actions: `fetchLeaderboard()`, `submitScore()`. Used by LeaderboardTable, LeaderboardStats.

## Known Limitations

- Session is not persisted — user info resets on page refresh
- Score deduplication requires an `email`; nameless duplicates create separate rows
- All users default to the `player` role; no admin UI
