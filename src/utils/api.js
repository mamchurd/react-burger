const DOMAIN_URL = 'https://norma.nomoreparties.space';
const INGREDIENTS_URL = '/api/ingredients';
const ORDER_URL = '/api/orders';
const PASSWORD_FORGOT_URL = '/api/password-reset';
const PASSWORD_RESET_URL = '/api/password-reset/reset';
const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';
const LOGOUT_URL = '/api/auth/logout';
const REFRESH_TOKEN_URL = '/api/auth/token';
const USER_URL = '/api/auth/user';

async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

export async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

async function refreshToken() {
  const res = await fetch(`${DOMAIN_URL}${REFRESH_TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });

  const refreshData = await checkResponse(res);
  if (!refreshData.success) {
    return Promise.reject(refreshData);
  }
  localStorage.setItem('refreshToken', refreshData.refreshToken);
  localStorage.setItem('accessToken', refreshData.accessToken);
  return refreshData;
}

function checkResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function dataLoad() {
  return request(`${DOMAIN_URL}${INGREDIENTS_URL}`);
}

function createOrder(ingredients) {
  return request(`${DOMAIN_URL}${ORDER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: JSON.stringify({ ingredients: ingredients.map((item) => item._id) })
  });
}

async function forgotPassword(form) {
  const res = await request(`${DOMAIN_URL}${PASSWORD_FORGOT_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...form })
  });

  if (res.success) {
    localStorage.setItem('ResetPassword', true);
  }

  return res;
}

async function resetPassword(form) {
  const res = await request(`${DOMAIN_URL}${PASSWORD_RESET_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...form })
  });

  if (res.success) {
    localStorage.removeItem('ResetPassword');
  }

  return res;
}

async function login(form) {
  const res = await request(`${DOMAIN_URL}${LOGIN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...form })
  });

  if (!res.success) {
    return res;
  }

  localStorage.setItem('refreshToken', res.refreshToken);
  localStorage.setItem('accessToken', res.accessToken.replace('Bearer ', ''));

  return res;
}

async function register(form) {
  const res = await request(`${DOMAIN_URL}${REGISTER_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ ...form })
  });

  if (!res.success) {
    return res;
  }

  localStorage.setItem('refreshToken', res.refreshToken);
  localStorage.setItem('accessToken', res.accessToken.replace('Bearer ', ''));

  return res;
}

async function logout() {
  const res = await request(`${DOMAIN_URL}${LOGOUT_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  return res;
}

async function getUser() {
  const res = await fetchWithRefresh(`${DOMAIN_URL}${USER_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
  });

  return res;
}

async function updateUser(form) {
  const res = await fetchWithRefresh(`${DOMAIN_URL}${USER_URL}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: JSON.stringify({ ...form })
  });

  return res;
}

export const api = {
  login,
  resetPassword,
  forgotPassword,
  createOrder,
  dataLoad,
  register,
  logout,
  getUser,
  updateUser
};
