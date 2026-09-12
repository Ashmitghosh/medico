export default function Footer() {
  return <footer className="bg-slate-950 px-5 py-12 text-slate-300 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row"><p className="font-bold text-white">medico <span className="font-normal text-slate-500">— care, closer to you.</span></p><p className="text-sm text-slate-500">© {new Date().getFullYear()} Medico. Demo healthcare directory.</p></div></footer>;
}
