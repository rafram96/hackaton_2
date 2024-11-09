import Button from "../components/Button";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
	return (
		<main className="px-10">
			<section className="flex justify-center items-center py-4">
				<Button message="Iniciar Sesión" to="/auth/login" />
				<Button message="Registrarse" to="/auth/register" />
			</section>

			<article className="flex justify-between">
				<LoginForm />
				<section className="login-section flex flex-col items-center p-4 text-center">
					<h2 className="title">Bienvenido de vuelta</h2>
					<p>Inicia sesión para empezar a usar Uber</p>
				</section>
				<section className="w-1/2 flex flex-col items-center p-4 text-center">
					<h2 className="text-2xl font-semibold mb-2">Bienvenido de vuelta</h2>
					<p className="text-gray-600 mb-4">Inicia sesión para empezar a usar Uber</p>
				</section>
			</article>
		</main>
	);
}