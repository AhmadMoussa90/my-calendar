type Query = {
  query: String;
  variables?: Object;
};

type ResData = {
  errors?: [Error];
  data?: any;
};

export async function fetchData(request: Query): Promise<ResData> {
  const graphqlQuery = {
    query: request.query,
    variables: request.variables,
  };

  const res = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });

  return res.json();
}
