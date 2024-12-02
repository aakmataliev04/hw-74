import express from "express";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req: express.Request, res: express.Response) => {
  res.send('All messages');
})
messagesRouter.post("/", async (req: express.Request, res: express.Response) => {
  res.send('Created message');
})

export default messagesRouter;