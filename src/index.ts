import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
// MIDDLEWARES
app.use(express.json()); // to parse the body into the json
app.use(express.urlencoded({ extended: true })); // to parse the url encoded data i.e. forms %&
app.use(cors()); // for security to allow specific ports

//
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hi from the server" });
});

app.listen("7000", () => {
  console.log("server is running on localhose: 7000");
});
