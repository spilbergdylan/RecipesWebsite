'use client';
import { useState } from 'react';

export default function Memories({ recipeId, initialMemories }: { recipeId: number; initialMemories: any[] }) {
  const [memories, setMemories] = useState<any[]>(initialMemories);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [saving, setSaving] = useState(false);

  async function addMemory(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    const optimistic: any = { id: Math.random(), recipeId, author: author || null, text, createdAt: new Date() };
    setMemories((m) => [optimistic, ...m]);
    setText('');
    try {
      const res = await fetch('/api/memories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recipeId, author: author || undefined, text }) });
      if (!res.ok) throw new Error('Failed to save');
    } catch (e) {
      // rollback
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-base-100/80 backdrop-blur-sm ring-1 ring-black/5 p-4 rounded-2xl shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Family Memories</h2>
      <form onSubmit={addMemory} className="grid sm:grid-cols-4 gap-2 items-start">
        <input className="input input-bordered sm:col-span-1" placeholder="Author (optional)" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input className="input input-bordered sm:col-span-2" placeholder="Share a short memory…" value={text} onChange={(e) => setText(e.target.value)} />
        <button disabled={saving} className="btn btn-primary btn-3d sm:col-span-1">{saving ? 'Adding…' : 'Add Memory'}</button>
      </form>
      <ul className="space-y-3">
        {memories.map((m) => (
          <li key={m.id} className="p-3 rounded-xl bg-base-100/90 ring-1 ring-black/5 shadow-sm">
            <div className="text-neutral/80 text-sm">{new Date(m.createdAt).toLocaleString()}</div>
            <div className="mt-1">{m.text}</div>
            {m.author && <div className="text-neutral/60 text-sm mt-1">— {m.author}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
} 