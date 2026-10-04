# Blog/Post Management Application

A full-stack CRUD app: React (Vite) frontend, Express.js REST API, MongoDB Atlas database.

```
project/
├── app/      → React frontend
└── server/   → Express + MongoDB REST API
```

## 1. Prerequisites

- Node.js (v18+) and npm installed
- A free MongoDB Atlas cluster (https://www.mongodb.com/cloud/atlas) — no local MongoDB needed

## 2. Set up MongoDB Atlas

1. Create a free cluster at MongoDB Atlas.
2. Under **Database Access**, create a database user with a username/password.
3. Under **Network Access**, add your current IP (or `0.0.0.0/0` for testing).
4. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```
5. Create a database named `blogDB` (or any name you like — MongoDB will create it automatically on first insert).

## 3. Configure the server

Edit `server/.env`:

```
ATLAS_URI=mongodb+srv://youruser:yourpassword@yourcluster.mongodb.net/blogDB?retryWrites=true&w=majority
PORT=5050
```

Replace `<username>`, `<password>`, and the cluster URL with your actual Atlas credentials. Make sure the database name (`blogDB` here) is included in the URI path, or set `DB_NAME` in `.env` to override it.

## 4. Install dependencies

```bash
# From the project root
cd server
npm install

cd ../app
npm install
```

## 5. Run the app (development)

Open **two terminals**.

**Terminal 1 — start the API server:**
```bash
cd server
npm start
```
You should see:
```
Successfully connected to MongoDB Atlas!
Server is listening on port 5050
```

**Terminal 2 — start the React frontend:**
```bash
cd app
npm run dev
```
Vite will print a local URL, typically `http://localhost:5173`.

Open `http://localhost:5173` in your browser. The Vite dev server proxies any `/posts` fetch calls to `http://localhost:5050`, so the frontend and backend talk to each other automatically — no CORS config needed in dev.

## 6. Using the app

- **Home** — lists all posts, with Read / Edit / Delete actions
- **New Post** — create a post (title, author, content)
- **Post page** — view a single post in full, with Edit / Delete
- **Edit** — update an existing post's fields
- **Archive** — all posts grouped by month created

## 7. REST API reference

Base URL: `http://localhost:5050`

| Method | Route         | Description              |
|--------|---------------|--------------------------|
| GET    | /posts        | Get all posts            |
| GET    | /posts/:id    | Get a single post        |
| POST   | /posts        | Create a new post        |
| PATCH  | /posts/:id    | Update an existing post  |
| DELETE | /posts/:id    | Delete a post            |

Example request body for POST/PATCH:
```json
{
  "title": "My First Post",
  "author": "Jane Doe",
  "content": "Hello world, this is my blog post."
}
```

## 8. Production build (optional)

To build the frontend as static files:
```bash
cd app
npm run build
```
This outputs to `app/dist`. You can serve these files with any static host, or add `express.static` in `server/index.mjs` to serve them directly from the Express server, pointing API calls to the deployed backend's full URL instead of relative paths.

## Troubleshooting

- **"Could not load posts. Is the API server running?"** → Make sure `npm start` is running in `server/` and check its terminal for MongoDB connection errors.
- **MongoDB connection errors** → Double-check your `ATLAS_URI`, that your IP is allow-listed in Atlas Network Access, and that the password has no unescaped special characters (URL-encode `@`, `#`, etc. if present).
- **Port already in use** → Change `PORT` in `server/.env`, and update the proxy target in `app/vite.config.js` to match.
