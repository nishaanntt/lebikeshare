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
	margin-bottom: 2px;
`;
export const DisplayView = styled.View`
	background-color: ${colours.dark.primary};
	padding: 10px;
	border-radius: 5px;
`;
export const PressableInput = styled.TouchableOpacity`
	background-color: ${colours.dark.primary};
	padding: 10px;
	border-radius: 5px;
`;
export const ButtonWrapper = styled.View`
	margin-top: 20px;
`;

export const FieldRow = styled.View`
	flex-direction: row;
`;

export const ModalContainer = styled.View`
	background-color: rgba(0, 0, 0, 0.9);
	flex: 1;
	justify-content: center;
`;

export const ModalContentContainer = styled.View`
	background-color: white;
	margin: 20px;
	border-radius: 10px;
`;

export const ModalButtonContainer = styled.View`
	border-top-width: 1px;
	border-color: ${colours.dark.secondary};
`;

export const ModalButton = styled.TouchableOpacity`
	background-color: ${colours.dark.secondary};
	align-items: center;
	padding: 15px;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;
