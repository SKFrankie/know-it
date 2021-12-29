const storeToken = (token, router) => {
  localStorage.setItem("token", token);
  redirect(router, "/");
};

const redirect = async (router, route) => {
  await router.push(route);
  router.reload();
};

const logout = (router) => {
  localStorage.removeItem("token");
  router.reload();
};

export { storeToken, redirect, logout };
