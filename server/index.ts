import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// WWW to non-WWW redirect middleware
app.use((req, res, next) => {
  // Get host from different possible headers
  const host = req.header('host') || req.header('x-forwarded-host');
  
  if (host && host.match(/^www\./i)) {
    const newHost = host.replace(/^www\./i, '');
    // Handle protocol properly considering potential proxies
    const protocol = req.header('x-forwarded-proto') || req.protocol;
    const fullUrl = `${protocol}://${newHost}${req.originalUrl || req.url}`;
    console.log(`Redirecting from www to non-www: ${fullUrl}`);
    return res.redirect(301, fullUrl);
  }
  next();
});

// Set up logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Create HTTP server
const server = createServer(app);

// Basic test endpoint to verify server is up
app.get('/api/test', (req, res) => {
  res.json({ message: 'API server is running' });
});

// Add global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Register all routes
registerRoutes(app);

// Setup Vite/static files 
if (process.env.NODE_ENV !== 'production') {
  console.log('Setting up Vite middleware for development');
  setupVite(app, server)
    .then(() => {
      // Start server after Vite is ready
      const port = 5000;
      server.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on http://0.0.0.0:${port}`);
      });
    })
    .catch(err => {
      console.error('Failed to setup Vite:', err);
      process.exit(1);
    });
} else {
  // Production mode
  serveStatic(app);
  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });
}
