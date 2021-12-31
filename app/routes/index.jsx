import { Link } from "remix";
export default function Index() {
  return (
    <main>
      <h1>Spirographs</h1>
      <ul>
        <li><Link to="/spirograph?7,3">7/3 star</Link></li>
        <li><Link to="/spirograph?7,2">7/2 star</Link></li>
        <li><Link to="/spirograph?10,3">10/3 star</Link></li>
        <li><Link to="/spirograph?5,2">5/2 star</Link></li>
        <li><Link to="/spirograph">Create your own</Link></li>
      </ul>
    </main>
  );
}
