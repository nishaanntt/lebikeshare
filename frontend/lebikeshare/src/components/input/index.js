import { InputWrapper, TextInput } from './input.styles';

const Input = ({
	placeholder,
	onChangeText,
	secureTextEntry = false,
	value = '',
	autoCapitalize = 'sentences',
	editable = true,
	onPressIn,
}) => {
	return (
		<InputWrapper>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor='#4f6d7a'
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				value={value}
				autoCapitalize={autoCapitalize}
				editable={editable}
				onPressIn={onPressIn}
			/>
		</InputWrapper>
	);
};

export default Input;
