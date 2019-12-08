CREATE TABLE Air (
	DPID uuid PRIMARY KEY,
	lat DECIMAL(10,8),
	lng DECIMAL(10,8),
	time DATE NOT NULL,
	countryID char(3) REFERENCES Country(countryID) NOT NULL,
	quality FLOAT NOT NULL
);

CREATE TABLE Temperature (
	DPID uuid PRIMARY KEY,
	time DATE NOT NULL,
	countryID char(3) REFERENCES Country(countryID) NOT NULL,
	temperature FLOAT NOT NULL
);

CREATE TABLE Rain (
	DPID uuid PRIMARY KEY,
	time DATE NOT NULL,
	countryID char(3) REFERENCES Country(countryID) NOT NULL,
	rainfall FLOAT NOT NULL
);

CREATE TABLE Country (
	name VARCHAR(32) NOT NULL,
	countryID char(3) PRIMARY KEY
);

CREATE TABLE Favorites (
	countryID char(3) REFERENCES Country(countryID) NOT NULL,
	username VARCHAR(32) REFERENCES Users(username) NOT NULL,
	FOREIGN KEY (countryID, username)
);

CREATE TABLE Users (
	username VARCHAR(32) PRIMARY KEY,
	password VARCHAR(32) NOT NULL,
	email VARCHAR(64) NOT NULL UNIQUE,
	first_name VARCHAR(32) NOT  NULL,
	last_name VARCHAR(32) NOT NULL
);

CREATE TABLE Campaign (
	CID uuid PRIMARY KEY,
	name VARCHAR(32) NOT NULL,
	description VARCHAR(64) NOT NULL,
	paylink VARCHAR(64) NOT NULL,
	creator VARCHAR(32) REFERENCES User(username) NOT NULL
);

CREATE TABLE Likes (
	username VARCHAR(32) FOREIGN KEY REFERENCES Users(username) NOT NULL,
	CID uuid REFERENCES Campaign(CID) NOT NULL
);
