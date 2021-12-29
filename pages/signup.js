import ClientOnly from "../features/ClientOnly";
import Signup from "../features/Signup.js";
import Title from "../ui/Title";

export default function SignupPage() {
  return (
    <ClientOnly>
      <Title />
      <Signup />
    </ClientOnly>
  );
}
