import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import morgan from "morgan";
import responseTime from "response-time";
import { errorResponse } from "../utils/response.utils";
import createBrowserRouter from "../router";
import "dotenv/config";

/**
 * Initial express application
 */
const app = express();

/**
 * Application port
 */
const port = process.env.APP_PORT || 3001;

/**
 * Secret Key
 */
const secretKey = process.env.APP_KEY || "secretKey";

/**
 * Override the req.method property with a new value
 */
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));
app.use(
  methodOverride((req) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

/**
 * Use morgan logger middleware
 */
app.use(
  morgan(
    `>> MORGAN :remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"\n`
  )
);

/**
 * Enable CORS with various options
 */
app.use(cors());

/**
 * Helmet helps secure Express apps by setting HTTP response headers
 */
app.use(helmet());

/**
 * The middleware will attempt to compress response bodies
 * for all request that traverse through the middleware,
 * based on the given options
 */
app.use(compression());

/**
 * Serving static files in Express
 */
app.use(express.static("public"));

/**
 * Parse urlencoded bodies
 */
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Create a session middleware
 */
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: secretKey,
  })
);

/**
 * Create a cookie middleware
 */
app.use(cookieParser(secretKey));

/**
 * Record the response time of a request
 */
app.use(responseTime());

/**
 * Initial Router
 */
createBrowserRouter(app);

/**
 * NotFound error handling middleware
 */
app.use((req: Request, res: Response) => {
  res.status(404);
  res.json(errorResponse(404, "Not Found", []));
});

/**
 * Error handling middleware
 */
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(">> Internal Server Error:", error);
  res.status(500);
  res.json(errorResponse(500, "Internal Server Error", error?.stack || []));
});

/**
 * Application listening port
 */
app.listen(port, () => {
  console.clear();
  console.info(`|===========================================|`);
  console.info(`|                                           |`);
  console.info(`|> Application listening on port: ${port}      |`);
  console.info(`|> Host: http://localhost:${port}              |`);
  console.info(`|                                           |`);
  console.info(`|===========================================|`);
  console.info("\n");
});
