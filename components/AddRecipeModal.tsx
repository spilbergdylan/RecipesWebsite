'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RecipeCreateSchema, RecipeUpdateSchema, type RecipeCreateInput } from '@/lib/validation';
import { useRouter } from 'next/navigation';

export default function AddRecipeModal({ familySlug, editRecipeId }: { familySlug?: string; editRecipeId?: number }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isEdit = Boolean(editRecipeId);

  const schema = useMemo(() => (isEdit ? RecipeUpdateSchema : RecipeCreateSchema), [isEdit]);

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset, setValue } = useForm<any>({
    resolver: zodResolver(schema as any),
    defaultValues: isEdit ? {} : { familySlug, title: '', description: '', tags: [], ingredients: [''], instructions: '' }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' });

  useEffect(() => {
    async function load() {
      if (isEdit && editRecipeId) {
        const res = await fetch(`/api/recipes/${editRecipeId}`);
        const { recipe } = await res.json();
        reset({
          title: recipe.title,
          description: recipe.description,
          tags: (recipe.tags as string[]) || [],
          ingredients: (recipe.ingredients as string[]) || [''],
          instructions: recipe.instructions
        });
      }
    }
    load();
  }, [isEdit, editRecipeId, reset]);

  async function onSubmit(values: any) {
    try {
      let imageUrl: string | undefined;
      const file: File | undefined = (values as any).image?.[0];
      if (file) {
        const fd = new FormData();
        fd.append('file', file);
        const up = await fetch('/api/upload', { method: 'POST', body: fd });
        if (!up.ok) throw new Error('Upload failed');
        const data = await up.json();
        imageUrl = data.url;
      }

      if (isEdit && editRecipeId) {
        const payload = { ...values };
        delete (payload as any).image;
        if (imageUrl) (payload as any).imageUrl = imageUrl;
        const res = await fetch(`/api/recipes/${editRecipeId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('Failed to update');
      } else {
        const payload: RecipeCreateInput = {
          familySlug: values.familySlug || familySlug!,
          title: values.title,
          description: values.description,
          tags: values.tags || [],
          ingredients: values.ingredients,
          instructions: values.instructions
        };
        const res = await fetch('/api/recipes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('Failed to create');
      }

      setOpen(false);
      router.refresh();
    } catch (e: any) {
      alert(e.message || 'Something went wrong');
    }
  }

  return (
    <>
      {isEdit ? (
        <button className="btn btn-primary btn-3d btn-sm md:btn-md" onClick={() => setOpen(true)}>Edit</button>
      ) : (
        <button className="btn btn-primary btn-3d btn-sm md:btn-md" onClick={() => setOpen(true)}>+ Add a Recipe</button>
      )}

      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box p-0 rounded-[2rem] metal-sheet max-h-[calc(100dvh-2rem)] h-[calc(100dvh-2rem)] overflow-hidden">
            <div className="p-6 md:p-8 overflow-y-auto h-full">
              <h3 className="font-bold text-lg mb-4 text-darker">{isEdit ? 'Edit Recipe' : 'Add a Recipe'}</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {!isEdit && (
                  <input {...register('familySlug')} defaultValue={familySlug} type="hidden" />
                )}
                <div className="form-control">
                  <label className="label text-darker">Title</label>
                  <input className="input input-bordered light-surface" {...register('title')} />
                  {errors.title && <span className="text-error text-sm">{String(errors.title.message)}</span>}
                </div>
                <div className="form-control">
                  <label className="label text-darker">Short description</label>
                  <input className="input input-bordered light-surface" {...register('description')} />
                  {errors.description && <span className="text-error text-sm">{String(errors.description.message)}</span>}
                </div>
                <div className="form-control">
                  <label className="label text-darker">Ingredients</label>
                  <div className="space-y-2">
                    {fields.map((f, idx) => (
                      <div key={f.id} className="flex gap-2">
                        <input className="input input-bordered w-full light-surface" {...register(`ingredients.${idx}` as const)} />
                        <button type="button" className="btn btn-secondary btn-3d" onClick={() => remove(idx)}>−</button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary btn-3d btn-sm" onClick={() => append('')}>+ Add Ingredient</button>
                  </div>
                  {errors.ingredients && <span className="text-error text-sm">At least one ingredient</span>}
                </div>
                <div className="form-control">
                  <label className="label text-darker">Instructions</label>
                  <textarea className="textarea textarea-bordered h-32 light-surface" {...register('instructions')} />
                  {errors.instructions && <span className="text-error text-sm">{String((errors.instructions as any).message)}</span>}
                </div>
                <div className="form-control">
                  <label className="label text-darker">Image (jpg/png/webp; max 5MB)</label>
                  <input type="file" accept="image/*" className="file-input file-input-bordered light-surface" {...register('image')} />
                </div>
                <div className="modal-action">
                  <button type="button" className="btn btn-neutral btn-3d" onClick={() => setOpen(false)}>Cancel</button>
                  <button disabled={isSubmitting} className="btn btn-primary btn-3d" type="submit">{isSubmitting ? 'Saving…' : 'Save'}</button>
                </div>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
} 