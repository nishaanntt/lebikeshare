import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
	DrawerSection,
	DrawerWrapper,
	HeaderContainer,
	Item,
	LogoutContainer,
} from './index.styles';
import { useDispatch, useSelector } from 'react-redux';

import Text from '../text/text.style';
import { colours } from '../../utils/constants';
import { handleLogout } from '../../redux/action/auth.action';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = props => {
	const dispatch = useDispatch();
	const authReducer = useSelector(state => state.auth);

	const role = authReducer.userData.role;

	const navigation = useNavigation();
	return (
		<DrawerWrapper>
			<DrawerContentScrollView {...props}>
				<HeaderContainer>
					<Text fontWeight={700} size={21}>
						Hi, {authReducer.userData.firstName}!
					</Text>
				</HeaderContainer>
				<DrawerSection>
					{role === 'admin' && (
						<>
							<Item
								label='Dashboard'
								onPress={() => navigation.navigate('bikeStationStack')}
								labelStyle={{ color: colours.dark.white }}
							/>
							<Item
								label='Profile'
								onPress={() => navigation.navigate('Profile')}
								labelStyle={{ color: colours.dark.white }}
							/>
							<Item
								label='Bikes'
								onPress={() => navigation.navigate('bikeStack')}
								labelStyle={{ color: colours.dark.white }}
							/>
						</>
					)}
					{role === 'user' && (
						<>
							<Item
								label='Dashboard'
								onPress={() => navigation.navigate('User Dashboard')}
								labelStyle={{ color: colours.dark.white }}
							/>
							<Item
								label='Profile'
								onPress={() => navigation.navigate('Profile')}
								labelStyle={{ color: colours.dark.white }}
							/>
							<Item
								label='Bookings'
								onPress={() =>
									navigation.navigate('bookingStack', {
										screen: 'listBookings',
									})
								}
								labelStyle={{ color: colours.dark.white }}
							/>
							<Item
								label='Support'
								onPress={() => {}}
								labelStyle={{ color: colours.dark.white }}
							/>
						</>
					)}
					{/* <Item
						label='Settings'
						onPress={() => navigation.navigate('Settings')}
						labelStyle={{ color: colours.dark.white }}
					/> */}
				</DrawerSection>
			</DrawerContentScrollView>
			<DrawerSection marginBottom={15}>
				<LogoutContainer>
					<DrawerItem
						label='Log out'
						onPress={() => dispatch(handleLogout())}
						labelStyle={{ color: `${colours.dark.white}` }}
					/>
				</LogoutContainer>
			</DrawerSection>
		</DrawerWrapper>
	);
};

export default CustomDrawer;
