import Button from "../components/Button";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
	return (
		<main className="px-10">
			<section className="flex justify-center items-center py-4">
				<Button message="Iniciar Sesión" to="/auth/login" />
				<Button message="Registrarse" to="/auth/register" />
			</section>
      <article className="flex justify-center items-center py-8">
        <LoginForm />
      </article>
		</main>
	);
}