import { InputProps } from "@/utils/interfaces";

export function Input(props: InputProps) {
	return (
		<div className={props.className}>
			{props.label && (
				<label htmlFor={props.id} className="block font-medium mb-1">
					{props.label}
				</label>
			)}
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				className="w-full p-3 rounded-lg outline-none border border-white/14 bg-gray-800 focus:border-primary"
				onChange={props.onChange}
				value={props.value}
				autoComplete={props.autocomplete}
				required={props.required}
			/>
		</div>
	);
}
