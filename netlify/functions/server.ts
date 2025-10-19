import express from "express";
import session from "express-session";
import memorystore from "memorystore";
import serverless from "serverless-http";
import { registerRoutes } from "../../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MemoryStore = memorystore(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "synergy-brand-architect-secret",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

registerRoutes(app);

export const handler = serverless(app);
