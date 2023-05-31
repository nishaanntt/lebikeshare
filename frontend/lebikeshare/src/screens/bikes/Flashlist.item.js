import { Card, Text, TouchableCard } from '../../components';
import { CardContainer, CardWrapper, Row } from './bikes.style';
import { useDispatch, useSelector } from 'react-redux';

import { getBikeDetails } from '../../redux/action/bike.action';
import { useNavigation } from '@react-navigation/native';

const RenderItem = ({ data }) => {
	const navigation = useNavigation();
	const authReducer = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const handleCardPress = () => {
		dispatch(
			getBikeDetails(data._id, authReducer.token, () =>
				navigation.navigate('bikeDetails', { title: data.bikeNumber })
			)
		);
	};
	return (
		<TouchableCard onPress={handleCardPress} marginBottom={10}>
			<CardContainer>
				<Row>
					<Text fontWeight={700}>Bike Number:{'  '}</Text>
					<Text>{data?.bikeNumber}</Text>
				</Row>

				<Row>
					<Text fontWeight={700}>Status:{'  '}</Text>
					<Text>{data?.status}</Text>
				</Row>

				<Row>
					<Text fontWeight={700}>Last Service:{'  '}</Text>
					<Text>{data?.lastService ? data?.lastService : 'Not Available'}</Text>
				</Row>
			</CardContainer>
		</TouchableCard>
	);
};
export default RenderItem;
