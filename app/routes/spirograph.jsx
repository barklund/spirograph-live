import { useState } from 'react';

export default function SpirographGenerator() {
  const [points, setPoints] = useState(7);
  const [skips, setSkips] = useState(3);
  const update = (setter) => (evt) => setter(evt.target.valueAsNumber);
  return (
    <main>
      <h1>Create new Spirograph: {points}/{skips} star</h1>
      <form action={`${points},${skips}`}>
        <label>
          Points:
          <input value={points} type="range" min="3" max="21" onChange={update(setPoints)} />
        </label>
        <label>
          Skips:
          <input value={skips} type="range" min="2" max="7" onChange={update(setSkips)} />
        </label>
        <button>Generate</button>
      </form>
    </main>
  );
}
