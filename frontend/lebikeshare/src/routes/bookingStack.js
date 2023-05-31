import { BookingDetails, ListBookings, NewBooking } from '../screens';
import { Text, TouchableOpacity, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const BookingStackNavigator = createStackNavigator();

const BookingStack = () => {
	const navigation = useNavigation();
	return (
		<BookingStackNavigator.Navigator initialRouteName='listBookings'>
			<BookingStackNavigator.Screen
				name='newBooking'
				component={NewBooking}
				options={{
					title: 'New Booking',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<View style={{ padding: 5, marginLeft: 8 }}>
								<Text style={{ fontSize: 15 }}>Back</Text>
							</View>
						</TouchableOpacity>
					),
				}}
			/>
			<BookingStackNavigator.Screen
				name='listBookings'
				component={ListBookings}
				options={{ title: 'Bookings', headerShown: false }}
			/>
			<BookingStackNavigator.Screen
				name='bookingDetails'
				component={BookingDetails}
				options={{ headerBackTitleVisible: false, title: 'Booking Details' }}
			/>
		</BookingStackNavigator.Navigator>
	);
};

export default BookingStack;
