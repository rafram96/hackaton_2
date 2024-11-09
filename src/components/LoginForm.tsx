import type { LoginRequest } from  "../interfaces/auth/LoginRequest";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function LoginForm() {
	
	const [formData, setFormData] = useState<LoginRequest>({
		username: "",
		password: "",
	});


	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prevData:LoginRequest) => ({
			...prevData,
			[name]: value,
		}));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setSuccessMessage("Login successful!");
		} catch {
			setError("Login failed. Please try again.");
			setSuccessMessage(null);
		}
	}

	return (
		<section className="login-section bg-secondary p-4 rounded-2xl">
			<h1 className="title">Ingresar a Amazon black box</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Nombre de usuario</label>
					<input
						type="text"
						name="username"
						id="username"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Contraseña</label>
					<input
						type="text"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<button
					id="loginSubmit"
					className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
					type="submit"
				>
					Iniciar Sesión
				</button>
			</form>
			{error && <div style={{ color: "red" }}>{error}</div>}
			{successMessage && <div style={{ color: "blue" }}>{successMessage}</div>}
		</section>
	);
}
