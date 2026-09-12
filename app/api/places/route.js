import { NextResponse } from "next/server";

const places = [
  { id: "dr-patel", type: "doctor", name: "Dr. Maya Patel", specialty: "General Physician", rating: 4.9, reviews: 214, distance: 0.8, address: "18 Park Street", availability: "Today, 4:30 PM", fee: 600, image: "👩🏽‍⚕️", verified: true, lat: 22.573, lng: 88.362 },
  { id: "dr-khan", type: "doctor", name: "Dr. Arjun Khan", specialty: "Cardiologist", rating: 4.8, reviews: 186, distance: 1.4, address: "42 Lake Road", availability: "Tomorrow, 10:00 AM", fee: 900, image: "👨🏽‍⚕️", verified: true, lat: 22.578, lng: 88.369 },
  { id: "dr-roy", type: "doctor", name: "Dr. Anika Roy", specialty: "Dermatologist", rating: 4.7, reviews: 128, distance: 2.1, address: "9 Health Avenue", availability: "Today, 6:15 PM", fee: 750, image: "👩🏻‍⚕️", verified: true, lat: 22.564, lng: 88.353 },
  { id: "wellcare", type: "pharmacy", name: "WellCare Pharmacy", specialty: "Pharmacy · Delivery available", rating: 4.8, reviews: 304, distance: 0.5, address: "4 Market Lane", availability: "Open until 11:00 PM", fee: null, image: "💊", verified: true, lat: 22.57, lng: 88.358 },
  { id: "medplus", type: "pharmacy", name: "MedPlus Express", specialty: "Pharmacy · Prescription refill", rating: 4.6, reviews: 92, distance: 1.1, address: "77 Central Road", availability: "Open 24 hours", fee: null, image: "🏪", verified: true, lat: 22.582, lng: 88.375 },
  { id: "dr-mehta", type: "doctor", name: "Dr. Rohan Mehta", specialty: "Pediatrician", rating: 4.9, reviews: 176, distance: 3.2, address: "25 Green View", availability: "Tomorrow, 12:30 PM", fee: 800, image: "👨🏻‍⚕️", verified: true, lat: 22.55, lng: 88.348 },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").toLowerCase().trim();
  const type = searchParams.get("type") || "all";
  const lat = Number(searchParams.get("lat")); const lng = Number(searchParams.get("lng"));
  const results = places.map((place) => ({ ...place, distance: Number.isFinite(lat) && Number.isFinite(lng) ? haversine(lat, lng, place.lat, place.lng) : place.distance })).filter((place) => (type === "all" || place.type === type) && (!query || `${place.name} ${place.specialty} ${place.address}`.toLowerCase().includes(query))).sort((a, b) => a.distance - b.distance);
  return NextResponse.json({ places: results, total: results.length });
}

function haversine(lat1, lng1, lat2, lng2) { const radians = (value) => value * Math.PI / 180; const dLat = radians(lat2 - lat1); const dLng = radians(lng2 - lng1); const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dLng / 2) ** 2; return Number((6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1)); }
