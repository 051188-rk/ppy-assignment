export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const r = searchParams.get("range") || "3d";
  
    const mult = { "3d": 1, "7d": 2.2, "10d": 3.1, "30d": 6.5 }[r];
  
    const to = (c, a) => ({ count: Math.round(c * mult), amount: (a * mult).toFixed(2) });
  
    return Response.json({
      purchases: to(0, 0),
      redemptions: to(0, 0),
      rejected: to(0, 0),
      sipRej: to(0, 0),
      newSip: to(0, 0),
    });
  }
  