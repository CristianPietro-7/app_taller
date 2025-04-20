
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
  
  
    if (!token) return false;
  
    try {
      // Decodificamos el token sin verificar firma, solo para ver si expiró
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
  
      return !isExpired;
    } catch (err) {
        console.log(err)
      return false;
    }
  };
  
  export const getUserRole = () => {
    return localStorage.getItem('rol');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
  };
  