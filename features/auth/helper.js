const storeToken = (token, router, redirectUrl="/") => {
  localStorage.setItem("token", token);
  redirect(router, redirectUrl);
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
