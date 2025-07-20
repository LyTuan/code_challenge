#code_challenge

### 1. Init the project

```commandline
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init  
```

### 2. Test the way sum to n

```commandline
npx ts-node problem_4/test_the_way_sum_to_n.ts

```

### 3. Run the express Crude 
```commandline
cd problem_5/src 
docker compose up -d 
cd ../../
npm run dev
```

Use these comand to test the API 
```commandline
# Create
curl -X POST http://localhost:5000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Resource", "description": "A test"}'

# List
curl http://localhost:5000/api/resources

# Filter by name
curl http://localhost:5000/api/resources?name=test

# Get by ID
curl http://localhost:5000/api/resources/<id>

# Update
curl -X PUT http://localhost:5000/api/resources/<id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'

# Delete
curl -X DELETE http://localhost:5000/api/resources/<id>

```

### 4. 