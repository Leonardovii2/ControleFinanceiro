import RegisterView from "./Register.view";
import useRegister from "./useRegister";

export default function Register() {
  const register = useRegister();
  return <RegisterView {...register} />;
}
