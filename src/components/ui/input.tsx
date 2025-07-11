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
				className="w-full p-3 rounded-lg outline-none border border-light/25 bg-gray-800 focus:border-accent"
				onChange={props.onChange}
				value={props.value}
				autoComplete={props.autoComplete}
				required={props.required}
			/>
		</div>
	);
}
