import { useState, useEffect, useMemo } from 'react';
const range = n => Array.from(Array(n)).map((v,k) => k);

const RADIUS = 1;
const PADDING = .1;
const OFFSET = 0.8;
const STEPS = 5000;

function calculatePoint(time, dtime, smallCircleRadius, skips, i, j, center, angleFactor, points) {
  const radius = 1 - smallCircleRadius;
  	const angle = (dtime * i + time) / STEPS * skips * 2 * Math.PI;
	const [cx,cy] = center;
	const origin = [cx + radius*Math.cos(angle), cy + radius*Math.sin(angle)];
 	const circleAngle = - (time / STEPS * (points-skips) * 2 * Math.PI);
	const rad = smallCircleRadius * OFFSET;
	const ang = j/skips*2*Math.PI + circleAngle;
	return [origin[0] + rad*Math.cos(ang), origin[1] + rad*Math.sin(ang)];
}

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

  const smallCircleRadius = skips / points;
  const smallCircleCount = points - skips;

  const dtime = STEPS / smallCircleCount;

  const angleFactor = skips - 1;

  const circles = useMemo(() => range(smallCircleCount).map(i => {
  	const radius = 1 - smallCircleRadius;
  	const angle = (dtime * i + time) / STEPS * skips * 2 * Math.PI;
  	const [cx,cy] = center;
  	const origin = [cx + radius*Math.cos(angle), cy + radius*Math.sin(angle)];
  	const list = range(skips).map(j =>
  		calculatePoint(time, dtime, smallCircleRadius, skips, i, j, center, angleFactor, points)
  	);
  	return {origin, points: list};
  }), [smallCircleRadius, angleFactor, skips, dtime, time, points]);

  const star = useMemo(() => range(STEPS).map(i => 
  	calculatePoint(-i, dtime, smallCircleRadius, skips, 0, 0, center, angleFactor, points)
  ), [smallCircleRadius, angleFactor, skips, dtime, points]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${center[0]*2} ${center[1]*2}`}>
    	{showBoundary &&
    		<circle r="1" cx={center[0]} cy={center[1]} stroke="red" strokeWidth="0.005" fill="transparent"/>
    	}
    	{showCircles && circles.map(({origin: [x,y]}, i) => (
    		<circle key={'b'+i} r={smallCircleRadius} cx={x} cy={y} fill='#eee' />
    	))}
    	{showStar &&
    		<path d={`M${star.map(c => c.join(' ')).join('L')}Z`} stroke="darkgray" strokeWidth="0.02" fill="transparent"/>
    	}
    	{showPrimary && circles.map(({points}, i) => (
    		<path key={'c'+i} d={`M${points.map(c => c.join(' ')).join('L')}Z`} fill="transparent" stroke="blue" strokeWidth="0.01" />
			))}
    	{showSecondary && range(skips).map(i => (
    		<path key={'a'+i} d={`M${range(smallCircleCount)
    			.map(i => circles[i]) /* TODO: Fix this index to correctly find the next circle around the circle */
    			.map(({points}) => points[i])
    			.map(c => c.join(' '))
    			.join('L')}Z`} fill="transparent" stroke="darkgreen" strokeWidth="0.01" />
			))}
    	{showDots && circles.map(({points}) => points).flat().map(([x,y],i) => (
    		<circle key={i} r="0.02" cx={x} cy={y} fill="orange" />
			))}
    </svg>
  );
}

export default RollingSpirograph;
