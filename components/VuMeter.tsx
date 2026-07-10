const HEIGHTS = [40, 65, 90, 55, 75, 100, 60, 85, 45, 70];
const DELAYS = [0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.08, 0.18, 0.03, 0.22];

export default function VuMeter() {
  return (
    <div className="flex h-32 items-end gap-1.5" aria-hidden="true">
      {HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="vu-bar w-3 rounded-t-sm sm:w-4"
          style={{
            height: `${h}%`,
            background: i % 3 === 0 ? '#FF6A3D' : '#F2A93B',
            animationDelay: `${DELAYS[i]}s`,
          }}
        />
      ))}
    </div>
  );
}
