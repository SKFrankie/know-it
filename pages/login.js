import ClientOnly from "../features/ClientOnly";
import Login from "../features/Login.js";
import Title from "../ui/Title";

export default function LoginPage() {
  return (
    <ClientOnly>
      <Title/>
      <Login />
    </ClientOnly>
  );
}
