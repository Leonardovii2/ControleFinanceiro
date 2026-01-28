import { useLogin } from "./useLogin";
import LoginView from "./Login.view";

export default function Login() {
  const login = useLogin();
  return <LoginView {...login} />;
}
