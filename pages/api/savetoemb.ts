import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join('./src/app', 'embbedings.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        const newData = req.body;

        jsonData.push(newData);

        fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

        res.status(200).json({ message: 'Data added successfully', data: newData });

    } catch (error) {
      console.error('Error reading or writing file', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}