-- Test Queries for Database --

-- When Querying for Favorited locations by a certain User
SELECT * FROM Favorites WHERE username = 'test1';

-- When Querying for all Air Quality Datapoints
SELECT quality, country, time FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID LIMIT 10;

-- When Querying for all Rain DataPoints
SELECT rainfall, country, time FROM Rain, DataPoints, Locations WHERE Rain.DPID=DataPoints.DPID LIMIT 10;

-- When Querying for all Temperature DataPoints
SELECT temperature, country, time FROM Temperature, DataPoints, Locations WHERE Temperature.DPID=DataPoints.DPID LIMIT 10;

-- When Querying for time dependent Air Quality Datapoints
SELECT quality, country FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10' LIMIT 10;

-- When Querying for time dependent Rain DataPoints
SELECT rainfall, country FROM Rain, DataPoints, Locations WHERE Rain.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10' LIMIT 10;

-- When Querying for time dependent Temperature DataPoints
SELECT temperature, country FROM Temperature, DataPoints, Locations WHERE Temperature.DPID=DataPoints.DPID AND DataPoints.time='2018-01-01' LIMIT 10;

-- When Querying Other Users
SELECT username FROM Users;
