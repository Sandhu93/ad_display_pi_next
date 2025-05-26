import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
export const config = { api: { bodyParser: false } };

const photoUploadDir = path.join(process.cwd(), 'public/media/photos');
const videoUploadDir = path.join(process.cwd(), 'public/media/video');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ status: 'failed', message: 'No file uploaded' }, { status: 400 });
    }
    
    let destinationDir = '';
    let fileUrlBase = '';

    // Determine file type and set destination
    if (file.type.startsWith('image/')) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

      destinationDir = photoUploadDir;
      fileUrlBase = '/media/photos/';
    } else if (file.type.startsWith('video/')) {
      destinationDir = videoUploadDir;
      fileUrlBase = '/media/video/';
    } else {
      return NextResponse.json({ status: 'failed', message: 'Unsupported file type' }, { status: 400 });
    }

    // Ensure the destination directory exists
    await fs.mkdir(destinationDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = Date.now() + '-' + file.name; // Generate unique filename
    const filePath = path.join(destinationDir, filename); // This is the server-side path
    const fileUrl = `${fileUrlBase}${filename}`;

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ status: 'succeeded', path: fileUrl });

  } catch (err) {
    console.error('Error uploading file:', err);
    const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
    return NextResponse.json({ status: 'failed', message: `Error uploading file: ${errorMessage}` }, { status: 500 });
  }
}