import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		role: "",
	});
	const [error, setError] = useState<string | null>(null);
  	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
    	setSuccessMessage(null);

    	try {
			const response = await axios.post(
				"https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/auth/register",
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 201) {
				console.log("Exito");
				setSuccessMessage("¡Registro exitoso!");
			}
		} catch (err: any) {
			if (err.response) {
				if (err.response.status === 400) {
					setError("Campos faltantes o inválidos.");
				} else if (err.response.status === 403) {
					setError("No autorizado.");
				} else {
					setError("Error del servidor. Por favor, inténtalo más tarde.");
				}
			} else {
				setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
			}
		}
	}

	return (
		<section className="login-section bg-secondary p-4 rounded-2xl">
			<h1 className="text-2xl font-bold">Registrarse a Amazon BlackBox</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Nombre de usuario</label>
					<input
						type="text"
						name="username"
						id="username"
						value={formData.username}
						onChange={handleChange}
						required
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
						required
					/>
				</div>
				<div>
					<label htmlFor="Role">rol</label>
					<input
						type="text"
						name="role"
						id="role"
						value={formData.role}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					id="registerSubmit"
					className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
					type="submit"
				>
					Registrarse
				</button>
				{error && <div style={{ color: "red" }}>{error}</div>}
        		{successMessage && <div style={{ color: "blue" }}>{successMessage}</div>}
			</form>
			</section>
	);
}
