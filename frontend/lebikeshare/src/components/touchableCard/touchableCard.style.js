import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const CardContainer = styled.TouchableOpacity`
	background-color: ${colours.dark.secondary};
	padding: 5px;
	border-radius: 5px;
	flex: 1;
	margin-left: ${({ marginLeft = 0 }) => `${marginLeft}px`};
	margin-right: ${({ marginRight = 0 }) => `${marginRight}px`};
	margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
	margin-bottom: ${({ marginBottom = 0 }) => `${marginBottom}px`};
`;
