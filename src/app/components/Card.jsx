export default function Card({ title, action, children, className = "" }) {
    return (
      <section className={`card p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold opacity-70">{title}</h3>
          {action}
        </div>
        {children}
      </section>
    );
  }
  