
CREATE DATABASE dbo
    DEFAULT CHARACTER SET = 'utf8mb4';

CREATE TABLE dbo.Users(  
    user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    username VARCHAR(30) NOT NULL UNIQUE,
	password VARCHAR(300) NOT NULL,
	firstName VARCHAR(300) NOT NULL,
	lastName VARCHAR(300) NOT NULL,
	country VARCHAR(300) NOT NULL,
	email VARCHAR(300) NOT NULL
) COMMENT '';

CREATE TABLE dbo.LastViewd(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
	user_id INT NOT NULL,
	recipe1 INT NULL,
	recipe2 INT NULL,
	recipe3 INT NULL,
	place INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);


DROP TABLE dbo.MyFamilyRecipes;

CREATE TABLE dbo.MyRecipes(
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
	img VARCHAR(300) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE dbo.MyFavorites(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
	user_id INT NOT NULL,
	recipe_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE dbo.UserRecipeViewed(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
	user_id INT NOT NULL,
	recipe_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE dbo.MyFamilyRecipes(
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
	img VARCHAR(300) NOT NULL,
	maker VARCHAR(300) NOT NULL,
	when_making VARCHAR(300) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO dbo.myfamilyrecipes (id, user_id, recipe_name, recipe_time, popularity, vegan, gloten, courses_num, instructions, ingredients, vegetarian, img, maker, when_making)
VALUES (1,1,"freanch toast", 15, 10, 1, 0, 1, "mix in a bowl the egg, milk, sugar, cinimon and vanilla; heat the butter in a pan; deep the bread in the mixter from both sides; cook the bread on the pan from both sides",
"1 egg, half a cup milk, 1 table spoon sugar, 1 teaspoon vanilla, half teaspoon cinimon, 2 slices bread, 50 grams butter",
0, "https://www.budgetbytes.com/wp-content/uploads/2023/01/French-Toast-V1-1152x1536.jpg", "my grandpa", "whenever he comes for a visit")