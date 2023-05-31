import { ButtonLabel, ButtonWrapper } from './button.styles';

const Button = ({
	label = 'Button',
	type = 'fill',
	colour = 'grey',
	disabled = false,
	onPress,
}) => {
	return (
		<ButtonWrapper
			type={type}
			colour={colour}
			disabled={disabled}
			onPress={onPress}>
			<ButtonLabel type={type} colour={colour}>
				{label}
			</ButtonLabel>
		</ButtonWrapper>
	);
};

export default Button;
