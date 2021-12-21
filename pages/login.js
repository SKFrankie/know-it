import ClientOnly from "../features/ClientOnly";
import Login from "../features/Login.js";

export default function LoginPage() {
  return (
    <ClientOnly>
      <Login />
    </ClientOnly>
  );
}
