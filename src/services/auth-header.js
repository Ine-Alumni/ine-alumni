export default function authHeader() {
    const userInfo = JSON.parse(localStorage.getItem("auth"));

    if(userInfo && userInfo.token){
        return { Authorization: 'Bearer ' + userInfo.token};
    } else {
        return {};
    }
}
export function getUserAuthorities() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.roles || []; // Exemple : ["ROLE_USER"] ou ["ROLE_ADMIN"]
}