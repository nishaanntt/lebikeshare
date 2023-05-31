import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const ButtonWrapper = styled.TouchableOpacity`
	background-color: ${({ type, colour }) =>
		type === 'fill' ? colour : colours.dark.buttonColour};
	border-width: ${({ type }) => (type === 'fill' ? '0' : '1.5px')};
	border-radius: 10px;
	border-color: ${({ type, colour }) => type === 'border' && colour};
	padding: 16px;
	justify-content: center;
	align-items: center;
`;

export const ButtonLabel = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: ${({ type, colour }) => (type === 'fill' ? '#fff' : colour)};
`;
