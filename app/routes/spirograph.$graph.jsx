import { useLoaderData } from "remix";

export const loader = async ({ params }) => {
  return params.graph.split(',').map(Number);
};

export default function Spirograph() {
  const [points, skips] = useLoaderData();
  return (
    <main>
      <h1>{points}/{skips} Star</h1>
    </main>
  );
}
