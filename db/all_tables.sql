DROP TABLE IF EXISTS university, campus, users, courses, likes, prereq, reviews;

CREATE TABLE IF NOT EXISTS university (
    uni_id SERIAL PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS campus (
    camp_id SERIAL PRIMARY KEY,
    name text NOT NULL,
    domain text NOT NULL,
    university SERIAL REFERENCES university(uni_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    email text PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    name text NOT NULL,
    campus SERIAL REFERENCES campus(camp_id) ON DELETE CASCADE,
    description text NOT NULL,
    year int NOT NULL,
    subject text NOT NULL
);

CREATE TABLE IF NOT EXISTS likes (
    user_email text REFERENCES users(email) ON DELETE CASCADE,
    course_id SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY(user_email, course_id)
);

CREATE TABLE IF NOT EXISTS prereq (
    course_id SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    prereq SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY(course_id, prereq)
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    course_id SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    user_id text REFERENCES users(username) ON DELETE CASCADE,
    user_comment text,
    workload int NOT NULL,
    enjoyment int NOT NULL,
    difficulty int NOT NULL,
    usefulness int NOT NULL,
    overall int NOT NULL,
    likes int NOT NULL DEFAULT 0,
    CONSTRAINT rating_check CHECK (0 <= workload AND workload <= 5 AND 0 <= enjoyment AND enjoyment <= 5 AND 0 <= difficulty AND difficulty <= 5 AND 0 <= usefulness AND usefulness <= 5 AND 0 <= overall AND overall <= 5)
);

