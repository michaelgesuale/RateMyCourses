INSERT INTO university(name) VALUES ('UTM');

INSERT INTO campus(name, domain, university) VALUES ('University of Toronto Mississauga', 'mail.utoronto.ca', 1);

INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC490', 1, 'CSC490 description',1, 'CS');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('MAT202', 1, 'MAT202 description',1, 'MATH');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('MAT232', 1, 'MAT232 description',1, 'MATH');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC207', 1, 'CSC207 description',1, 'CS');

INSERT INTO users(email, username, password) VALUES ('test@mail.utoronto.ca', 'test', '123456');
INSERT INTO users(email, username, password) VALUES ('test1@mail.utoronto.ca', 'test1', '123456');
INSERT INTO users(email, username, password) VALUES ('test2@mail.utoronto.ca', 'test2', '123456');

INSERT INTO users(email, username, password) VALUES ('newUser@mail.utoronto.ca', 'newUser', 'newUser');
INSERT INTO users(email, username, password) VALUES ('newUser@mail.utoronto.com', 'newUserC', 'newUser');

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'test', 'CSC490 REVIEW', 4, 4, 4, 4, 4);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (2, 'test', 'MAT202 REVIEW', 1, 1, 1, 1, 1);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (3, 'test', 'MAT232 REVIEW', 3, 3, 3, 3, 3);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (4, 'test', 'CSC207 REVIEW', 5, 5, 5, 5, 5);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'test1', 'CSC490 REVIEW 2', 5, 5, 5, 5, 5);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'test2', 'CSC490 REVIEW 3', 3, 3, 3, 3, 3);

INSERT INTO prereq(course_id, require) VALUES (1, 2);
INSERT INTO prereq(course_id, require) VALUES (1, 4);
