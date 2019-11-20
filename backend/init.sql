CREATE TABLE Air (
	DPID uuid PRIMARY KEY,
	lat DECIMAL(10,8),
	lng DECIMAL(10,8),
	time DATE NOT NULL,
	country char(3),
	quality FLOAT NOT NULL
);

CREATE TABLE Temperature (
	DPID uuid PRIMARY KEY,
	time DATE NOT NULL,
	country char(3) NOT NULL,
	temperature FLOAT NOT NULL
);

CREATE TABLE Rain (
	DPID uuid PRIMARY KEY,
	time DATE NOT NULL,
	country char(3) NOT NULL,
	rainfall FLOAT NOT NULL
);

CREATE TABLE Users (
	username VARCHAR(32) PRIMARY KEY NOT NULL,
	email VARCHAR(64) NOT NULL UNIQUE,
	first_name VARCHAR(32) NOT  NULL,
	last_name VARCHAR(32) NOT NULL
);

CREATE TABLE Nonprofits (
	OID uuid PRIMARY KEY NOT NULL,
	name VARCHAR(32) NOT NULL,
	description VARCHAR(64) NOT NULL
	-- CID uuid REFERENCES Categories(CID) NOT NULL
);

CREATE TABLE Campaign (
	OID uuid PRIMARY KEY NOT NULL,
	name VARCHAR(32) NOT NULL,
	description VARCHAR(64) NOT NULL,
	goal DECIMAL(100) NOT NULL,
	paylink VARCHAR(64) NOT NULL
);

CREATE TABLE Pledges (
	username VARCHAR(32) PRIMARY KEY REFERENCES Users(username) NOT NULL,
	campaign OID REFERENCES Campaign(OID) NOT NULL
);

CREATE TABLE Posts (
	campaign OID PRIMARY KEY REFERENCES Campaign(OID) NOT NULL,
	name VARCHAR(32) NOT NULL,
	description VARCHAR(64) NOT NULL,
	time DATE NOT NULL
);

CREATE TABLE Likes (
	username VARCHAR(32) PRIMARY KEY REFERENCES Users(username) NOT NULL,
	campaign OID REFERENCES Campaign(OID) NOT NULL
);
