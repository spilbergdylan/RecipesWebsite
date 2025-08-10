"use client";
import { useEffect, useRef, useState } from "react";

type ThemeOption = {
  name: string;
  color: string;
};

type ThemePickerProps = {
  size?: "sm" | "md";
};

const OPTIONS: ThemeOption[] = [
  { name: "familyWarm", color: "#C86B53" },
  { name: "sage", color: "#6BA08A" },
  { name: "ocean", color: "#6AA7C4" },
  { name: "rose", color: "#D99AA5" },
  { name: "lavender", color: "#B2A5D8" },
  { name: "sand", color: "#C9B79A" }
];

export default function ThemePicker({ size = "sm" }: ThemePickerProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [theme, setTheme] = useState<string | null>(null);
  const [wheelColor, setWheelColor] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let saved = localStorage.getItem("theme");
    if (!saved || !OPTIONS.some(o => o.name === saved)) {
      saved = "sage";
      localStorage.setItem("theme", saved);
    }
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    const match = OPTIONS.find((o) => o.name === saved);
    if (match) setWheelColor(match.color);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const anyOpen = document.querySelector("dialog.modal.modal-open") != null;
      setModalOpen(anyOpen);
      if (anyOpen) {
        setOpen(false);
        setClosing(false);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open", "class"] });
    return () => observer.disconnect();
  }, []);

  function applyTheme(next: ThemeOption) {
    setTheme(next.name);
    document.documentElement.setAttribute("data-theme", next.name);
    localStorage.setItem("theme", next.name);
    setWheelColor(next.color);
    handleClose();
  }

  function onToggle() {
    if (open) handleClose();
    else setOpen(true);
  }

  function handleClose() {
    if (!open) return;
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 140);
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        handleClose();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const sizeClasses = size === "sm" ? "h-7 w-7" : "h-10 w-10";

  const wheelStyle: React.CSSProperties = wheelColor
    ? { backgroundColor: wheelColor }
    : { background: "conic-gradient(from 0deg, #f87171, #fbbf24, #34d399, #60a5fa, #a78bfa, #f472b6, #f87171)" };

  const showPanel = (open || closing) && !modalOpen;
  const panelAnimClass = open && !closing ? "pop-in" : closing ? "pop-out" : "";

  return (
    <div className="relative" ref={containerRef} style={{ opacity: modalOpen ? 0 : 1, pointerEvents: modalOpen ? "none" : "auto" }}>
      <button
        type="button"
        aria-label="Choose theme"
        onClick={onToggle}
        className={`${sizeClasses} rounded-full border border-white/60 shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-lg transition focus-ring sphere-3d`}
        style={wheelStyle}
      />

      {showPanel && (
        <div className={`absolute right-0 mt-2 p-3 glass-liquid z-50 min-w-[220px] ${panelAnimClass}`}>
          <div className="text-xs uppercase tracking-wide text-neutral/70 mb-2">Theme</div>
          <div className="grid grid-cols-8 gap-2">
            {OPTIONS.map((opt) => {
              const selected = theme === opt.name;
              return (
                <button
                  key={opt.name}
                  type="button"
                  aria-label={opt.name}
                  title={opt.name}
                  onClick={() => applyTheme(opt)}
                  className={`h-7 w-7 rounded-full border sphere-3d ${selected ? "ring-2 ring-white shadow-[0_0_0_4px_rgba(255,255,255,0.35)]" : "border-white/60"}`}
                  style={{ backgroundColor: opt.color }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 