'use client';
import { useState } from 'react';

export default function IngredientsChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-3">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={!!checked[idx]}
            onChange={(e) => setChecked((c) => ({ ...c, [idx]: e.target.checked }))}
            aria-label={`Mark ${item} as done`}
          />
          <span className={checked[idx] ? 'line-through text-neutral/50' : ''}>{item}</span>
        </li>
      ))}
    </ul>
  );
} 