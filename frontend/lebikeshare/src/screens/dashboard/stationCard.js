import { Dimensions, TouchableOpacity, View } from 'react-native';

import { Row } from './dashboard.styles';
import { Text } from '../../components';
import { colours } from '../../utils/constants';

const { width } = Dimensions.get('window');

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

const StationCard = ({ station, onPress }) => {
	return (
		<View
			style={{
				elevation: 2,
				backgroundColor: '#FFF',
				marginHorizontal: 10,
				shadowColor: '#000',
				shadowRadius: 5,
				shadowOpacity: 0.3,
				shadowOffset: { x: 2, y: -2 },
				height: CARD_HEIGHT,
				width: CARD_WIDTH,
				overflow: 'hidden',
				marginBottom: 30,
				borderRadius: 10,
			}}>
			<View
				style={{
					flex: 3,
					width: '100%',
					height: '100%',
					alignSelf: 'center',
					backgroundColor: colours.dark.primary,
				}}>
				<Text>Alt Text</Text>
			</View>
			<View
				style={{
					flex: 2,
					padding: 10,
					backgroundColor: colours.dark.bg_colour,
				}}>
				<View style={{ flex: 1 }}>
					<Row>
						<Text fontWeight={700}>Location:{'  '}</Text>
						<Text>{station.name}</Text>
					</Row>
					<Row>
						<Text fontWeight={700}>Available Bikes:{'  '}</Text>
						<Text>{station.bikes.length}</Text>
					</Row>
				</View>
				<View>
					<TouchableOpacity onPress={onPress}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 5,
								borderWidth: 1.5,
								borderColor: colours.dark.primary,
								padding: 5,
							}}>
							<Text fontWeight={700} textColour={colours.dark.primary}>
								Book a Bike
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default StationCard;
