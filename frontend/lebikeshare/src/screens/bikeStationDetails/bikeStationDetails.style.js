import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const Field = styled.View`
	margin-bottom: 10px;
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

export const Container = styled.ScrollView`
	flex: 1;
	padding: 16px;
`;

export const TouchableView = styled.TouchableOpacity`
	background-color: ${colours.dark.primary};
	padding: 12px;
	border-radius: 5px;
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

export const SeparatorWrapper = styled.View`
	align-items: center;
	justify-content: center;
	margin-top: 16px;
	margin-bottom: 26px;
`;

export const Separator = styled.View`
	height: 1px;
	width: 70%;
	background-color: ${colours.dark.white};
`;

export const BikeListWrapper = styled.View``;

export const BikeListTitleWrapper = styled.View`
	margin-bottom: 10px;
`;

export const BikeList = styled.View``;

export const Bike = styled.TouchableOpacity`
	background-color: ${colours.dark.secondary};
	padding: 8px;
	border-radius: 8px;
	margin-bottom: 10px;
`;

export const Row = styled.View`
	flex-direction: row;
	margin-bottom: 2px;
	margin-top: 2px;
`;
