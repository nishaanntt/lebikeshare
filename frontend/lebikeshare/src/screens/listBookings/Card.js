import { Text, TouchableCard } from '../../components';

import { Row } from './bookings.style';
import { useNavigation } from '@react-navigation/native';

export const Card = ({ booking }) => {
	const navigation = useNavigation();

	const formatDate = date => {
		let tempDate = new Date(date);

		const DD = String(tempDate.getDate()).padStart(2, '0');
		const MM = String(tempDate.getMonth() + 1).padStart(2, '0');
		const YYYY = tempDate.getFullYear();
		const HH = String(tempDate.getHours()).padStart(2, '0');
		const mm = String(tempDate.getMinutes()).padStart(2, '0');

		const fDate = `${DD}-${MM}-${YYYY}`;
		const fTime = `${HH}:${mm}`;

		return [fDate, fTime];
	};

	const handleCardPress = () => {
		navigation.navigate('bookingStack', {
			screen: 'bookingDetails',
			params: { bookingId: booking._id },
		});
	};

	return (
		<TouchableCard marginBottom={10} onPress={handleCardPress}>
			<Row>
				<Text fontWeight={700}>Status:{'  '}</Text>
				<Text>{booking.status}</Text>
			</Row>
			<Row>
				<Text fontWeight={700}>Start Date:{'  '}</Text>
				<Text>{`${formatDate(booking.startTime)[0]}`}</Text>
			</Row>
			<Row>
				<Text fontWeight={700}>Start Time:{'  '}</Text>
				<Text>{`${formatDate(booking.startTime)[1]}`}</Text>
			</Row>
		</TouchableCard>
	);
};
