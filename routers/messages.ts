import express from 'express';
import {promises as fs} from 'fs';

const messagesRouter = express.Router();

messagesRouter.get("/", async (req: express.Request, res: express.Response) => {
  res.send('Messages');
})
messagesRouter.post("/", async (req: express.Request, res: express.Response) => {

  const dateTime = new Date().toISOString();
  const messageText = req.body;
  const message = {...messageText, dateTime: dateTime};

  await fs.writeFile(`./messages/${dateTime}.txt`, JSON.stringify(messageText));
  res.send(message);
})

export default messagesRouter;