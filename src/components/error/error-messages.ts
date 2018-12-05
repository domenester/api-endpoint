export const login = {
  unauthorized: "Apenas usuários do perfil “Administrador” ou “Relatórios” devem ser permitidos o acesso ao sistema",
};

export const changePassword = {
  unauthorized: "Credenciais inválidas",
};

export const requestPassword = {
  emailNotFound: "Email não encontrado",
};

export const resetPassword = {
  invalidToken: "Token inválido",
  expiredToken: "Token expirado"
};

export default {
  changePassword,
  login,
  requestPassword,
};
