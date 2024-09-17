const query = `
query {
  football{
    allCards{
      nodes{
        age
      }
    }
  }
}
  `;

export default async function Home() {
  const response = await fetch("https://api.sorare.com/federation/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const { data } = await response.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {JSON.stringify(data)}
    </div>
  );
}
