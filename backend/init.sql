CREATE TABLE Categories (
	CID uuid PRIMARY KEY NOT NULL,
	name VARCHAR(32) NOT NULL
);

CREATE TABLE Locations (
	LID uuid PRIMARY KEY NOT NULL,
	lat DECIMAL(10,8),
	lng DECIMAL(10,8),
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
	username VARCHAR(32) PRIMARY KEY NOT NULL,
	email VARCHAR(64) NOT NULL UNIQUE,
	first_name VARCHAR(32) NOT  NULL,
	last_name VARCHAR(32) NOT NULL
);

CREATE TABLE Favorites (
	username VARCHAR(32) PRIMARY KEY REFERENCES Users(username) NOT NULL,
	location uuid REFERENCES Locations(LID)
);

CREATE TABLE DataPoints (
	DPID uuid PRIMARY KEY NOT NULL,
	time DATE NOT NULL, 
	LID uuid NOT NULL REFERENCES Locations(LID)
);