import useLogin from "@/hooks/useLogin";
import SignIn from '@/pages/auth/sign-in';

export default function LoginContainer() {
  const { handleSubmit, error, isLoading } = useLogin();
  return (
    <SignIn onSubmit={handleSubmit} error={error} isLoading={isLoading} />
  );
}