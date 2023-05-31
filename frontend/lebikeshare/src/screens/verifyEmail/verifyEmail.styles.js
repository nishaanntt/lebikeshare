import styled from 'styled-components/native';

export const VerifyContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const TextWrapper = styled.View`
	margin-bottom: ${({ marginBottom = 0 }) => `${marginBottom}px`};
`;

export const ButtonContainer = styled.View`
	padding: 16px;
`;
