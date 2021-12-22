const storeToken = (token, router) => {
  localStorage.setItem("token", token);
  router.push("/");
};

export { storeToken };
