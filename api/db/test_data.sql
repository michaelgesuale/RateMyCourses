INSERT INTO university(name) VALUES ('University of Toronto');

INSERT INTO campus(name, domain, university) VALUES ('University of Toronto Mississauga', 'mail.utoronto.ca', 1);

INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC490', 1, 'This course gives students experience solving a substantial problem that may span several areas of Computer Science. Students will define the scope of the problem, develop a solution plan, produce a working implementation, and present their work using written, oral and (if suitable) video reports. Class time will focus on the project, but may include some lectures. The class will be small and highly interactive. Topics, themes and required preparation will vary by instructor.', 4, 'Computer Science');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CHM110', 1, 'Matter and its transformations are studied at the macroscopic level. Topics include stoichiometry, phases of matter, equilibria, thermodynamics and electrochemistry.', 1, 'Chemistry');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('SOC100', 1, 'An introduction to the conceptual and empirical foundations of the discipline intended on providing a foundation for subsequent Sociology and Criminology, Law and Society courses and programs. Students will learn the sociological approach of theory and inquiry to a range of topics.', 1, 'Sociology');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC207', 1, 'An introduction to software design and development concepts, methods, and tools using a statically-typed object-oriented programming language such as Java. Topics from: version control, build management, unit testing, refactoring, object-oriented design and development, design patterns, advanced IDE usage, regular expressions, and reflection. Representation of floating-point numbers and introduction to numerical computation.', 2, 'Computer Science');
INSERT INTO courses(name, campus, description, year, subject, overall_usefulness) VALUES ('CSC148', 1, 'Abstract data types and data structures for implementing them. Linked data structures. Encapsulation and information-hiding. Object-oriented programming. Specifications. Analyzing the efficiency of programs. Recursion. This course assumes programming experience in a language such as Python, C++, or Java, as provided by CSC108H5. Students who already have this background may consult the Computer Science faculty advisor for advice about skipping CSC108H5.', 1, 'Computer Science', 1);
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC108', 1, 'Structure of computers; the computing environment. Programming in a language such as Python. Program structure: elementary data types, statements, control flow, functions, classes, objects, methods, fields. List: searching, sorting and complexity.', 1, 'Computer Science');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC290', 1, 'Targeted instruction and significant practice in the communications required for careers in computer science. The curriculum covers written, oral and interpersonal communication. Students will hand in short pieces of writing each week, will make oral presentations several times in the semester, and will work together in simulated project meetings and other realistic scenarios of pair and small group interaction. This can be used to satisfy the writing requirement in CSC programs. ', 2, 'Computer Science');



INSERT INTO users(email, username, password) VALUES ('test@mail.utoronto.ca', 'Sam', '123456');
INSERT INTO users(email, username, password) VALUES ('test1@mail.utoronto.ca', 'Clover', '123456');
INSERT INTO users(email, username, password) VALUES ('test2@mail.utoronto.ca', 'Alex', '123456');

INSERT INTO users(email, username, password) VALUES ('newUser@mail.utoronto.ca', 'newUser', 'newUser');
INSERT INTO users(email, username, password) VALUES ('newUser@mail.utoronto.com', 'newUserC', 'newUser');

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'Sam', 'Amazing course with lots of oppourtunities to show your skills. Take this course!', 4, 5, 3, 4, 5);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (2, 'Sam', 'Lots of homework, lots of work and quizzes. this course completely destroyed my summer, my sanity and my GPA', 1, 1, 1, 1, 1);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (3, 'Sam', 'Fair course, the professor was really nice but the assignments were kind of hard if you dont go to lecture', 4, 3, 3, 2, 3);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (4, 'Sam', 'Great course, I learnt a lot and this is very applicable to real life', 4, 4, 3, 5, 4);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (5, 'Sam', 'Great course, I learnt a lot and this is very applicable to real life', 5, 5, 5, 5, 5);


INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'Clover', 'The most straightforward class ive ever taken. ', 5, 5, 5, 5, 5);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'Alex', 'Though material can be a bit dry at the beginning, I still enjoyed it and found it to be a helpful course', 3, 2, 3, 5, 3);

INSERT INTO reviewLikes(user_email, review_by, course_id) VALUES ('test@mail.utoronto.ca', 'Sam', 5);

INSERT INTO prereq(course_id, require) VALUES (4, 5);
INSERT INTO prereq(course_id, require) VALUES (5, 6);
INSERT INTO prereq(course_id, require) VALUES (7, 5);
INSERT INTO prereq(course_id, require) VALUES (1, 7);
