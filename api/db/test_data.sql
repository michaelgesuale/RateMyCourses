INSERT INTO university(name) VALUES ('University of Toronto');
INSERT INTO university(name) VALUES ('University of Waterloo');

INSERT INTO campus(name, domain, university) VALUES ('University of Toronto Mississauga', 'mail.utoronto.ca', 1);
INSERT INTO campus(name, domain, university) VALUES ('University of Waterloo', 'mail.waterloo.ca', 2);

INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC490', 1, 'This course gives students experience solving a substantial problem that may span several areas of Computer Science. Students will define the scope of the problem, develop a solution plan, produce a working implementation, and present their work using written, oral and (if suitable) video reports. Class time will focus on the project, but may include some lectures. The class will be small and highly interactive. Topics, themes and required preparation will vary by instructor.', 4, 'Computer Science');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CHM110', 1, 'Matter and its transformations are studied at the macroscopic level. Topics include stoichiometry, phases of matter, equilibria, thermodynamics and electrochemistry.', 1, 'Chemistry');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('SOC100', 1, 'An introduction to the conceptual and empirical foundations of the discipline intended on providing a foundation for subsequent Sociology and Criminology, Law and Society courses and programs. Students will learn the sociological approach of theory and inquiry to a range of topics.', 1, 'Sociology');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC207', 1, 'An introduction to software design and development concepts, methods, and tools using a statically-typed object-oriented programming language such as Java. Topics from: version control, build management, unit testing, refactoring, object-oriented design and development, design patterns, advanced IDE usage, regular expressions, and reflection. Representation of floating-point numbers and introduction to numerical computation.', 2, 'Computer Science');
INSERT INTO courses(name, campus, description, year, subject, overall_usefulness) VALUES ('CSC148', 1, 'Abstract data types and data structures for implementing them. Linked data structures. Encapsulation and information-hiding. Object-oriented programming. Specifications. Analyzing the efficiency of programs. Recursion. This course assumes programming experience in a language such as Python, C++, or Java, as provided by CSC108H5. Students who already have this background may consult the Computer Science faculty advisor for advice about skipping CSC108H5.', 1, 'Computer Science', 1);
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC108', 1, 'Structure of computers; the computing environment. Programming in a language such as Python. Program structure: elementary data types, statements, control flow, functions, classes, objects, methods, fields. List: searching, sorting and complexity.', 1, 'Computer Science');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CSC290', 1, 'Targeted instruction and significant practice in the communications required for careers in computer science. The curriculum covers written, oral and interpersonal communication. Students will hand in short pieces of writing each week, will make oral presentations several times in the semester, and will work together in simulated project meetings and other realistic scenarios of pair and small group interaction. This can be used to satisfy the writing requirement in CSC programs. ', 2, 'Computer Science');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('FAH101', 1, 'An overview of western art from the ancient world through the 20th century, as well as an introduction to the discipline of art history and its methodologies. Emphasis on representative monuments and key approaches to interpretation.', 1, 'Art History');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('FAH279', 1, 'An introduction to art and society in Europe, ca. 1600 to ca. 1800 CE. Tensions between the Catholic Church and Protestantism; the rise of powerful, competing courts; the growth of increasingly complex urban centres; and the entry of the "wider public" into the art market all create new roles for representation in Europe. Developments in painting, prints, sculpture, architecture, urban planning, and festivals are considered.', 2, 'Art History');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('BIO152', 1, 'The scientific method and the modern theory of evolution as an introduction to biology. The principles of evolution, transmission and evolutionary genetics are developed in lectures and laboratories.', 1, 'Biology');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('BIO203', 1, 'Introduction to the morphology and physiology of plants. Students will learn that plants require energy to support metabolism and growth, and that these processes are highly regulated in order to achieve homeostasis. Topics covered include: biology of the plant cell, plant morphology, plant respiration and photosynthesis, transport processes, regulation of growth and development, and plant ecophysiology. Principles and mechanisms of plant form and function are developed in lectures and laboratories. ', 2, 'Biology');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('BIO312', 1, 'This course focuses on the principal physiological processes in plants and the regulation of these processes in response to environmental factors with an emphasis on the relationship between structure and function from the molecular to the whole-plant level. The course will provide the basis to understand how plants sense and respond to changing environmental conditions. This will enable students to understand why rising atmospheric carbon dioxide and global climate warming impact photosynthesis, plant metabolism and ultimately whole plant and ecosystem performance. Concepts discussed during lectures will be demonstrated in a series of practical labs. ', 3, 'Biology');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('BIO412', 1, 'Climate change is affecting life on earth at all levels from cells to ecosystems. As a result, shifts in the distribution of species, the timing of biological events, and large impacts on natural resources, agriculture, and forestry may be seen. This course explores past climate, predictions of future climate, impacts of climate change on biological systems, and potentials for adaptation. Mitigation of climate change impacts on biological systems will also be discussed.', 4, 'Biology');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('SOC202', 1, 'This course introduces students to the field of cultural sociology, which seeks to understand how ideas, meanings, values and beliefs are created, and how they are also implicated in foundational sociological issues such as inequality, identity, social change, and social organization. These linkages are examined through topics such as popular culture, the mass media, science, religion, art, language, knowledge, public opinion, food, advertising and consumerism.', 2, 'Sociology');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('MAT334', 1, 'Theory of functions of one complex variable: analytic and meromorphic functions; Cauchy theorem, residue calculus. Topics from: conformal mappings, analytic continuation, harmonic functions.', 3, 'Math');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('MAT202', 1, 'Mathematics derives its great power from its ability to formulate abstract concepts and techniques. In this course, students will be introduced to abstraction and its power through a study of topics from discrete mathematics. The topics covered will include: Sets, relations and functions; Basic counting techniques: subsets, permutations, finite sequences, inclusion-exclusion; Discrete probability: random variables paradoxes and surprises; Basic number theory: properties of the integers and the primes. The course will emphasize active participation of the students in discussion and written assignments. ', 2, 'Math');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('MAT232', 1, 'Differential and integral calculus of several variables: partial differentiation, chain rule, extremal problems, Lagrange multipliers, classification of critical points. Multiple integrals, Green theorem and related topics.', 2, 'Math');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('MAT136', 1, 'Antiderivatives and indefinite integrals in one variable, definite integrals and the fundamental theorem of calculus. Integration techniques and applications of integration. Infinite sequences, series and convergence tests. Power series, Taylor and Maclaurin series. A wide range of applications from the sciences will be discussed.', 1, 'Math');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('MAT102', 1, 'Understanding, using and developing precise expressions of mathematical ideas, including definitions and theorems. Set theory, logical statements and proofs, induction, topics chosen from combinatorics, elementary number theory, Euclidean geometry.', 1, 'Math');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('CHM201', 1, 'This course is intended for humanities and social science students who wish to gain knowledge of the science behind our well-being that may help them to make personal, social and political decisions in their future. Chemistry will be taught on a need-to-know basis in order to consider some contemporary applications. The course will focus on three themes in the realm of human health: nutrition for the prevention of disease, diagnostic tests for the detection of disease and drug discovery for the treatment of disease.', 2, 'Chemistry');

INSERT INTO courses(name, campus, description, year, subject) VALUES ('CS135 ', 2, 'An introduction to the fundamentals of computer science through the application of elementary programming patterns in the functional style of programming. Syntax and semantics of a functional programming language. Tracing via substitution. Design, testing, and documentation. Linear and nonlinear data structures. Recursive data definitions. Abstraction and encapsulation. Generative and structural recursion. Historical context.', 1, 'Computer Science');
INSERT INTO courses(name, campus, description, year, subject) VALUES ('CS341 ', 2, 'The study of efficient algorithms and effective algorithm design techniques. Program design with emphasis on pragmatic and mathematical aspects of program efficiency. Topics include divide and conquer algorithms, recurrences, greedy algorithms, dynamic programming, graph search and backtrack, problems without algorithms, NP-completeness and its implications.', 3, 'Computer Science');

INSERT INTO users(email, username, password) VALUES ('test@mail.utoronto.ca', 'Sam', '123456');
INSERT INTO users(email, username, password) VALUES ('test1@mail.utoronto.ca', 'Clover', '123456');
INSERT INTO users(email, username, password) VALUES ('test2@mail.utoronto.ca', 'Alex', '123456');
INSERT INTO users(email, username, password) VALUES ('test3@mail.utoronto.ca', 'Mandy', '123456');
INSERT INTO users(email, username, password) VALUES ('test4@mail.utoronto.ca', 'Jerry', '123456');

INSERT INTO users(email, username, password) VALUES ('sally@mail.utoronto.ca', 'Sally', 'sally');

INSERT INTO users(email, username, password) VALUES ('newUser@mail.utoronto.ca', 'newUser', 'newUser');
INSERT INTO users(email, username, password) VALUES ('newUser@mail.utoronto.com', 'newUserC', 'newUser');

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'Sam', 'Amazing course with lots of oppourtunities to show your skills. Take this course!', 4, 5, 3, 4, 5);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (2, 'Sam', 'Lots of homework, lots of work and quizzes. this course completely destroyed my summer, my sanity and my GPA', 1, 1, 1, 1, 1);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (3, 'Sam', 'Fair course, the professor was really nice but the assignments were kind of hard if you dont go to lecture', 4, 3, 3, 2, 3);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (4, 'Sam', 'Great course, I learnt a lot and this is very applicable to real life', 4, 4, 3, 5, 4);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall, likes) VALUES (5, 'Clover', 'I love this course, it was more fun than any other csc courses i took so far', 5, 5, 5, 5, 5, 1);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'Clover', 'The most straightforward class ive ever taken. ', 5, 5, 5, 5, 5);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (7, 'Mandy', 'There are no reading quizzes. Make sure to study the study guide to do well.', 3, 2, 3, 5, 3);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (8, 'Mandy', 'All you have to do is show up and pay attention- which is not difficult as the material is incredibly entertaining and insightful.', 3, 4, 3, 4, 5);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (1, 'Alex', 'Though material can be a bit dry at the beginning, I still enjoyed it and found it to be a helpful course', 3, 2, 3, 5, 3);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (10, 'Alex', 'You have to go to lectures and copy everything down if you want to pass. ', 3, 2, 3, 4, 3);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (12, 'Alex', 'Just an average course. ', 3, 2, 3, 4, 3);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (18, 'Alex', 'I hate this course', 1, 1, 2, 2, 1);

INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (18, 'Jerry', 'Great, very useful for future courses', 5, 3, 3, 4, 5);
INSERT INTO reviews(course_id, username, user_comment, workload, enjoyment, difficulty, usefulness, overall) VALUES (19, 'Jerry', 'wtf is this course', 1, 1, 1, 1, 1);

INSERT INTO reviewLikes(user_email, review_by, course_id) VALUES ('test@mail.utoronto.ca', 'Sam', 5);

INSERT INTO prereq(course_id, require) VALUES (4, 5);
INSERT INTO prereq(course_id, require) VALUES (5, 6);
INSERT INTO prereq(course_id, require) VALUES (7, 5);
INSERT INTO prereq(course_id, require) VALUES (1, 7);
INSERT INTO prereq(course_id, require) VALUES (9, 8);
INSERT INTO prereq(course_id, require) VALUES (11, 10);
INSERT INTO prereq(course_id, require) VALUES (12, 11);
INSERT INTO prereq(course_id, require) VALUES (13, 12);
INSERT INTO prereq(course_id, require) VALUES (14, 3);
INSERT INTO prereq(course_id, require) VALUES (15, 17);
INSERT INTO prereq(course_id, require) VALUES (15, 19);
INSERT INTO prereq(course_id, require) VALUES (16, 19);
INSERT INTO prereq(course_id, require) VALUES (17, 18);