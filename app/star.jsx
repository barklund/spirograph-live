const range = n => Array.from(Array(n)).map((v,k) => k);

const RADIUS = 1;
const PADDING = .1;

function Star({ size = 300, points = 7, skips = 3 }) {
  const center = [RADIUS+PADDING,RADIUS+PADDING];
  const coords = range(points).map(i => {
    const angle = i/points*(2*Math.PI);
    return [center[0]+Math.cos(angle), center[1]+Math.sin(angle)];
  });
  const path = range(points).map(i => coords[(i*skips)%points]);
  const svgPath = `M${path.map(c => c.join(' ')).join('L')}Z`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${center[0]*2} ${center[1]*2}`}>
      <circle r="1" cx={center[0]} cy={center[1]} stroke="red" strokeWidth="0.005" fill="transparent"/>
      {coords.map(([x,y]) => <circle r=".02" cx={x} cy={y} fill="black"/>)}
      <path d={svgPath} stroke="blue" strokeWidth="0.01" fill="transparent"/>
    </svg>
  );
}

export default Star;
