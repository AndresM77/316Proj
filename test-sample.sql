INSERT INTO Users(userID, username, email, first_name, last_name)
	VALUES ('15c8c038-894c-46d1-b36f-10175eafa81c', 'test1', 'bar@foo.com', 'firstName', 'lastName');

INSERT INTO Locations(LID, lat, lng, city, state, country) 
	VALUES ('c20c3de9-d693-4838-a6f4-3974a8d87194', 6.001427, -78.938232, 'Durham', 'North Carolina', 'USA');

INSERT INTO Favorites(userID, location)
	VALUES ('15c8c038-894c-46d1-b36f-10175eafa81c', 'c20c3de9-d693-4838-a6f4-3974a8d87194');

INSERT INTO Categories(CID, Name)
	VALUES
	('433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 'Air'),
	('43c505fb-b51e-4ad4-a735-38e48e2dfb93', 'Temperature'),
	('3272671d-a7de-47d1-87fb-1a702a8ed108', 'Rain');

INSERT INTO Nonprofits(OID, name, description, CID)
	VALUES
	('89d79ac1-0cd5-4429-9d8c-2ac914eced86', 'EPA', 'foo bar', '433ab55d-63ec-418c-a6a8-fd90dc74d1b1'),
	('06006c23-508c-4d43-88f8-36a604a600f5', 'EPA2', 'foo bar', '43c505fb-b51e-4ad4-a735-38e48e2dfb93'),
	('6c63290d-8090-437f-8674-afd5cbe67717', 'EPA3', 'foo bar', '3272671d-a7de-47d1-87fb-1a702a8ed108');

INSERT INTO DataPoints(DPID, time, LID) 
	VALUES
	('20f161c9-f601-44da-90c1-286e8717d662', NOW(), 'c20c3de9-d693-4838-a6f4-3974a8d87194'),
	('a9accdd5-1a1f-4b45-9c44-59461746f38d', NOW(), 'c20c3de9-d693-4838-a6f4-3974a8d87194'),
	('780b7ce4-ac78-4fad-90bb-94935a3a8907', NOW(), 'c20c3de9-d693-4838-a6f4-3974a8d87194');

INSERT INTO Air(DPID, CID, quality, source)
	VALUES ('20f161c9-f601-44da-90c1-286e8717d662', '433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 10.1, '89d79ac1-0cd5-4429-9d8c-2ac914eced86');

INSERT INTO Temperature(DPID, CID, temperature, source)
	VALUES ('a9accdd5-1a1f-4b45-9c44-59461746f38d', '433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 88.9, '06006c23-508c-4d43-88f8-36a604a600f5');

INSERT INTO Rain(DPID, CID, rainfall, source)
	VALUES ('780b7ce4-ac78-4fad-90bb-94935a3a8907', '433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 55.5, '6c63290d-8090-437f-8674-afd5cbe67717');

SELECT * FROM Favorites where userID = '15c8c038-894c-46d1-b36f-10175eafa81c';

SELECT quality, lat, lng FROM Air, DataPoints, Locations where Air.DPID=DataPoints.DPID and Locations.LID='c20c3de9-d693-4838-a6f4-3974a8d87194';






