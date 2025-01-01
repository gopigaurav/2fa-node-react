import API from './api';

export const register = async (username, password) => {
  return await API.post('/auth/register', { username, password });
};

export const loginUser = async (username, password) => {
  return await API.post('/auth/login', { username, password }, {
    withCredentials: true
  });
};

export const logoutUser = async () => {
  return await API.post('/auth/logout', {}, {
    withCredentials: true
  });
};

export const setup2FA = async () => {
  return await API.post(`/auth/2fa/setup`, { }, {withCredentials: true});
};

export const verify2FA = async (token) => {
  return await API.post(`/auth/2fa/verify`, { token }, {withCredentials: true});
};

export const reset2FA = async () => {
  return await API.post(`/auth/2fa/reset`, { }, {withCredentials: true});
};


export const authStatus = async () => {
  return await API.get(`/auth/status`, {withCredentials: true});
};
