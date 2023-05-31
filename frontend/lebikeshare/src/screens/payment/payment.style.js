import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const Container = styled.View`
	padding: 16px;
	flex: 1;
`;

export const Field = styled.View`
	margin-bottom: 14px;
`;

export const LabelWrapper = styled.View`
	/* border-width: 1px;
	border-color: yellow; */
	margin-bottom: 2px;
`;

export const Desc = styled.View`
	border-bottom-width: 1px;
	border-color: black;
	padding-bottom: 2px;
`;

export const TotalWrapper = styled.View`
	border-top-width: 1.2px;
	border-bottom-width: 1.2px;
	border-top-color: white;
	border-bottom-color: white;
	padding: 16px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const ButtonContainer = styled.View`
	padding: 16px;
`;

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.93);
`;

export const ModalContentView = styled.View`
	margin: 20px;
`;

export const ModalContent = styled.View`
	align-items: center;
	justify-content: center;
	background-color: ${colours.dark.bg_colour};
	/* padding: 16px; */
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`;

export const TitleContainer = styled.View`
	margin: 16px 0;
`;

export const DescContainer = styled.View`
	margin-bottom: 25px;
	padding: 0 16px;
`;

export const ModalButton = styled.TouchableOpacity`
	background-color: ${colours.dark.secondary};
	padding: 16px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	align-items: center;
`;
