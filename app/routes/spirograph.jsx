import { Fragment, useState, useEffect } from 'react';
import RollingSpirograph from '~/rollingSpirograph';

export default function Spirograph() {
  const [isLive,setLive] = useState(false);
  const [initialPoints,initialSkips] = typeof window !== 'undefined' && window?.location.search?.slice(1).split(',').map(Number) || [7, 3];
  const [showStar, setShowStar] = useState(true);
  const [showDots, setShowDots] = useState(true);
  const [showBoundary, setShowBooundary] = useState(true);
  const [showCircles, setShowCircles] = useState(true);
  const [showPrimary, setShowPrimary] = useState(true);
  const [showSecondary, setShowSecondary] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [points, setPoints] = useState(initialPoints || 7);
  const maxSkips = Math.floor((points-1)/2);
  const [skips, setSkips] = useState(Math.min(initialSkips || 3, maxSkips));
  useEffect(() => {
    if (skips > maxSkips) {
      setSkips(maxSkips);
    }
  }, [skips, maxSkips]);
  useEffect(() => setLive(true), []);
  if (!isLive) {
    return null;
  }
  const bools = [
    {label: 'Show star', value: showStar, setter: setShowStar},
    {label: 'Show dots', value: showDots, setter: setShowDots},
    {label: 'Show boundary', value: showBoundary, setter: setShowBooundary},
    {label: 'Show circles', value: showCircles, setter: setShowCircles},
    {label: 'Show primary polygons', value: showPrimary, setter: setShowPrimary},
    {label: 'Show secondary polygons', value: showSecondary, setter: setShowSecondary},
  ];
  const ranges = [
    {label: 'Points', value: points, setter: setPoints, min: 5, max: 29, step: 2},
    {label: 'Skips', value: skips, setter: setSkips, min: 2, max: maxSkips},
    {label: 'Speed', value: speed, setter: setSpeed, min: 0, max: 10},
  ];
  const props = {
    points,
    skips,
    showStar,
    showDots,
    showBoundary,
    showCircles,
    showPrimary,
    showSecondary,
    speed,
  };
  return (
    <main>
      <h1>{points}/{skips} Star</h1>
      <section style={{display: 'flex'}}>
        <aside style={{border: '1px solid black', padding: '6px'}}>
          {bools.map(({label, value, setter}) => (
            <Fragment key={label}>
              <label>
                <input type="checkbox" checked={value} onChange={(evt) => setter(evt.target.checked)} />
                {label}
              </label>
              <br />
            </Fragment>
          ))}
          {ranges.map(({label, value, setter, ...attrs}) => (
            <Fragment key={label}>
              <label>
                {label}:
                <input type="range" {...attrs} value={value} onChange={(evt) => setter(evt.target.valueAsNumber)} />
              </label>
              <br />
            </Fragment>
          ))}
        </aside>
        <RollingSpirograph {...props} />
      </section>
    </main>
  );
}
