export default async function getStudents() {
  const res = await fetch('https://aums.vercel.app/api/admin/student', { cache:"force-cache" })
  return res.json();
}