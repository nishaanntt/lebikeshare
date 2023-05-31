import { SafeAreaWrapper, Text } from '../../components';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from './Card';
import { Container } from './bookings.style';
import { FlashList } from '@shopify/flash-list';
import { getBookingList } from '../../redux/action/booking.action';
import { useEffect } from 'react';
import { useState } from 'react';

const ListBookings = () => {
	const bookingReducer = useSelector(state => state.booking);
	const authReducer = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const [bookings, setBookings] = useState([]);
	console.log('bookings: ', bookings);

	useEffect(() => {
		dispatch(getBookingList(authReducer.token));
	}, []);

	useEffect(() => {
		setBookings(bookingReducer.bookings);
	}, [bookingReducer]);
	return (
		<SafeAreaWrapper>
			<Container>
				<FlashList
					showsVerticalScrollIndicator={false}
					estimatedItemSize={63}
					data={bookings.reverse()}
					renderItem={({ item }) => <Card booking={item} key={item._id} />}
				/>
			</Container>
		</SafeAreaWrapper>
	);
};

export default ListBookings;
