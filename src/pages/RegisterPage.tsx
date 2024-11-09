import Button from "../components/Button";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
	return (
		<main className="px-10">
			<section className="flex justify-center items-center py-4">
				<Button message="Iniciar Sesión" to="/auth/login" />
				<Button message="Registrarse" to="/auth/register" />
			</section>
			<article className="flex justify-center items-center py-8">
				<RegisterForm />
			</article>
		</main>
	);
}
