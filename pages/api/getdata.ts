import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const dataFilePath = path.join(process.cwd(), 'src/app', 'embbedings.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(fileData);

    res.status(200).json(jsonData);
    
  } catch (error) {
    console.error('Error reading file', error);
    res.status(500).json({ message: 'Error reading data file' });
  }
}
