import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';


const dataFilePath = path.join(process.cwd(), 'public', 'embbedings.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const jsonData = JSON.parse(fileData);

      const updatedData = req.body;

      if (!updatedData) {
        return res.status(400).json({ message: 'data is required' });
      }

      const itemIndex = jsonData.findIndex((item: any) => item.uniqueName == updatedData.uniqueName);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
      }

      jsonData[itemIndex] = { ...jsonData[itemIndex], ...updatedData };

      fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

      res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
      console.error('Error reading or writing file', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
