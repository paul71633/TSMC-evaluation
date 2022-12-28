import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 5001;
const todos = [
  { name: "mop the floor", id: "12fd31", priority: "high", completed: false },
  { name: "wash the dishes", id: "1sfdgh232", priority: "low", completed: false },
  { name: "do the laundry", id: "123hgj3", priority: "alarming", completed: false },
];

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello world!!");
});

app.get("/api/todos", (req: Request, res: Response) => {
  return res.json({
    todos,
  });
});

app.post("/api/post", (req: Request, res: Response) => {
  console.log(req.body);
  todos.push(req.body);
  return res.sendStatus(200);
});

app.delete("/api/todos/:id", (req: Request, res: Response) => {
  console.log(req.params);
  todos.forEach((todo, key) => {
    if (todo.id == req.params.id) {
      todos.splice(key, 1);
    }
  });
  return res.sendStatus(200);
})

app.all("/api", (req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Port ${port} connected, welcome.`);
});
