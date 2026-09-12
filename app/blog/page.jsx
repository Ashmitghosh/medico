import Header from "../_components/Header";
import Footer from "../_components/Footer";
import ArticleCard from "../_components/ArticleCard";
import { articles } from "@/lib/content";

export const metadata = { title: "Health & wellness blog | Medico" };
export default function BlogPage() { return <><Header /><main className="mesh min-h-screen px-5 py-16 sm:px-8"><div className="mx-auto max-w-7xl"><p className="font-bold uppercase tracking-[.2em] text-teal-600">Medico journal</p><h1 className="mt-3 max-w-2xl text-5xl font-extrabold tracking-tight text-slate-900">Health knowledge for everyday life.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Practical healthy-lifestyle guidance, medicine explainers, and research news—written to be clear, not alarming.</p><div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{articles.map((article) => <ArticleCard key={article.slug} article={article}/>)}</div></div></main><Footer /></>; }
