import type { LoginRequest } from  "../interfaces/auth/LoginRequest";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";  

export default function LoginForm() {
	
	const [formData, setFormData] = useState<LoginRequest>({
		username: "",
		password: "",
	});


	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate();

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
	
			const response = await axios.post("https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/auth/login", formData);
			if (response.status === 200) {
                console.log("Exito");
				setSuccessMessage("¡Inicio de sesión exitoso!");
                navigate("/dashboard");
			}
		} catch (err: any) {
			if (err.response) {
				if (err.response.status === 401) {
					setError("Credenciales incorrectas. Inténtalo de nuevo.");
				} else {
					setError("Error en el servidor. Por favor, inténtalo más tarde.");
				}
			} else {
				setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
			}
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
