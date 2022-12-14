import * as dotenv from 'dotenv';
dotenv.config()
import express from "express";
import { api } from "./api";

const app = express();
const port = 3004
const cache = new Map<any, string>();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res) => {
  const { birthday, birthmonth } = req.query;
  if (cache.has(JSON.stringify(req.query))) {
    console.log("Retrieve from cache");
    return res.send(cache.get(JSON.stringify(req.query)));
  }
  const data = await api.getVillagerByBirthday(
    Number(birthday),
    Number(birthmonth)
  );
  cache.set(JSON.stringify(req.query), data);
  console.log("Stored in cache");
  res.send(data);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
