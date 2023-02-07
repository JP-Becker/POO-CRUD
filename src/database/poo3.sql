-- Active: 1675786902686@@127.0.0.1@3306
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

CREATE TABLE courses (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    lessons INTEGER NOT NULL
);

INSERT INTO courses (id, name, lessons)
VALUES
("c001", "Javascript", 5),
("c002", "React", 10),
("c003", "Typescript", 15);