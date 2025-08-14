export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const r = searchParams.get("range") || "3d";
  
    const sets = {
      "3d": { labels: ["Mar","Apr","May","Jun"], bars: [1.6,0.4,1.1,1.6], line: [120,100,98,110] },
      "7d": { labels: ["Apr","May","Jun","Jul"], bars: [1.2,1.0,1.4,1.8], line: [112,108,115,118] },
      "10d": { labels: ["May","Jun","Jul","Aug"], bars: [0.9,1.3,1.7,1.9], line: [96,104,111,119] },
      "30d": { labels: ["Feb","Mar","Apr","May"], bars: [1.1,1.6,0.6,0.9], line: [105,120,98,100] },
    };
  
    return Response.json(sets[r] ?? sets["3d"]);
  }
  