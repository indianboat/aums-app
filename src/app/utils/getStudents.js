
export default async function getStudents() {
  const res = await fetch("http://localhost:3000/api/students", { cache:"no-cache" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  return res.json();
}