import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContentView = styled.View`
	margin: 20px;
	background-color: ${colours.dark.bg_colour};
	border-radius: 10px;
	padding: 5px 12px 12px 12px;
`;

export const ModalTitleWrapper = styled.View`
	align-items: center;
	margin-bottom: 10px;
	margin-top: 8px;
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

export const ButtonWrapper = styled.View`
	margin: 15px 0 15px 0;
`;

export const CloseWrapper = styled.View`
	align-items: center;
`;

export const CloseButtonWrapper = styled.TouchableOpacity`
	padding: 5px;
`;

export const Row = styled.View`
	flex-direction: row;
`;

export const CardButtonWrapper = styled.TouchableOpacity`
	background-color: ${colours.dark.secondary};
	/* position: absolute; */
	/* top: 45%; */
	/* right: 15px; */
	padding: 8px;
	border-radius: 5px;
`;
