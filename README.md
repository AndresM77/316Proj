## 316Proj

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

