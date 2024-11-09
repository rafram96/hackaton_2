import { useLocation, useNavigate } from "react-router-dom";

interface ButtonProps {
	message:string;
	to: string;
}

export default function Button(props:ButtonProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const buttonStyle =
		location.pathname === props.to
			? "bg-primary text-white font-bold"
			: "bg-secondary";

	function handleClick() {
		if(props.to){
			navigate(props.to);
		}
	}

	return (
		<button
			className={`${buttonStyle} mx-6 py-2 px-4 rounded-full cursor-pointer hover:bg-opacity-50`}
			onClick={handleClick}
		>
			{props.message}
		</button>
	);
}
