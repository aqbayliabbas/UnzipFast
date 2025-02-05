import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as fs from 'fs';
import AdmZip from 'adm-zip';

export async function POST(request: Request) {
  try {
    // Create directories if they don't exist
    const uploadDir = join(process.cwd(), 'uploads');
    const extractDir = join(process.cwd(), 'extracted');
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.mkdirSync(extractDir, { recursive: true });

    // Get the uploaded file
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create a unique directory for this upload
    const timestamp = Date.now().toString();
    const extractPath = join(extractDir, timestamp);
    fs.mkdirSync(extractPath, { recursive: true });

    // Save the file temporarily
    const bytes = await (file as Blob).arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = join(uploadDir, `${timestamp}.zip`);
    await writeFile(tempPath, buffer);

    // Extract the zip file
    const zip = new AdmZip(tempPath);
    zip.extractAllTo(extractPath, true);

    // Get list of files
    const files = [];
    const readDir = (dir: string) => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          readDir(fullPath);
        } else {
          const relativePath = fullPath.replace(extractPath, '').replace(/\\/g, '/').replace(/^\//, '');
          files.push({
            name: item,
            path: `${timestamp}/${relativePath}`,
            size: stat.size
          });
        }
      }
    };

    readDir(extractPath);

    // Clean up the temporary zip file
    fs.unlinkSync(tempPath);

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}
