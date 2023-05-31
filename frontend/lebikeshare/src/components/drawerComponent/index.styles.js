import { DrawerItem } from '@react-navigation/drawer';
import { colours } from '../../utils/constants';
import styled from 'styled-components/native';
export const DrawerWrapper = styled.View`
	background-color: ${colours.dark.bg_colour};
	flex: 1;
`;

export const HeaderContainer = styled.View`
	border-bottom-width: 1px;
	border-color: ${colours.dark.white};
	padding: 16px;
`;

export const DrawerSection = styled.View`
	margin-bottom: ${({ marginBottom = 0 }) => `${marginBottom}px`};
`;

export const Item = styled(DrawerItem)`
	border-bottom-color: #666;
	border-bottom-width: 1px;
`;

export const LogoutContainer = styled.View`
	border-top-width: 1px;
	border-color: ${colours.dark.white};
`;
