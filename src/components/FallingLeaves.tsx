import { useEffect, useState } from "react";

export const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<Array<{ id: number; duration: number; delay: number; side: 'left' | 'right' }>>([]);

  useEffect(() => {
    const leafEmojis = ["🍃", "🍂", "🍁"];
    const newLeaves = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      duration: Math.random() * (15 - 8) + 8, // 8-15 seconds
      delay: Math.random() * 5, // 0-5 seconds delay
      side: 'right' as 'left' | 'right',
    }));
    setLeaves(newLeaves);

    // Add new leaves periodically
    const interval = setInterval(() => {
      setLeaves((prev) => [
        ...prev.filter((l) => l.id < Date.now() - 20000),
        {
          id: Date.now(),
          duration: Math.random() * (15 - 8) + 8,
          delay: 0,
          side: 'right',
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const leafEmojis = ["🍃", "🍂", "🍁"];

  return (
    <>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={`falling-leaf ${leaf.side === 'left' ? 'leaf-left' : 'leaf-right'}`}
          style={{
            '--duration': `${leaf.duration}s`,
            '--delay': `${leaf.delay}s`,
            animation: `fall-leaves ${leaf.duration}s linear ${leaf.delay}s infinite`,
          } as React.CSSProperties}
        >
          {leafEmojis[Math.floor(Math.random() * leafEmojis.length)]}
        </div>
      ))}
    </>
  );
};
