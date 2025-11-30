for (let i = 1; i <= 5; i++) {
  const res = await fetch(
    "http://localhost:3000/api/drug-tests/results/test123"
  );
  console.log(i, res.status, await res.text());
}
