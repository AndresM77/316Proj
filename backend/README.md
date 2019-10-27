## Setup Backend

# Must have PostgreSQL installed (we are using 11.5)

Create `caction` db
```bash
createdb caction
```

Initialize db
```bash
psql -af init.sql caction
```

To run sample queries and populate the database run
```bash
psql caction -af test-sample.sql
```

Then
```bash
psql caction
CREATE USER username WITH LOGIN PASSWORD password;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;
```

Create a `.env` file in this directory with:
```
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=caction
```

