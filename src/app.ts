import express from "express";
import { seedDatabase } from "./database/seed";

const app = express();

app.get('/', (req, res) => {
    seedDatabase();
    res.send('hello world!');
});

app.listen(3000, () => console.log("server running!"));