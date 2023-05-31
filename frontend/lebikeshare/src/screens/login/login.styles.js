import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const LoginWrapper = styled.View``;

export const LogoContainer = styled.View`
	align-items: center;
	margin-bottom: 50px;
`;

export const Logo = styled.Text`
	font-size: 32px;
	font-weight: 700;
	color: ${colours.dark.white};
`;

export const Body = styled.View``;

export const InputWrapper = styled.View`
	margin-bottom: 15px;
	background-color: ${colours.dark.primary};
	border-radius: 5px;
`;

export const ForgotPasswordWrapper = styled.View`
	align-items: flex-end;
	margin-top: 5px;
	margin-bottom: 30px;
`;

export const Text = styled.Text`
	color: ${({ textColour }) => (textColour ? textColour : colours.dark.white)};
	font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 400)};
`;

export const ButtonWrapper = styled.View``;

export const Upper = styled.KeyboardAvoidingView`
	flex: 1;
	justify-content: center;
	padding: 16px;
`;
export const Lower = styled.View`
	padding: 16px;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	border-top-width: 0.25px;
	border-top-color: grey;
`;

export const PressableText = styled.TouchableOpacity`
	margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : `0px`)};
`;

export const KeyboardDismissView = styled.TouchableWithoutFeedback``;

export const Field = styled.View`
	margin-bottom: ${({ fieldMarginBottom = 0 }) => `${fieldMarginBottom}px`};

	border-radius: 5px;
`;
