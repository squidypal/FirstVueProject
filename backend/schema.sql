-- Run this script to set up the MySQL database and table

CREATE DATABASE IF NOT EXISTS leaderboard_db;

USE leaderboard_db;

CREATE TABLE IF NOT EXISTS leaderboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(255) NOT NULL,
  score INT NOT NULL DEFAULT 0,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: seed some initial data
INSERT INTO leaderboard (player_name, score, email) VALUES
  ('Alice', 9800, 'alice@example.com'),
  ('Bob', 8500, 'bob@example.com'),
  ('Charlie', 7200, 'charlie@example.com'),
  ('Diana', 6600, 'diana@example.com'),
  ('Eve', 5900, 'eve@example.com');
