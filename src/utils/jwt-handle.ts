export default (message: string): string => {
  switch (message) {
    case "jwt malformed":
      return "Token inválido";
    case "jwt expired":
      return "Token expirado";
    default :
      return "Token inválido";
  }
}