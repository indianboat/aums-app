export default async function getStudents() {
  const res = await fetch("https://aums.vercel.app/api/students", { cache:"no-cache" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  return res.json();
}