import { ButtonProps } from "@/utils/interfaces";
import { Spinner } from "./spinner";

export function Button(props: ButtonProps) {
	return (
		<button
			type={props.type}
			className="w-full flex justify-center items-center p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 bg-primary"
			disabled={props.isLoading}
		>
			{props.isLoading ? (
				<>
					<Spinner />
					<span className="ml-2">{props.loadingText}</span>
				</>
			) : (
				`${props.label}`
			)}
		</button>
	);
}
