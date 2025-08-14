// src/app/api/monthly-mis/route.js
export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const r = searchParams.get("range") || "3d";
  
    const sets = {
      "3d": { labels: ["Jan","Feb","Mar","Apr","May","Jun"], d1:[0.1,0.25,0.18,0.22,0.5,0.3], d2:[0.05,0.2,0.35,0.28,0.48,0.18], d3:[0.2,0.15,0.1,0.18,0.42,0.26] },
      "7d": { labels: ["Feb","Mar","Apr","May","Jun","Jul"], d1:[0.2,0.18,0.22,0.4,0.35,0.3], d2:[0.1,0.15,0.25,0.3,0.23,0.2], d3:[0.25,0.1,0.16,0.2,0.32,0.28] },
      "10d": { labels: ["Mar","Apr","May","Jun","Jul","Aug"], d1:[0.15,0.22,0.38,0.42,0.36,0.28], d2:[0.12,0.2,0.3,0.26,0.24,0.18], d3:[0.18,0.16,0.22,0.3,0.4,0.2] },
      "30d": { labels: ["Oct","Nov","Dec","Jan","Feb","Mar"], d1:[0.08,0.12,0.18,0.26,0.32,0.28], d2:[0.05,0.1,0.14,0.2,0.24,0.22], d3:[0.1,0.15,0.2,0.18,0.26,0.24] },
    };
  
    return Response.json(sets[r] ?? sets["3d"]);
  }