import ClientOnly from "../features/ClientOnly";
import Signup from "../features/Signup.js";

export default function SignupPage() {
  return (
    <ClientOnly>
      <Signup />
    </ClientOnly>
  );
}
