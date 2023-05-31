import { BikeDetails, Bikes } from '../screens';

import { createStackNavigator } from '@react-navigation/stack';

const BikeStackNavigator = createStackNavigator();

const BikeStack = () => {
	return (
		<BikeStackNavigator.Navigator initialRouteName='List Bikes'>
			<BikeStackNavigator.Screen
				name='listBikes'
				component={Bikes}
				options={{ headerShown: false }}
			/>
			<BikeStackNavigator.Screen
				name='bikeDetails'
				component={BikeDetails}
				options={({ route }) => ({
					title: route.params.title,
					headerBackTitleVisible: false,
				})}
			/>
		</BikeStackNavigator.Navigator>
	);
};

export default BikeStack;
