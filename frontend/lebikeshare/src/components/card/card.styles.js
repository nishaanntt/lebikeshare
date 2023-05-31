import styled from 'styled-components/native';

export const Container = styled.View`
	background-color: #e5e5e5;
	padding: 5px;
	border-radius: 5px;
	flex: 1;
	margin-left: ${({ marginLeft = 0 }) => `${marginLeft}px`};
	margin-right: ${({ marginRight = 0 }) => `${marginRight}px`};
	margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
	margin-bottom: ${({ marginBottom = 0 }) => `${marginBottom}px`};
`;
