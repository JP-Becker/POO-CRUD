-- Active: 1675287550902@@127.0.0.1@3306
CREATE TABLE songs (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    artist TEXT NOT NULL,
    name INTEGER NOT NULL,
    uploaded_at TEXT DEFAULT (DATETIME()) NOT NULL,
    total_views INTEGER NOT NULL
);

INSERT INTO songs (id, artist, name, total_views)
VALUES
    ("s001", "Eminem", "Stan", 212383999),
    ("s002", "Mac Miller", "Ladders", 10240000),
    ("s003", "Cbjr", "Como tudo deve ser", 1200000);