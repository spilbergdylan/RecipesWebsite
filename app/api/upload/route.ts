import { NextRequest } from 'next/server';
import { saveFileFromBuffer } from '@/lib/storage';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: 'No file' }), { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    const saved = await saveFileFromBuffer(buffer, file.name, file.type);
    return Response.json({ url: saved.publicPath });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || 'Upload failed' }), { status: 400 });
  }
} 