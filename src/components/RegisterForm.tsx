import { ChangeEvent, FormEvent } from "react";

interface RegisterFormProps {
	
}

import { useState } from "react";

export default function RegisterForm(props: RegisterFormProps) {
	const [formData, setFormData] = useState({
		username: "",
		passsword: "",
		rol: "",
	});

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
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
						value={formData.passsword}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="role">rol</label>
					<input
						type="role"
						name="role"
						id="role"
						value={formData.rol}
						onChange={handleChange}
					/>
				</div>
				<button
					id="registerSubmit"
					className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
					type="submit"
				>
					Registrarse
				</button>
			</form>
			</section>
	);
}
