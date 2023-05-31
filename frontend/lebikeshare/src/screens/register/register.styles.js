import { colours } from '../../utils/constants';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
	flex: 1;
	background-color: ${colours.dark.bg_colour};
`;

export const HeaderWrapper = styled.View`
	align-items: center;
	justify-content: center;
	padding: 4px 0 10px 0;
	margin-bottom: 20px;
`;

export const FormWrapper = styled.View``;

export const Field = styled.View`
	margin: 5px 0 10px 0;
`;

export const LabelWrapper = styled.View`
	margin-bottom: 5px;
`;

export const ButtonWrapper = styled.View`
	margin-top: 24px;
	margin-bottom: 24px;
`;

export const ErrorWrapper = styled.View`
	border-width: ${({ error }) => (error ? `1px` : `0px`)};
	border-color: red;
	border-radius: 5px;
	margin-bottom: 2px;
`;

export const ErrorMessageWrapper = styled.View`
	margin-bottom: -10px;
`;

export const Upper = styled.View`
	flex: 1;
	padding: 16px;
`;

export const Lower = styled.View`
	justify-content: center;
	align-items: center;
	flex-direction: row;
	border-top-width: 0.25px;
	border-top-color: grey;
	padding: 16px;
`;

export const DoBWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 50%;
`;
