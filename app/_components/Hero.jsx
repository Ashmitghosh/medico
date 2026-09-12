import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Star } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="mesh overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-4 py-2 text-sm font-bold text-teal-700"><ShieldCheck size={17}/> Trusted local care, made simple</div>
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.03] tracking-tight text-slate-900 sm:text-6xl">The right care is <span className="text-teal-500">closer</span> than you think.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">Discover verified doctors and open pharmacies around you. Compare, book, and get back to feeling like yourself.</p>
          <a href="#find-care" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-4 font-bold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-1">Explore care near me <ArrowRight size={18}/></a>
          <div className="mt-10 flex gap-7 text-sm text-slate-600"><span className="flex items-center gap-2"><CheckCircle2 className="text-teal-500" size={18}/> Verified providers</span><span className="flex items-center gap-2"><CheckCircle2 className="text-teal-500" size={18}/> Simple booking</span></div>
        </div>
        <div className="scene relative mx-auto h-[450px] w-full max-w-[540px]">
          <div className="orb orb-teal absolute -left-5 top-12 h-24 w-24 opacity-90" />
          <div className="orb orb-indigo absolute -right-5 bottom-7 h-20 w-20 opacity-90" />
          <div className="absolute inset-5 rounded-[2.5rem] bg-gradient-to-br from-teal-300 to-indigo-300 opacity-70 blur-2xl" />
          <div className="scene-card absolute inset-3 rounded-[2.5rem] bg-slate-900 p-5 lift"><div className="h-full rounded-[2rem] bg-[linear-gradient(135deg,#d7fff3,#dce6ff)] p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Your care map</p><p className="mt-1 text-xl font-extrabold">Around your location</p></div><div className="rounded-full bg-white p-3 text-teal-600 shadow"><MapPin /></div></div><div className="relative mt-10 h-52 overflow-hidden rounded-3xl border border-white/70 bg-[#b9d8e9]" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, #80d3b9 0 12%, transparent 13%), radial-gradient(circle at 75% 28%, #8cb8eb 0 18%, transparent 19%), linear-gradient(35deg, transparent 45%, rgba(255,255,255,.7) 46% 48%, transparent 49%), linear-gradient(-65deg, transparent 48%, rgba(255,255,255,.7) 49% 51%, transparent 52%)" }}><span className="absolute left-[22%] top-[27%] grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-lg shadow-xl">🩺</span><span className="absolute bottom-[15%] right-[19%] grid h-12 w-12 place-items-center rounded-2xl bg-white text-lg shadow-xl">💊</span><span className="absolute right-[37%] top-[46%] h-5 w-5 rounded-full border-4 border-white bg-teal-500 shadow" /></div><div className="float-one absolute -bottom-4 -left-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-100">👩🏽‍⚕️</div><div><p className="text-sm font-extrabold">Dr. Maya Patel</p><p className="flex items-center gap-1 text-xs text-amber-500"><Star size={13} fill="currentColor"/> 4.9 · 0.8 km away</p></div></div></div><div className="float-two absolute -right-3 top-28 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur"><p className="text-xs text-slate-500">Pharmacies open now</p><p className="font-extrabold text-teal-600">12 nearby</p></div></div></div>
        </div>
      </div>
    </section>
  );
}
