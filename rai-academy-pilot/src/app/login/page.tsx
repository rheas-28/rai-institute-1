import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4">
      <h1 className="text-2xl font-bold text-brand">Sign in to RAI Academy Pilot</h1>
      {error && (
        <p role="alert" className="text-danger">
          That sign-in link is invalid or has expired. Request a new one.
        </p>
      )}
      <LoginForm />
    </main>
  );
}
