import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const dbFilePath = path.join(__dirname, 'db.json');

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

const readDatabase = (): { submissions: Submission[] } => {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    console.error(`Error reading database file: ${error.message}`);
    // Initialize with empty submissions array if file doesn't exist or is empty
    return { submissions: [] };
  }
};

const writeDatabase = (data: { submissions: Submission[] }) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  } catch (error : any) {
    console.error(`Error writing to database file: ${error.message}`);
  }
};

app.get('/ping', (req: Request, res: Response) => {
  res.send(true);
});

app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  if (!name || !email || !phone || !github_link || !stopwatch_time) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };
  const db = readDatabase();
  db.submissions.push(newSubmission);
  writeDatabase(db);

  res.status(201).send({ message: 'Submission received' });
});

app.get('/read', (req: Request, res: Response) => {
  const { index } = req.query;
  const idx = parseInt(index as string, 10);

  if (isNaN(idx) || idx < 0) {
    return res.status(400).send({ message: 'Invalid index' });
  }

  const db = readDatabase();
  if (idx >= db.submissions.length) {
    return res.status(404).send({ message: 'Submission not found' });
  }

  res.status(200).send(db.submissions);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
