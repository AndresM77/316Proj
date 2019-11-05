-- Test Production Database --

-- Test Queries for Database --

-- When Querying for Favorited locations by a certain User
SELECT * FROM Favorites WHERE username = 'test1';

-- When Querying for all Air Quality Datapoints
SELECT quality, lat, lng FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID LIMIT 10;

-- When Querying for all Rain DataPoints
SELECT rainfall, lat, lng FROM Rain, DataPoints, Locations WHERE Rain.DPID=DataPoints.DPID LIMIT 10;

-- When Querying for all Temperature DataPoints
SELECT temperature, lat, lng FROM Temperature, DataPoints, Locations WHERE Temperature.DPID=DataPoints.DPID LIMIT 10;

-- When Querying for time dependent Air Quality Datapoints
SELECT quality, lat, lng FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10' LIMIT 10;

-- When Querying for time dependent Rain DataPoints
SELECT rainfall, lat, lng FROM Rain, DataPoints, Locations WHERE Rain.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10' LIMIT 10;

-- When Querying for time dependent Temperature DataPoints
SELECT temperature, lat, lng FROM Temperature, DataPoints, Locations WHERE Temperature.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10' LIMIT 10;

-- When Quering Nonprofits
SELECT name, description FROM Nonprofits LIMIT 10;

-- When Querying for Nonprofits by Category
SELECT name, description FROM Nonprofits WHERE CID = '43c505fb-b51e-4ad4-a735-38e48e2dfb93';

-- When Querying Other Users
SELECT username FROM Users;
