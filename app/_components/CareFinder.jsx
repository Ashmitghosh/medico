"use client";

import { CheckCircle2, Clock3, LocateFixed, MapPin, Search, Star, X } from "lucide-react";
import { useEffect, useState } from "react";

const tabs = [
  { value: "all", label: "All care" },
  { value: "doctor", label: "Doctors" },
  { value: "pharmacy", label: "Pharmacies" },
];

export default function CareFinder() {
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const locationQuery = coords ? `&lat=${coords.latitude}&lng=${coords.longitude}` : "";
    setLoading(true);
    fetch(`/api/places?type=${type}&q=${encodeURIComponent(query)}${locationQuery}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => setPlaces(data.places))
      .catch((error) => { if (error.name !== "AbortError") setPlaces([]); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [type, query, coords]);

  function locate() {
    if (!navigator.geolocation) return setLocation("Location is unavailable in this browser.");
    setLocation("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      ({ coords: position }) => { setCoords(position); setLocation("Using your current location · results sorted by distance"); },
      () => setLocation("Location permission was not granted. Showing nearby demo results."),
      { timeout: 8000 },
    );
  }

  return (
    <>
      <section id="find-care" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-bold uppercase tracking-[.2em] text-teal-600">Find your match</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">Care that fits your day.</h2>
            <p className="mt-4 text-slate-600">Search local doctors or pharmacies and see who is available now.</p>
          </div>
          <div className="glass lift mx-auto mt-10 max-w-4xl rounded-3xl border border-white p-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-4"><Search size={19} className="text-slate-400"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Specialty, doctor, or pharmacy" className="h-14 w-full bg-transparent outline-none placeholder:text-slate-400" /></label>
              <button onClick={locate} className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 font-bold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50"><LocateFixed size={18}/> Use my location</button>
            </div>
            {location && <p className="px-3 pt-3 text-sm text-teal-700">{location}</p>}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4"><div className="flex rounded-xl bg-slate-200/60 p-1">{tabs.map((tab) => <button onClick={() => setType(tab.value)} key={tab.value} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${type === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{tab.label}</button>)}</div><p className="text-sm text-slate-500">{loading ? "Searching…" : `${places.length} trusted options near you`}</p></div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{loading ? [1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse rounded-3xl bg-slate-200" />) : places.map((place) => <PlaceCard key={place.id} place={place} onSelect={setSelected}/>)}</div>
          {!loading && !places.length && <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center text-slate-500">No care providers match that search. Try a specialty or a different term.</div>}
          <section id="how-it-works" className="mt-24 rounded-[2rem] bg-slate-900 px-7 py-12 text-white sm:px-12"><p className="text-sm font-bold uppercase tracking-[.2em] text-teal-300">How it works</p><div className="mt-6 grid gap-8 md:grid-cols-3">{[["01", "Find nearby care", "Search trusted doctors and pharmacies around you."], ["02", "Compare with ease", "Check availability, ratings, distance, and fees."], ["03", "Book in seconds", "Send your request and receive a booking reference."]].map(([number, title, text]) => <div key={number}><p className="text-4xl font-black text-teal-300">{number}</p><h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-2 leading-7 text-slate-400">{text}</p></div>)}</div></section>
        </div>
      </section>
      {selected && <BookingModal place={selected} onClose={() => setSelected(null)} onComplete={(message) => { setSelected(null); setNotice(message); }}/>}
      {notice && <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-2xl">{notice}</div>}
    </>
  );
}

function PlaceCard({ place, onSelect }) {
  return <article className="care-card group rounded-3xl border border-slate-200 bg-white p-5 transition duration-300"><div className="flex items-start justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-100 to-indigo-100 text-2xl">{place.image}</div><span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{place.type === "doctor" ? "Doctor" : "Open pharmacy"}</span></div><div className="mt-5"><div className="flex items-center gap-1"><h3 className="text-lg font-extrabold text-slate-900">{place.name}</h3>{place.verified && <CheckCircle2 size={16} className="fill-teal-500 text-white"/>}</div><p className="mt-1 text-sm text-slate-500">{place.specialty}</p></div><div className="mt-5 flex items-center justify-between border-y border-slate-100 py-3 text-sm"><span className="flex items-center gap-1 font-bold text-amber-500"><Star size={15} fill="currentColor"/> {place.rating} <span className="font-normal text-slate-400">({place.reviews})</span></span><span className="flex items-center gap-1 text-slate-500"><MapPin size={15}/> {place.distance} km</span></div><p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Clock3 size={16} className="text-teal-600"/> {place.availability}</p><button onClick={() => onSelect(place)} className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition group-hover:bg-teal-600">{place.type === "doctor" ? "Book appointment" : "View pharmacy"}</button></article>;
}

function BookingModal({ place, onClose, onComplete }) {
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [sending, setSending] = useState(false); const [error, setError] = useState("");
  async function submit(event) { event.preventDefault(); setSending(true); setError(""); const response = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ providerId: place.id, name, phone }) }); const data = await response.json(); setSending(false); if (!response.ok) return setError(data.error); onComplete(`${data.message} Reference: ${data.confirmation}`); }
  return <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-teal-600">{place.type === "doctor" ? "Appointment request" : "Pharmacy enquiry"}</p><h2 className="mt-1 text-2xl font-extrabold">{place.name}</h2></div><button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 hover:bg-slate-100"><X /></button></div><p className="mt-3 text-sm text-slate-500">{place.availability} · {place.address}</p><label className="mt-6 block text-sm font-bold">Your name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" placeholder="Full name" /></label><label className="mt-4 block text-sm font-bold">Phone number<input required value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500" placeholder="Your contact number" /></label>{error && <p className="mt-3 text-sm text-rose-600">{error}</p>}<button disabled={sending} className="mt-6 w-full rounded-xl bg-teal-500 py-3 font-bold text-slate-950 disabled:opacity-50">{sending ? "Sending…" : "Send request"}</button></form></div>;
}
