-- Write queries that result in this data model: https://dbdiagram.io/d/5f0460690425da461f045a29
DROP DATABASE IF EXISTS meal_sharing_db;
CREATE DATABASE meal_sharing_db DEFAULT CHARACTER SET utf8mb4 COLLATE = utf8mb4_unicode_ci;

USE meal_sharing_db;

DROP TABLE IF EXISTS `meal`;
CREATE TABLE meal (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
title VARCHAR(255) NOT NULL UNIQUE,
description TEXT NOT NULL,
location VARCHAR(255) NOT NULL,
when_date DATETIME NOT NULL,
max_reservation INT UNSIGNED NOT NULL,
price DECIMAL(5,2) NOT NULL,
created_date DATETIME NOT NULL DEFAULT NOW(),
PRIMARY KEY (id)
);

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE reservation (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
number_of_guests INT UNSIGNED NOT NULL,
meal_id INT UNSIGNED NOT NULL,
created_date DATETIME NOT NULL DEFAULT NOW(),
contact_phonenumber VARCHAR(255) NOT NULL UNIQUE,
contact_name VARCHAR(255) NOT NULL,
contact_email VARCHAR(255) NOT NULL UNIQUE,
PRIMARY KEY (id),
FOREIGN KEY (meal_id) REFERENCES meal (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `review`;
CREATE TABLE review (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
meal_id INT UNSIGNED NOT NULL,
stars INT UNSIGNED NOT NULL,
created_date DATETIME NOT NULL DEFAULT NOW(),
PRIMARY KEY (id),
FOREIGN KEY (meal_id) REFERENCES meal (id) ON DELETE CASCADE
);