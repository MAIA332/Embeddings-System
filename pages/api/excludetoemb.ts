import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';


const dataFilePath = path.join(process.cwd(), 'public', 'embbedings.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {

      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const jsonData = JSON.parse(fileData);

      const { uniqueName } = req.body;

      if (!uniqueName) {
        return res.status(400).json({ message: 'uniqueName is required' });
      }

      const updatedData = jsonData.filter((item: { uniqueName: string }) => item.uniqueName !== uniqueName);

      fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));

      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error reading or writing file', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
