import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const Container = styled.View`
	padding: 16px;
	flex: 1;
`;

export const Field = styled.View`
	margin: 5px 0 10px 0;
`;

export const LabelWrapper = styled.View`
	margin-bottom: 5px;
`;

export const ErrorWrapper = styled.View`
	border-width: ${({ error }) => (error ? `1px` : `0px`)};
	border-color: red;
	border-radius: 5px;
	margin-bottom: 2px;
`;

export const Lower = styled.View`
	padding: 16px;
`;

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.93);
`;

export const ModalContentView = styled.View`
	margin: 25px;
	background-color: ${colours.dark.secondary};
	border-radius: 20px;
`;

export const ModalUpper = styled.View`
	padding: 50px 0px;
	align-items: center;
	justify-content: center;
`;

export const ModalLower = styled.View`
	flex-direction: row;
`;

export const Confirm = styled.TouchableOpacity`
	flex: 1;
	padding: 15px;
	align-items: center;
	justify-content: center;
	background-color: ${colours.dark.bg_colour};
	border-bottom-right-radius: 20px;
`;

export const Cancel = styled.TouchableOpacity`
	flex: 1;
	padding: 15px;
	align-items: center;
	justify-content: center;
	background-color: salmon;
	border-bottom-left-radius: 20px;
`;
