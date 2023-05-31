import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const Scroll = styled.ScrollView``;

export const Container = styled.View`
	flex: 1;
	padding: 16px;
`;

export const CardContainer = styled.View`
	padding: 5px;
`;

export const CardTitleWrapper = styled.View``;

export const CardBodyWrapper = styled.View``;

export const Row = styled.View`
	flex-direction: row;
	margin-top: 2px;
	margin-bottom: 2px;
`;

export const CardWrapper = styled.View`
	margin-bottom: 10px;
`;

export const Left = styled.View`
	flex: 1;
`;

export const Right = styled.View`
	justify-content: center;
`;

export const Pressable = styled.TouchableOpacity`
	padding: 8px;
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
