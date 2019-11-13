## Notice
Google Cloud PostgreSQL service is up and running. To gain access to it, please comment your google email in slack channel. The ip address is 35.227.52.28, but you will need to whitelist your public ip in google cloud console to gain access. In the future, connecting through SSL is the right way to go.

## Test
I temporarily put the database on my Duke VCM and "tunneled" through the firewall. Now you can test two api's by the following address:

```bash
http://cc1dd680.ngrok.io/api/v1/dps/temp
http://cc1dd680.ngrok.io/api/v1/categories
```

## Setup Backend

# Must have PostgreSQL, Node.js, and npm installed

## Windows User Only: Switch to psql user by:
```bash
sudo -i -u psql
```

Create `caction` db
```bash
createdb caction
```

Initialize db
```bash
psql -af init.sql caction
```

Then naviagte into the database you just created and create a new user:
```bash
psql caction
CREATE USER username WITH LOGIN PASSWORD password;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;
```
### Windows User Only: If you run into difficulties executing the last command, look [here](https://gist.github.com/AtulKsol/4470d377b448e56468baef85af7fd614) to solve the issue

Create a `.env` file in this directory with:
```
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=caction
```

Next, navigate into ```./datastore``` and plug in the username and password you just set up into credentials.js

Before actually loading data into database, you need to ensure you have all required dependencies by running:
```bash
npm install
```
Then we are good to go!

To load data into local PostgreSQL, run
```bash
node parse_csv.js
```

After the loading process finish running, you should see all temperature and rain data about USA loaded into temperature and rain table.

Next you can test queries against the data you just loaded by running:

```bash
psql caction -af test-production.sql
```
and this will display top 10 rows of temperature and rain data.

## Data Was Retrieved From:
https://climateknowledgeportal.worldbank.org/download-data
