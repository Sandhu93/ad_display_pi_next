import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  const form = new IncomingForm({  // Define form outside the promise
    uploadDir: path.join(process.cwd(), 'public/media/uploads'),
    keepExtensions: true,
  });

  return new Promise<NextResponse>((resolve, reject) => {
    // Create a mock request object that formidable can parse
    const mockReq = {
      headers: req.headers,
      method: req.method,
      url: req.url,
      socket: { remoteAddress: '127.0.0.1' }, // Provide a dummy remote address
      on: (event: string, callback: (...args: any[]) => void) => {
        if (event === 'data') {
          req.arrayBuffer().then(buffer => {
            callback(Buffer.from(buffer));
          }).catch(err => {
            console.error('Error getting request body:', err);
            reject(NextResponse.json({ status: 'failed', message: 'Error reading request body' }, { status: 500 }));
          });
        } else if (event === 'end') {
          // formidable expects 'end' event to signal the end of the request
          callback();
        }
      },
    } as any; // Cast to any to satisfy formidable's expected type

    form.parse(mockReq, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return reject(NextResponse.json({ status: 'failed', message: 'Error uploading file' }, { status: 500 }));
      }

      // Assuming a single file upload with the field name 'file'
      const file = (files.file as FormidableFile[])?.[0];

      if (!file) {
        return resolve(NextResponse.json({ status: 'failed', message: 'No file uploaded' }, { status: 400 }));
      }

      // The file has already been saved to the uploadDir by formidable
      // formidable@v3+ provides the filepath directly
      const filePath = `/media/uploads/${path.basename(file.filepath)}`; 

      resolve(NextResponse.json({ status: 'succeeded', path: filePath }));
    });
  });
}