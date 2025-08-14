export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const r = searchParams.get("range") || "3d";
    const base = { "3d": 12.19, "7d": 12.05, "10d": 11.9, "30d": 11.5 }[r];
    const mom = { "3d": 0.77, "7d": 0.6, "10d": 0.4, "30d": -0.2 }[r];
    return Response.json({ value: base, mom });
  }
  