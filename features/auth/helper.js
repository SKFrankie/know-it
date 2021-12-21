const storeToken = (token) => {
  localStorage.setItem("token", token);
  location.reload();
}

export {storeToken}