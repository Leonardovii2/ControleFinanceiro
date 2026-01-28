export function checkAndStoreMonth() {
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const storedMonth = localStorage.getItem("mesReplicado");

  if (storedMonth !== currentMonth) {
    localStorage.setItem("mesReplicado", currentMonth);
    return true; // novo mês detectado
  }

  return false; // já replicado
}
