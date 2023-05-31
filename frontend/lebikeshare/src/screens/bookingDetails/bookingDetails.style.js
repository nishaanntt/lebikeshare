import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const Container = styled.View`
	padding: 16px;
	flex: 2;
`;

export const Field = styled.View`
	margin-bottom: 15px;
`;

export const Label = styled.View`
	margin-bottom: 2px;
`;

export const Desc = styled.View`
	border-bottom-width: 1px;
	border-bottom-color: ${colours.dark.secondary};
	padding-bottom: 3px;
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

export const FeedbackContainer = styled.View`
	margin: 0 20px;
	background-color: ${colours.dark.secondary};
	border-radius: 20px;
`;

export const FeedbackTextContainer = styled.View`
	margin-top: 10px;
`;

export const FeedbackButtonContainer = styled.View`
	flex-direction: row;
`;

export const FeedbackClose = styled.TouchableOpacity`
	background-color: ${colours.dark.white};
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 16px;
	border-bottom-left-radius: 20px;
`;

export const FeedbackSubmit = styled.TouchableOpacity`
	background-color: ${colours.dark.bg_colour};
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 16px;
	border-bottom-right-radius: 20px;
`;

export const CounterContainer = styled.View`
	align-items: flex-end;
	padding: 10px;
`;
