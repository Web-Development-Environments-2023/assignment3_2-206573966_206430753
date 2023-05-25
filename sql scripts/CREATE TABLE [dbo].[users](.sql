
CREATE DATABASE dbo
    DEFAULT CHARACTER SET = 'utf8mb4';

CREATE TABLE Users(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    username VARCHAR(30) NOT NULL UNIQUE,
	password VARCHAR(300) NOT NULL,
	firstName VARCHAR(300) NOT NULL,
	lastName VARCHAR(300) NOT NULL,
	country VARCHAR(300) NOT NULL,
	email VARCHAR(300) NOT NULL
) COMMENT '';

CREATE TABLE LastViewd(
	user_id INT NOT NULL UNIQUE PRIMARY KEY,
	recipe1 INT NULL,
	recipe2 INT NULL,
	recipe3 INT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE MyRecipes(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
	user_id INT NOT NULL,
	recipe_name VARCHAR(300) NOT NULL,
	recipe_time VARCHAR(300) NOT NULL,
	popularity INT NOT NULL,
	vegan INT NOT NULL,
	gloten INT NOT NULL,
	courses_num INT NOT NULL,
	instructions TEXT NOT NULL,
	ingredients TEXT NOT NULL,
	vegetarian INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE MyFavorites(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
	user_id INT NOT NULL,
	recipe_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
