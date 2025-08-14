export const dynamic = 'force-dynamic';

export async function GET() {
    // You’re rendering a static bubble chart; keep here if you later want counts
    return Response.json({ online: 60, active: 3824, new: 541, inactive: 2 });
  }
  