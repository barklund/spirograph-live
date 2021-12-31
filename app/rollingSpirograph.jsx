import { useState, useEffect } from 'react';
const range = n => Array.from(Array(n)).map((v,k) => k);

const RADIUS = 1;
const PADDING = .1;
const OFFSET = 0.8;
const STEPS = 2000;

function RollingSpirograph({
	size = 500,
	points = 7,
	skips = 3,
  showStar,
  showDots,
  showBoundary,
  showCircles,
  showPrimary,
  showSecondary,
  speed,
}) {
	const [time, setTime] = useState(0);
	useEffect(() => {
		let request;
		const update = () => {
			setTime(t => t - speed);
			request = requestAnimationFrame(update);
		}
		request = requestAnimationFrame(update);
		return () => cancelAnimationFrame(request);
	}, [speed])

  const center = [RADIUS+PADDING,RADIUS+PADDING];

  const smallCircleRadius = 1/skips;
  const smallCircleCount = points - skips;

  const dtime = STEPS / smallCircleCount;

  const angleFactor = skips - 1;

  const circles = range(smallCircleCount).map(i => {
  	const radius = 1 - smallCircleRadius;
  	const angle = (dtime * i + time) / STEPS * 2 * Math.PI;
  	const [cx,cy] = center;
  	const o = [cx + radius*Math.cos(angle), cy + radius*Math.sin(angle)];
  	const a = -angleFactor * angle;
  	const p = range(skips).map(j => {
  		const rad = smallCircleRadius * OFFSET;
  		const ang = j/skips*2*Math.PI;
			return [rad*Math.cos(ang), rad*Math.sin(ang)];
  	});
  	return {a, o, p};
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${center[0]*2} ${center[1]*2}`}>
    	{showBoundary && <circle r="1" cx={center[0]} cy={center[1]} stroke="red" strokeWidth="0.005" fill="transparent"/>}
    	{circles.map(({a, o: [x,y], p}) => (
    		<g transform={`translate(${x},${y}) rotate(${a*180/Math.PI} 0 0)`}>
	    		<circle r={smallCircleRadius} cx="0" cy="0" fill={showCircles ? '#eee' : 'transparent'} />
	    		{p.map(([px,py], i) => <circle key={i} r="0.02" cx={px} cy={py} fill={showDots ? 'yellow' : 'transparent'} />)}
	    	</g>
    	))}
    </svg>
  );
}

export default RollingSpirograph;
