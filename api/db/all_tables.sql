DROP TABLE IF EXISTS university, campus, users, courses, likes, prereq, reviews;

DROP TRIGGER IF EXISTS update_course_rating_trigger ON reviews;

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
    subject text NOT NULL,
    overall_rating numeric NOT NULL DEFAULT 0,
    overall_workload numeric NOT NULL DEFAULT 0,
    overall_enjoyment numeric NOT NULL DEFAULT 0,
    overall_difficulty numeric NOT NULL DEFAULT 0,
    overall_usefulness numeric NOT NULL DEFAULT 0,
    CONSTRAINT rating_check CHECK (0 <= overall_rating AND overall_rating <= 5 AND 0 <= overall_workload AND overall_workload <= 5 AND 0 <= overall_enjoyment AND overall_enjoyment <= 5 AND 0 <= overall_difficulty AND overall_difficulty <= 5 AND 0 <= overall_usefulness AND overall_usefulness <= 5)
);

CREATE TABLE IF NOT EXISTS likes (
    user_email text REFERENCES users(email) ON DELETE CASCADE,
    course_id SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY(user_email, course_id)
);

CREATE TABLE IF NOT EXISTS prereq (
    course_id SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    require SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY(course_id, require)
);

CREATE TABLE IF NOT EXISTS reviews (
    course_id SERIAL REFERENCES courses(course_id) ON DELETE CASCADE,
    user_id text REFERENCES users(username) ON DELETE CASCADE,
    user_comment text,
    workload int NOT NULL,
    enjoyment int NOT NULL,
    difficulty int NOT NULL,
    usefulness int NOT NULL,
    overall numeric NOT NULL,
    likes int NOT NULL DEFAULT 0,
    PRIMARY KEY(course_id, user_id),
    CONSTRAINT rating_check CHECK (0 <= workload AND workload <= 5 AND 0 <= enjoyment AND enjoyment <= 5 AND 0 <= difficulty AND difficulty <= 5 AND 0 <= usefulness AND usefulness <= 5 AND 0 <= overall AND overall <= 5)
);

CREATE OR REPLACE FUNCTION update_course_rating()
  RETURNS trigger AS
$$
DECLARE
    reviews_count integer;

BEGIN
    SELECT COUNT(*) INTO reviews_count FROM reviews WHERE course_id = NEW.course_id;
	
    IF reviews_count > 0 THEN
	UPDATE courses SET 
		overall_rating = (overall_rating * reviews_count + NEW.overall) / (reviews_count + 1), 
		overall_workload = (overall_workload * reviews_count + NEW.workload) / (reviews_count + 1), 
		overall_enjoyment = (overall_enjoyment * reviews_count + NEW.enjoyment) / (reviews_count + 1), 
		overall_difficulty = (overall_difficulty * reviews_count + NEW.difficulty) / (reviews_count + 1), 
		overall_usefulness = (overall_usefulnes * reviews_count + NEW.usefulness) / (reviews_count + 1) 
	WHERE course_id = NEW.course_id;
    ELSE
	UPDATE courses SET 
		overall_rating = NEW.overall, 
		overall_workload = NEW.workload, 
		overall_enjoyment = NEW.enjoyment, 
		overall_difficulty = NEW.difficulty, 
		overall_usefulness = NEW.usefulness
	WHERE course_id = NEW.course_id;
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_course_rating_trigger 
BEFORE INSERT 
ON reviews 
FOR EACH ROW 
EXECUTE PROCEDURE update_course_rating();
