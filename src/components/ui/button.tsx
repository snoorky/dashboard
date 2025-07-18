import { Spinner } from "./spinner";

type ButtonProps = {
	isLoading?: boolean;
	label: string;
	loadingText?: string;
	type: "submit" | "reset" | "button";
}

export function Button(props: ButtonProps) {
	return (
		<button
			type={props.type}
			className={`w-full font-medium flex justify-center items-center p-3 rounded-lg disabled:cursor-not-allowed transition-colors duration-200 bg-accent`}
			disabled={props.isLoading}
		>
			{props.isLoading ? (
				<>
					<Spinner />
					<span>{props.loadingText}</span>
				</>
			) : (
				`${props.label}`
			)}
		</button>
	);
}