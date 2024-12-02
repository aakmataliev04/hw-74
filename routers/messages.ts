import express from 'express';
import {promises as fs} from 'fs';

const messagesRouter = express.Router();

interface Message {
  message: string;
}

messagesRouter.get("/", async (req: express.Request, res: express.Response) => {
  const path = './messages';
  const files = await fs.readdir(path);

  const result = await Promise.all(files.slice(-5).map(async (fileName) => {
    const messageContent = await fs.readFile(`${path}/${fileName}`);
    return await JSON.parse(messageContent.toString()) as Message;
  }));

  res.send(result);
});
messagesRouter.post("/", async (req: express.Request, res: express.Response) => {

  const dateTime = new Date().toISOString();
  const messageText = req.body;
  const message = {...messageText, dateTime: dateTime};

  await fs.writeFile(`./messages/${dateTime}.txt`, JSON.stringify(messageText));
  res.send(message);
});

export default messagesRouter;