"use client";

import { Menu, Stethoscope } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Find care", href: "/#find-care" },
  { label: "Healthy routine", href: "/routine" },
  { label: "Research & news", href: "/research" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl"><div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"><a href="/#top" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-teal-300"><Stethoscope size={20}/></span>medi<span className="text-teal-500">co</span></a><nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex">{links.map((link) => <a key={link.label} href={link.href} className="transition hover:text-slate-950">{link.label}</a>)}</nav><a href="/#find-care" className="hidden rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-700 sm:block">Find care</a><button onClick={() => setOpen(!open)} aria-label="Open menu" className="rounded-lg p-2 lg:hidden"><Menu /></button></div>{open && <div className="border-t bg-white px-5 py-4 lg:hidden">{links.map((link) => <a onClick={() => setOpen(false)} key={link.label} href={link.href} className="block py-2 font-semibold">{link.label}</a>)}</div>}</header>;
}
