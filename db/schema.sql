DROP DATABASE IF EXISTS boredjar_db;
CREATE DATABASE boredjar_db;
USE boredjar_db;

CREATE TABLE activities (
id INTEGER AUTO_INCREMENT,
activity VARCHAR (50) NOT NULL,
duration INTEGER (2) NOT NULL,
PRIMARY KEY(id)
);