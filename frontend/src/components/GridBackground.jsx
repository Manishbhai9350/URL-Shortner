import { useEffect, useState } from "react";

const GridBackground = () => {
  const [grid, setGrid] = useState({ rows: 0, cols: 0 });
  const Gap = 20

  useEffect(() => {
    const calculateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.ceil(width / Gap) + 2;
      const rows = Math.round(height / Gap) + 2;
      setGrid({ rows, cols });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  return (
    <div className="w-full h-full  absolute top-1/2 left-1/2 -translate-1/2 flex items-center justify-center pointer-events-none inset-0 z-0">
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gap: Gap + 'px',
        }}
      >
        {Array.from({ length: grid.rows * grid.cols }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "9999px",
               boxShadow: "0 0 6px 3px rgba(40, 40, 217, 0.379)",
            }}
            className="bg-blue-500 opacity-20"
          />
        ))}
      </div>
    </div>
  );
};

export default GridBackground;
