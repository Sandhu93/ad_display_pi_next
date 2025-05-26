import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
export const config = { api: { bodyParser: false } };

const uploadDir = path.join(process.cwd(), 'public/media/uploads');

export async function POST(request: Request) {
  try {
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ status: 'failed', message: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = Date.now() + '-' + file.name; // Generate unique filename
    const filePath = path.join(uploadDir, filename); // This is the server-side path
    const fileUrl = `/media/uploads/${filename}`;

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ status: 'succeeded', path: fileUrl });

  } catch (err) {
    console.error('Error uploading file:', err);
    const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
    return NextResponse.json({ status: 'failed', message: `Error uploading file: ${errorMessage}` }, { status: 500 });
  }
}