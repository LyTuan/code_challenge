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

### 4. Architecture 

#### 📊 Scoreboard API Module
This module provides backend functionality for tracking and displaying the **Top 10 users by score** on a real-time scoreboard. The module includes API endpoints to increment user scores and stream live scoreboard updates to connected clients.

---
##### 📌 Features

- ✅ Increment user score via a secure API.
- ✅ Real-time scoreboard updates using WebSockets.
- ✅ Top 10 users by score sorted in descending order.
- ✅ Security validation to prevent unauthorized score modifications.
---

##### 🧩 Module Responsibilities

1. **Score Management**
   - Securely update scores when a user completes a valid action.
   - Store scores in a persistent and query-efficient database.
2. **Live Updates**
   - Push real-time updates of the top 10 scoreboard to all subscribed clients.
3. **Security**
   - Verify and authorize score updates via authentication tokens.
   - Throttle or rate-limit score updates to prevent abuse.

---

##### 🔐 Security Considerations

- All score update requests must include a **valid JWT access token**.
- The server will **verify the token** and extract the authenticated user ID.
- Unauthorized or malformed requests will be rejected with `401 Unauthorized`.

---

##### 📡1. API Endpoints

###### 1.1. `POST /api/score/increment`

Increments the authenticated user's score by 1.

###### Request Headers:
```http
Authorization: Bearer <JWT>
```
###### Response:
```json
{
  "message": "Score updated successfully",
  "newScore": 12
}
```


###### 1.2. `GET /api/scoreboard/top`
Returns the current top 10 users with their scores.

Response:
```json
[
  { "userId": "abc123", "username": "Player1", "score": 100 },
  { "userId": "xyz789", "username": "Player2", "score": 95 },
  ...
]
```
###### 1.3. 🔁 Real-time WebSocket Events
scoreboard:update
Broadcasted to all connected WebSocket clients whenever the scoreboard changes.

```json
{
  "scoreboard": [
    { "userId": "abc123", "username": "Player1", "score": 100 },
    ...
  ]
}
```

###### 1.4.🧱 Database Schema (MongoDB Example)
```typescript
User {
  _id: ObjectId
  username: string
  score: number
  lastUpdated: Date
}
```

Index on score: -1 for fast leaderboard lookup.

###### 1.5. 🚀 Tech Stack Recommendation

    Express.js with TypeScript
    
    MongoDB or Redis for fast read/writes
    
    Socket.IO or WebSocket for real-time updates
    
    JWT for authentication
    
    Optional: Redis pub/sub or change streams for scaling

###### 1.6. 📌 Authentication Strategy
    
    Each API call must include a signed JWT.
    
    JWT is verified on the server and user ID is extracted.
    
    Malicious attempts to fake user ID or score updates will be blocked.
    
###### 1.7. ⚠️ Edge Cases to Handle
    User not found in DB → return 404.
    
    JWT expired or invalid → return 401.
    
    Attempting score update too frequently → 429 (rate limit).

---

## ✅ 2. Diagram: Flow of Execution
Follow this link: [Link](https://mermaid.live/edit#pako:eNp1kt1O4zAQhV9lNFddbQgJCST1BRLQXYmVEEili4Ry4ybT1KKxu47NX9V3xw60qybiLp6c852Z0WywVBUhw0K29M-SLGkieK15U0iANddGlGLNpYFZS7pf-62VNCSrfv2Sl0-uDKOLu-sf_Z8TbvictwSjGyVrNbkcKB5oPlWOYGBK-tnHeoVv4Oj8fJfJ4I70QummhYvSCCVhRGEdwouQUPOGOupO7HwHPTnz7fQejttSaToWstTUkEv-CX8e7r3xQD10_-UrUXFD38mHMzK43qdYNwl00d471B4NA2drH1f1rP3Y_uIY_GqEgQI7x1xxXTHbkQp0izJLkPQCRq0hjjyv7z9ct22X8B8EnyAMsCHdcFG5I9p4SIFm6eYskLnPihbcrkzh7mvrpNwaNX2TJTKjLQWola2XyBZ81brXJ_Hr_vZVdxKPSjU7i3si2-ArsvgkCrM8ieIsjfMoG2dxgG_IknEYn6TjbJyn6WmepMnZNsD3jhCFeXYaYK19t18duNlIXykrjSMm2w803wO-)

Here’s a textual representation of the diagram. You can convert this into a visual format using tools like **Lucidchart**, **draw.io**, or **Mermaid**.

```mermaid
sequenceDiagram
  participant User
  participant Frontend
  participant Backend (API)
  participant Database (MongoDB)
  participant WebSocket Server

  User->>Frontend: Performs Action (e.g. win game)
  Frontend->>Backend (API): POST /score/increment + JWT
  Backend (API)->>Backend (API): Validate JWT
  Backend (API)->>Database (MongoDB): Increment user score
  Database (MongoDB)-->>Backend (API): Updated user score
  Backend (API)->>WebSocket Server: Emit "scoreboard:update" with new top 10
  WebSocket Server->>Frontend: Push scoreboard update
  
 ``` 


##### ✅ 3. Suggested Improvements

🔧 Enhancements to Consider

| Area                | Suggestion                                                                                      | Reason                                         |
|---------------------|--------------------------------------------------------------------------------------------------|------------------------------------------------|
| **Security**        | Use signed JWTs with user ID and expiry. Use HTTPS.                                             | Prevent forgery and man-in-the-middle attacks. |
| **Rate Limiting**   | Limit `/score/increment` calls per user per minute.                                             | Prevent automated abuse.                       |
| **Score Integrity** | Optionally validate score update against gameplay events server-side.                           | Prevent tampering from frontend or bots.       |
| **Audit Logs**      | Log each score update with IP and timestamp.                                                    | Useful for debugging or abuse detection.       |
| **Caching**         | Use Redis to cache top 10 leaderboard.                                                          | Reduce DB load for frequent reads.             |
| **Scaling**         | Use Redis pub/sub or change streams to broadcast leaderboard across multiple WebSocket servers. | Necessary for horizontal scaling.              |



##### ✅ 4. Next Steps for Backend Team

| No. | Task                                                                                     |
|-----|-------------------------------------------------------------------------------------------|
| 1   | Set up **ExpressJS + MongoDB + Socket.IO** with **TypeScript**                           |
| 2   | Implement **JWT authentication middleware**                                               |
| 3   | Build `POST /api/score/increment` with score update logic                                 |
| 4   | Build `GET /api/scoreboard/top` endpoint                                                  |
| 5   | Implement **WebSocket server** with `scoreboard:update` broadcast                         |
| 6   | Apply security features: **rate limiting**, **logging**, **authentication**               |
| 7   | Write **unit tests** for core logic and API endpoints  



