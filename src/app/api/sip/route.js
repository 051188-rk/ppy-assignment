export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const r = searchParams.get("range") || "3d";
    const value = { "3d": 1.39, "7d": 1.22, "10d": 1.1, "30d": 0.95 }[r];
    const mom = { "3d": 0.0, "7d": -1.2, "10d": 0.8, "30d": -2.3 }[r];
    return Response.json({ value, mom });
  }
  