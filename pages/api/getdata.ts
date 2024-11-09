import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';


const dataFilePath = path.join(process.cwd(), 'public', 'embbedings.json');

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
