import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 5001;
const todo = [
  { name: "todo1", id: "12fd31", priority: "high", completed: false },
  { name: "todo2", id: "1sfdgh232", priority: "low", completed: false },
  { name: "todo3", id: "123hgj3", priority: "alarming", completed: false },
  {
    name: "todo4",
    id: "1fs34",
    priority: "alarming",
    completed: false,
  },
];

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello world!!");
});

app.get("/api", (req: Request, res: Response) => {
  return res.json({
    todo,
  });
});

app.post("/api", (req: Request, res: Response) => {
  console.log(req.body);
  todo.push(req.body);
  return res.sendStatus(200);
});

app.all("/api", (req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Port ${port} connected, welcome.`);
});
