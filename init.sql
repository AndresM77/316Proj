CREATE TABLE Categories (
	CID uuid PRIMARY KEY NOT NULL,
	name VARCHAR(32) NOT NULL
);

CREATE TABLE Locations (
	LID uuid PRIMARY KEY NOT NULL,
	lat DECIMAL(10,8) NOT NULL,
	lng DECIMAL(10,8) NOT NULL,
	city TEXT,
	state TEXT,
	country TEXT
);

CREATE TABLE Nonprofits (
	OID uuid PRIMARY KEY NOT NULL,
	name VARCHAR(32) NOT NULL,
	description VARCHAR(64) NOT NULL,
	CID uuid REFERENCES Categories(CID) NOT NULL
);

CREATE TABLE Air (
	DPID uuid PRIMARY KEY,
	CID uuid  REFERENCES Categories(CID) NOT NULL,
	quality FLOAT NOT NULL,
	source uuid REFERENCES Nonprofits(OID) NOT NULL
);

CREATE TABLE Temperature (
	DPID uuid PRIMARY KEY,
	CID uuid REFERENCES Categories(CID) NOT NULL,
	temperature FLOAT NOT NULL,
	source uuid REFERENCES Nonprofits(OID) NOT NULL
);

CREATE TABLE Rain (
	DPID uuid PRIMARY KEY,
	CID uuid REFERENCES Categories(CID) NOT NULL,
	rainfall FLOAT NOT NULL,
	source uuid REFERENCES Nonprofits(OID) NOT NULL
);

CREATE TABLE Users (
	userID uuid PRIMARY KEY NOT NULL,
	username VARCHAR(32) NOT NULL UNIQUE,
	email VARCHAR(64) NOT NULL UNIQUE,
	first_name VARCHAR(32) NOT  NULL,
	last_name VARCHAR(32) NOT NULL
);

CREATE TABLE Favorites (
	userID uuid PRIMARY KEY REFERENCES Users(userID) NOT NULL,
	location uuid REFERENCES Locations(LID)
);

CREATE TABLE DataPoints (
	DPID uuid PRIMARY KEY NOT NULL,
	time DATE NOT NULL, 
	LID uuid NOT NULL REFERENCES Locations(LID)
);