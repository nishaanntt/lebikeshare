import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const InputWrapper = styled.View`
	/* margin-bottom: 15px; */
	background-color: ${colours.dark.primary};
	border-radius: 5px;
`;

export const TextInput = styled.TextInput`
	padding: 12px;
	color: ${colours.dark.secondary};
`;
