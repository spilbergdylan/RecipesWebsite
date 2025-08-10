import { createWriteStream, existsSync, mkdirSync, statSync, createReadStream } from 'fs';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';

const PROJECT_ROOT = process.cwd();
const UPLOAD_DIR = join(PROJECT_ROOT, 'uploads');

const ACCEPTED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function validateFile(mimeType: string, size: number) {
  if (!ACCEPTED_MIME.has(mimeType)) {
    throw new Error('Unsupported file type');
  }
  if (size > MAX_SIZE_BYTES) {
    throw new Error('File too large');
  }
}

export async function saveFileFromBuffer(buffer: Buffer, originalName: string, mimeType: string) {
  ensureUploadDir();
  validateFile(mimeType, buffer.length);
  const extension = extname(originalName) || inferExt(mimeType);
  const filename = `${randomUUID()}${extension}`;
  const fullPath = join(UPLOAD_DIR, filename);
  await new Promise<void>((resolve, reject) => {
    const ws = createWriteStream(fullPath);
    ws.on('error', reject);
    ws.on('finish', () => resolve());
    ws.end(buffer);
  });
  return { filename, path: fullPath, publicPath: `/uploads/${filename}`, mimeType };
}

export function getUploadReadStream(filename: string) {
  ensureUploadDir();
  const fullPath = join(UPLOAD_DIR, filename);
  return createReadStream(fullPath);
}

export function getUploadFileStat(filename: string) {
  const fullPath = join(UPLOAD_DIR, filename);
  return statSync(fullPath);
}

function inferExt(mime: string) {
  switch (mime) {
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    default:
      return '';
  }
}

/*
To switch to S3 later, replace the implementations above with S3 PutObject/GetObject using @aws-sdk/client-s3.

Example (sketch):

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function saveFileFromBuffer(buffer: Buffer, originalName: string, mimeType: string) {
  const key = `uploads/${randomUUID()}${extname(originalName)}`;
  await s3.send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key, Body: buffer, ContentType: mimeType }));
  return { filename: key, path: key, publicPath: `https://YOUR_CDN/${key}`, mimeType };
}
*/ 