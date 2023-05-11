import { Containter } from "./styles";

export function Tag({ title, ...rest }) {
	return (
		<Containter {...rest}>
			{title}
		</Containter>
	)
}