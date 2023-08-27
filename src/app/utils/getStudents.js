export default async function getStudents() {
  const res = await fetch('http://localhost:3000/api/admin/student', { cache:"force-cache" })
  return res.json();
}