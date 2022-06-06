import { useRouter } from "next/router";

const Resetpassword = () => {
  const router = useRouter();
  const { token } = router.query;
  console.log("token", token)

  return <div>Resetpassword</div>;
};

export default Resetpassword;
