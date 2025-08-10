'use client';
import { useRef } from 'react';
import AddRecipeModal from '@/components/AddRecipeModal';

export function ChangeImageButton({ recipeId }: { recipeId: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!uploadRes.ok) return alert('Upload failed');
    const { url } = await uploadRes.json();
    const patchRes = await fetch(`/api/recipes/${recipeId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: url }) });
    if (!patchRes.ok) return alert('Failed to update image');
    location.reload();
  }
  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      <button className="btn btn-secondary btn-3d btn-sm" onClick={() => inputRef.current?.click()}>Change image</button>
    </div>
  );
}

export function EditRecipeButton({ id }: { id: number }) {
  return <AddRecipeModal editRecipeId={id} />;
}

export function DeleteRecipeButton({ id, familySlug }: { id: number; familySlug: string }) {
  async function onDelete() {
    if (!confirm('Delete this recipe?')) return;
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      location.href = `/${familySlug}`;
    } else {
      alert('Failed to delete');
    }
  }
  return (
    <button className="btn btn-error btn-3d" onClick={onDelete}>Delete</button>
  );
} 