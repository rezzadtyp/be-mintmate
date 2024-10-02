import cors from "cors";
import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
  static as static_,
} from "express";
import helmet from "helmet";
import exampleRouter from "./routes/example.router";
import nftRouter from "./routes/nft.router";
import { join } from "path";
import { allowedOrigins } from "./config";

const app = express();

// configure
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/assets", static_(join(__dirname, "../public/uploads")));

// routes
app.get("/api", (_req, res) => res.send("Welcome to My API"));
app.use("/api/examples", exampleRouter);
app.use("/api/nft", nftRouter);

// error
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(400).send({ message: err.message });
});

export default app;
