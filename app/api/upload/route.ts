import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/media/uploads'),
    keepExtensions: true,
  });

  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return reject(NextResponse.json({ status: 'failed', message: 'Error uploading file' }, { status: 500 }));
      }

      const file = (files.file as any)?.[0]; // Assuming a single file upload with the field name 'file'

      if (!file) {
        return resolve(NextResponse.json({ status: 'failed', message: 'No file uploaded' }, { status: 400 }));
      }

      // The file has already been saved to the uploadDir by formidable
      const filePath = `/media/uploads/${path.basename(file.filepath)}`;

      resolve(NextResponse.json({ status: 'succeeded', path: filePath }));
    });
  });
}