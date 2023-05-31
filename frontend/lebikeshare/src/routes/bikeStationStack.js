import { BikeStation, BikeStationDetails } from '../screens';

import { createStackNavigator } from '@react-navigation/stack';

const BikeStationStackNavigator = createStackNavigator();

const BikeStationStack = () => {
	return (
		<BikeStationStackNavigator.Navigator initialRouteName='listBikeStation'>
			<BikeStationStackNavigator.Screen
				name='listBikeStation'
				component={BikeStation}
				options={{ headerShown: false }}
			/>
			<BikeStationStackNavigator.Screen
				name='Bike Station Details'
				component={BikeStationDetails}
				options={({ route }) => ({
					title: route.params.title,
					headerBackTitleVisible: false,
				})}
			/>
		</BikeStationStackNavigator.Navigator>
	);
};

export default BikeStationStack;
