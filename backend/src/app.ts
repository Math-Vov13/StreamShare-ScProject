// src/app.ts
import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import logRequest from "./middlewares/log";
import authRoute from "./routes/auth";
import userRoute from './routes/users';
import groupRoute from "./routes/groups";
import authUsrRoute from "./routes/auth_users";
import contentRoute from "./routes/content";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;



// Middlewares
app.use(express.json()); // Middleware pour parser le body JSON
app.use(cookieParser()) // Middleware pour parser les Cookies
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(logRequest)


// Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
  );
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  next();
});


// Routes
app.use("/api/v1/groups/auth", authRoute);
app.use("/api/v1/groups", authUsrRoute);
app.use("/api/v1/groups", groupRoute);
app.use("/api/v1/groups", userRoute);
app.use("/api/v1/search", contentRoute);


// Redirections
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/groups') {
    res.redirect(301, '/api/v1/groups');
  // } else if (req.originalUrl === '/users') {
  //   res.redirect(301, '/api/v1/users');
  } else if (req.originalUrl === '/search') {
    res.redirect(301, '/api/v1/search');
  } else {
    next();
  }
});



// Endpoints
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to StreamShare API ! :D")
})


app.get("/debug", (req: Request, res: Response) => {
  res.json({
    method: req.method,
    protocol: req.protocol,
    request: {
      url: req.url,
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers
    }
  })
})

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// app.use(cors({ 
//   origin: 'http://localhost:3000'
//   // credentials: true,
// }));

// Listen Port (Start Server)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});