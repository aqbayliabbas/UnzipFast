import { NextResponse } from 'next/server';
import { join } from 'path';
import * as fs from 'fs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json(
        { error: 'No file path provided' },
        { status: 400 }
      );
    }

    // Get the timestamp and relative path
    const [timestamp, ...pathParts] = filePath.split('/');
    const relativePath = pathParts.join('/');

    // Construct the full path
    const extractDir = join(process.cwd(), 'extracted');
    const fullPath = join(extractDir, timestamp, relativePath);

    // Security check: ensure the path is within the extracted directory
    if (!fullPath.startsWith(extractDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(fullPath);
    const fileName = relativePath.split('/').pop() || 'download';

    const headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
