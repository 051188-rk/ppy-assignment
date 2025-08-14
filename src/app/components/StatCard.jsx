export default function StatCard({ icon, title, count = 0, amount = "0.00 INR", loading }) {
    if (loading) return <div className="card p-4 skeleton h-28" />;
  
    return (
      <div className="card p-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={icon} alt={title} className="w-12 h-12 object-contain" />
          </div>
          <div>
            <div className="text-sm opacity-70">{title}</div>
            <div className="text-xl font-semibold">{count}</div>
            <div className="text-xs opacity-60">{amount}</div>
          </div>
        </div>
      </div>
    );
  }
  