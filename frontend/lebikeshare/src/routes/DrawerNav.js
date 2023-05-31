import { Dashboard, PaymentScreen, Profile } from '../screens';

import BikeStack from './bikeStack';
import BikeStationStack from './bikeStationStack';
import BookingStack from './bookingStack';
import { CustomDrawer } from '../components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
	const authReducer = useSelector(state => state.auth);
	const role = authReducer.userData.role;
	return (
		<Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
			{role == 'admin' && (
				<>
					<Drawer.Screen
						name='bikeStationStack'
						component={BikeStationStack}
						options={{ title: 'Dashboard', unmountOnBlur: true }}
					/>
					<Drawer.Screen
						name='bikeStack'
						component={BikeStack}
						options={{ title: 'Bikes', unmountOnBlur: true }}
					/>
				</>
			)}
			{role == 'user' && (
				<>
					<Drawer.Screen
						name='User Dashboard'
						component={Dashboard}
						options={{ title: 'Dashboard', unmountOnBlur: true }}
					/>
					<Drawer.Screen
						name='bookingStack'
						component={BookingStack}
						options={{ title: 'Bookings', unmountOnBlur: true }}
					/>
					<Drawer.Screen
						name='Checkout'
						component={PaymentScreen}
						options={{ unmountOnBlur: true }}
					/>
				</>
			)}
			{/* <UserStack.Screen name='Account Settings' component={() => {}} /> */}
			{/* <UserStack.Screen name='Support' component={() => {}} /> */}
			<Drawer.Screen name='Profile' component={Profile} />
		</Drawer.Navigator>
	);
};

export default DrawerNav;
