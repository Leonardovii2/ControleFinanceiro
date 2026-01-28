import useLogin from "../hooks/useLogin";

export default function getInitials(name) {
  const { nomeLogado } = useLogin();
  if (!name) return "";

  // Remove espaços extras e divide o nome em partes
  const parts = name.trim().split(/\s+/);

  // Se houver apenas um nome, retorna a primeira letra do nome
  if (parts.length === 1) return parts[0][0].toUpperCase();

  // Se houver mais de um nome, retorna as iniciais do primeiro e do último nome
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
