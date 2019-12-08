-- Populating Database --

INSERT INTO Users(username, email, first_name, last_name)
	VALUES
	('test1', 'bar@foo.com', 'firstName', 'lastName'),
	('test2', 'test@gmail.com', 'Bob's, 'Burgers');

INSERT INTO Locations(LID, lat, lng, city, state, country)
	VALUES ('c20c3de9-d693-4838-a6f4-3974a8d87194', 6.001427, -78.938232, 'Durham', 'North Carolina', 'USA');

INSERT INTO Favorites(username, location)
	VALUES ('test1', 'c20c3de9-d693-4838-a6f4-3974a8d87194');

INSERT INTO Categories(CID, Name)
	VALUES
	('433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 'Air'),
	('43c505fb-b51e-4ad4-a735-38e48e2dfb93', 'Temperature'),
	('3272671d-a7de-47d1-87fb-1a702a8ed108', 'Rain');

INSERT INTO DataPoints(DPID, time, LID)
	VALUES
	('20f161c9-f601-44da-90c1-286e8717d662', '2019-9-10', 'c20c3de9-d693-4838-a6f4-3974a8d87194'),
	('a9accdd5-1a1f-4b45-9c44-59461746f38d', '2019-10-10', 'c20c3de9-d693-4838-a6f4-3974a8d87194'),
	('780b7ce4-ac78-4fad-90bb-94935a3a8907', '2019-9-10', 'c20c3de9-d693-4838-a6f4-3974a8d87194');

INSERT INTO Air(DPID, CID, quality)
	VALUES ('20f161c9-f601-44da-90c1-286e8717d662', '433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 10.1);

INSERT INTO Temperature(DPID, CID, temperature)
	VALUES ('a9accdd5-1a1f-4b45-9c44-59461746f38d', '433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 88.9);

INSERT INTO Rain(DPID, CID, rainfall)
	VALUES ('780b7ce4-ac78-4fad-90bb-94935a3a8907', '433ab55d-63ec-418c-a6a8-fd90dc74d1b1', 55.5);

INSERT INTO Campaign(CID, name, description, goal, paylink, sponsor)
	VALUES ('cdcc7e99-0ef1-41ae-a1bc-3e3f618ddde9', 'Fundraiser', 'Save the trees', 1000, 'https://www.gofundme.com/', 'test1');

INSERT INTO Pledges(username, val, CID)
	VALUES ('test2', 50,'cdcc7e99-0ef1-41ae-a1bc-3e3f618ddde9');

INSERT INTO Posts(CID, poster, description, time)
	VALUES ('cdcc7e99-0ef1-41ae-a1bc-3e3f618ddde9', 'test2', 'Nice Campaign', '2019-9-10');

INSERT INTO Likes (username, CID)
	VALUES ('test2', 'cdcc7e99-0ef1-41ae-a1bc-3e3f618ddde9');

INSERT INTO Country (country, name)
	VALUES
	('USA', 'United States of America'),
	('AFG', 'Afghanistan'),
	('ALB', 'Albania'),
	('DZA', 'ALgeria'),
	('ASM', 'American Samoa'),
	('AND', 'Andorra'),
	('AGO', 'Angola'),
	('AIA', 'Anguilla'),
	('ATA', 'Antartica'),
	('ATG', 'Antigua and Barbuda'),
	('ARG', 'Argentina'),
	('ARM', 'Armenia'),
	('ABW', 'Aruba'),
	('AUS', 'Australia'),
	('AUT', 'Austria'),
	('AZE', 'Azerbaijan'),
	('BHS', 'Bahamas'),
	('BHR', 'Bahrain'),
	('BGD', 'Bangladesh'),
	('BRB', 'Barbados'),
	('BLR', 'Belarus'),
	('BEL', 'Belgium'),
	('BLZ', 'Belize'),
	('BEN', 'Benin'),
	('BMU', 'Bermuda'),
	('BTN', 'Bhutan'),
	('BOL', 'Bolivia'),
	('BES',);
	('Afghanistan', 'AFG'),
('Albania',	'ALB'),
('Algeria',	'DZA'),
('American Samoa', 'ASM'),
('Andorra', 'AND'),
('Angola',	'AGO'),
('Anguilla',	'AIA'),
('Antarctica',	'ATA'),
('Antigua and Barbuda',	'ATG'),
('Argentina',	'ARG'),
('Armenia',	'ARM'),
('Aruba',	'ABW'),
('Australia',	'AUS'),
('Austria',	'AUT'),
('Azerbaijan',	'AZE'),
('Bahamas (the)',	'BHS'),
('Bahrain',	'BHR'),
('Bangladesh',	'BGD'),
('Barbados',	'BRB'),
('Belarus',	'BLR'),
('Belgium',	'BEL'),
('Belize',	'BLZ'),
('Benin',	'BEN'),
('Bermuda',	'BMU'),
('Bhutan',	'BTN'),
('Bolivia (Plurinational State of)', 'BOL'),
('Bonaire, Sint Eustatius and Saba',	'BES'),
('Bosnia and Herzegovina', 'BIH'),
('Botswana',	'BWA'),
('Bouvet Island',	'BVT'),
('Brazil',	'BRA'),
('British Indian Ocean Territory (the)',	'IOT'),
('Brunei Darussalam',	'BRN'),
('Bulgaria',	'BGR'),
('Burkina Faso',	'BFA'),
('Burundi',	'BDI'),
('Cabo Verde',	'CPV'),
('Cambodia',	'KHM'),
('Cameroon',	'CMR'),
('Canada',	'CAN'),
('Cayman Islands (the)',	'CYM'),
('Central African Republic (the)',	'CAF'),
('Chad',	'TCD'),
('Chile',	'CHL'),
('China',	'CHN'),
('Christmas Island',	'CXR'),
('Cocos (Keeling) Islands (the)',	'CCK'),
('Colombia',	'COL'),
('Comoros (the)', 'COM'),
('Congo (the Democratic Republic of the)',	'COD'),
('Congo (the)',	'COG'),
('Cook Islands (the)', 'COK'),
('Costa Rica', 'CRI'),
('Croatia',	'HRV'),
('Cuba',	'CUB'),
('Curaçao',	'CUW'),
('Cyprus',	'CYP'),
('Czechia',	'CZE'),
('Côte d\'Ivoire',	'CIV'),
('Denmark',	'DNK'),
('Djibouti',	'DJI'),
('Dominica',	'DMA'),
('Dominican Republic (the)',	'DOM'),
('Ecuador',	'ECU'),
('Egypt',	'EGY'),
('El Salvador',	'SLV'),
('Equatorial Guinea',	'GNQ'),
('Eritrea',	'ERI'),
('Estonia',	'EST'),
('Eswatini',	'SWZ'),
('Ethiopia',	'ETH'),
('Falkland Islands (the) [Malvinas]',	'FLK'),
('Faroe Islands (the)',	'FRO'),
('Fiji',	'FJI'),
('Finland',	'FIN'),
('France',	'FRA'),
('French Guiana',	'GUF'),
('French Polynesia',	'PYF'),
('French Southern Territories (the)',	'ATF'),
('Gabon',	'GAB'),
('Gambia (the)', 'GMB'),
('Georgia',	'GEO'),
('Germany',	'DEU'),
('Ghana',	'GHA'),
('Gibraltar',	'GIB'),
('Greece',	'GRC'),
('Greenland',	'GRL'),
('Grenada',	'GRD'),
('Guadeloupe',	'GLP'),
('Guam',	'GUM'),
('Guatemala',	'GTM'),
('Guernsey',	'GGY'),
('Guinea',	'GIN'),
('Guinea-Bissau',	'GNB'),
('Guyana',	'GUY'),
('Haiti', 'HTI'),
('Heard Island and McDonald Islands',	'HMD'),
('Holy See (the)',	'VAT'),
('Honduras', 'HND'),
('Hong Kong',	'HKG'),
('Hungary',	'HUN'),
('Iceland',	'ISL'),
('India',	'IND'),
('Indonesia',	'IDN'),
(Iran (Islamic Republic of)	IR	IRN	364
Iraq	IQ	IRQ	368
Ireland	IE	IRL	372
Isle of Man	IM	IMN	833
Israel	IL	ISR	376
Italy	IT	ITA	380
Jamaica	JM	JAM	388
Japan	JP	JPN	392
Jersey	JE	JEY	832
Jordan	JO	JOR	400
Kazakhstan	KZ	KAZ	398
Kenya	KE	KEN	404
Kiribati	KI	KIR	296
Korea (the Democratic People's Republic of)	KP	PRK	408
Korea (the Republic of)	KR	KOR	410
Kuwait	KW	KWT	414
Kyrgyzstan	KG	KGZ	417
Lao People's Democratic Republic (the)	LA	LAO	418
Latvia	LV	LVA	428
Lebanon	LB	LBN	422
Lesotho	LS	LSO	426
Liberia	LR	LBR	430
Libya	LY	LBY	434
Liechtenstein	LI	LIE	438
Lithuania	LT	LTU	440
Luxembourg	LU	LUX	442
Macao	MO	MAC	446
Madagascar	MG	MDG	450
Malawi	MW	MWI	454
Malaysia	MY	MYS	458
Maldives	MV	MDV	462
Mali	ML	MLI	466
Malta	MT	MLT	470
Marshall Islands (the)	MH	MHL	584
Martinique	MQ	MTQ	474
Mauritania	MR	MRT	478
Mauritius	MU	MUS	480
Mayotte	YT	MYT	175
Mexico	MX	MEX	484
Micronesia (Federated States of)	FM	FSM	583
Moldova (the Republic of)	MD	MDA	498
Monaco	MC	MCO	492
Mongolia	MN	MNG	496
Montenegro	ME	MNE	499
Montserrat	MS	MSR	500
Morocco	MA	MAR	504
Mozambique	MZ	MOZ	508
Myanmar	MM	MMR	104
Namibia	NA	NAM	516
Nauru	NR	NRU	520
Nepal	NP	NPL	524
Netherlands (the)	NL	NLD	528
New Caledonia	NC	NCL	540
New Zealand	NZ	NZL	554
Nicaragua	NI	NIC	558
Niger (the)	NE	NER	562
Nigeria	NG	NGA	566
Niue	NU	NIU	570
Norfolk Island	NF	NFK	574
Northern Mariana Islands (the)	MP	MNP	580
Norway	NO	NOR	578
Oman	OM	OMN	512
Pakistan	PK	PAK	586
Palau	PW	PLW	585
Palestine, State of	PS	PSE	275
Panama	PA	PAN	591
Papua New Guinea	PG	PNG	598
Paraguay	PY	PRY	600
Peru	PE	PER	604
Philippines (the)	PH	PHL	608
Pitcairn	PN	PCN	612
Poland	PL	POL	616
Portugal	PT	PRT	620
Puerto Rico	PR	PRI	630
Qatar	QA	QAT	634
Republic of North Macedonia	MK	MKD	807
Romania	RO	ROU	642
Russian Federation (the)	RU	RUS	643
Rwanda	RW	RWA	646
Réunion	RE	REU	638
Saint Barthélemy	BL	BLM	652
Saint Helena, Ascension and Tristan da Cunha	SH	SHN	654
Saint Kitts and Nevis	KN	KNA	659
Saint Lucia	LC	LCA	662
Saint Martin (French part)	MF	MAF	663
Saint Pierre and Miquelon	PM	SPM	666
Saint Vincent and the Grenadines	VC	VCT	670
Samoa	WS	WSM	882
San Marino	SM	SMR	674
Sao Tome and Principe	ST	STP	678
Saudi Arabia	SA	SAU	682
Senegal	SN	SEN	686
Serbia	RS	SRB	688
Seychelles	SC	SYC	690
Sierra Leone	SL	SLE	694
Singapore	SG	SGP	702
Sint Maarten (Dutch part)	SX	SXM	534
Slovakia	SK	SVK	703
Slovenia	SI	SVN	705
Solomon Islands	SB	SLB	090
Somalia	SO	SOM	706
South Africa	ZA	ZAF	710
South Georgia and the South Sandwich Islands	GS	SGS	239
South Sudan	SS	SSD	728
Spain	ES	ESP	724
Sri Lanka	LK	LKA	144
Sudan (the)	SD	SDN	729
Suriname	SR	SUR	740
Svalbard and Jan Mayen	SJ	SJM	744
Sweden	SE	SWE	752
Switzerland	CH	CHE	756
Syrian Arab Republic	SY	SYR	760
Taiwan (Province of China)	TW	TWN	158
Tajikistan	TJ	TJK	762
Tanzania, United Republic of	TZ	TZA	834
Thailand	TH	THA	764
Timor-Leste	TL	TLS	626
Togo	TG	TGO	768
Tokelau	TK	TKL	772
Tonga	TO	TON	776
Trinidad and Tobago	TT	TTO	780
Tunisia	TN	TUN	788
Turkey	TR	TUR	792
Turkmenistan	TM	TKM	795
Turks and Caicos Islands (the)	TC	TCA	796
Tuvalu	TV	TUV	798
Uganda	UG	UGA	800
Ukraine	UA	UKR	804
United Arab Emirates (the)	AE	ARE	784
United Kingdom of Great Britain and Northern Ireland (the)	GB	GBR	826
United States Minor Outlying Islands (the)	UM	UMI	581
United States of America (the)	US	USA	840
Uruguay	UY	URY	858
Uzbekistan	UZ	UZB	860
Vanuatu	VU	VUT	548
Venezuela (Bolivarian Republic of)	VE	VEN	862
Viet Nam	VN	VNM	704
Virgin Islands (British)	VG	VGB	092
Virgin Islands (U.S.)	VI	VIR	850
Wallis and Futuna	WF	WLF	876
Western Sahara	EH	ESH	732
Yemen	YE	YEM	887
Zambia	ZM	ZMB	894
Zimbabwe	ZW	ZWE	716
Åland Islands	AX	ALA	248


-- Test Queries for Database --

-- When Querying for Favorited locations by a certain User
SELECT * FROM Favorites WHERE username = 'test1';

-- When Querying for all Air Quality Datapoints
SELECT quality, lat, lng FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID;

-- When Querying for all Rain DataPoints
SELECT rainfall, country FROM Rain, DataPoints, Locations WHERE Rain.DPID=DataPoints.DPID;

-- When Querying for all Temperature DataPoints
SELECT temperature, country FROM Temperature, DataPoints, Locations WHERE Temperature.DPID=DataPoints.DPID;

-- When Querying for time dependent Air Quality Datapoints
SELECT quality, country FROM Air, DataPoints, Locations WHERE Air.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10';

-- When Querying for time dependent Rain DataPoints
SELECT rainfall, country FROM Rain, DataPoints, Locations WHERE Rain.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10';

-- When Querying for time dependent Temperature DataPoints
SELECT temperature, country FROM Temperature, DataPoints, Locations WHERE Temperature.DPID=DataPoints.DPID AND DataPoints.time='2019-9-10';

-- When Querying Other Users
SELECT username FROM Users;
