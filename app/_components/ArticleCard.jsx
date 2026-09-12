import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

export default function ArticleCard({ article }) {
  return <article className="care-card overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300"><div className={`flex h-40 items-center justify-center bg-gradient-to-br ${article.color} text-6xl`}>{article.emoji}</div><div className="p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-teal-600">{article.category}</p><h2 className="mt-2 text-xl font-extrabold leading-tight text-slate-900">{article.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{article.excerpt}</p><div className="mt-5 flex items-center justify-between"><span className="flex items-center gap-1 text-xs text-slate-500"><Clock3 size={14}/>{article.readTime}</span><Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-teal-600">Read <ArrowUpRight size={16}/></Link></div></div></article>;
}
