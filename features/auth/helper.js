import { useRouter } from "next/router";
const storeToken = (token) => {
  localStorage.setItem("token", token);
  router.push("/");
};

export { storeToken };
