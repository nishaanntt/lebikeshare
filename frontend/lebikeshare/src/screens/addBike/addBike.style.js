import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.93);
`;

export const ModalContentView = styled.View`
	margin: 20px;
	background-color: ${colours.dark.secondary};
	border-radius: 20px;
	max-height: 35%;
`;

export const ModalOption = styled.TouchableOpacity`
	padding: 16px;
`;

export const ModalClose = styled.View`
	background-color: ${colours.dark.primary};
	padding: 16px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	align-items: center;
`;

export const Field = styled.View`
	margin: 5px 0 10px 0;
`;

export const ErrorWrapper = styled.View`
	border-width: ${({ error }) => (error ? `1px` : `0px`)};
	border-color: red;
	border-radius: 5px;
	margin-bottom: 2px;
`;

export const DateWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 50%;
`;

export const ButtonWrapper = styled.View`
	margin: 20px 0 0 0;
`;

export const PressableView = styled.View`
	background-color: ${colours.dark.primary};
	padding: 12px;
	border-radius: 5px;
`;

export const LabelWrapper = styled.View`
	margin-bottom: 5px;
`;
