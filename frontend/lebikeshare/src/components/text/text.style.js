import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

const Text = styled.Text`
	color: ${({ textColour = colours.dark.textColour }) => textColour};
	font-weight: ${({ fontWeight = 400 }) => fontWeight};
	font-size: ${({ size = 14 }) => `${size}px`};
	text-align: ${({ textAlign = 'left' }) => textAlign};
`;
export default Text;
