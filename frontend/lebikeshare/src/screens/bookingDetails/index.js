import * as Sharing from 'expo-sharing';

import { Button, SafeAreaWrapper, Text } from '../../components';
import {
	Container,
	CounterContainer,
	Desc,
	FeedbackButtonContainer,
	FeedbackClose,
	FeedbackContainer,
	FeedbackSubmit,
	FeedbackTextContainer,
	Field,
	Label,
	Lower,
	ModalClose,
	ModalContainer,
	ModalContentView,
	ModalOption,
} from './bookingDetails.style';
import {
	Modal,
	ScrollView,
	Share,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import {
	endBooking,
	getBookingDetails,
	startBooking,
} from '../../redux/action/booking.action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { addFeedback } from '../../redux/action/feedback.action';
import { colours } from '../../utils/constants';
import { useToast } from 'native-base';

const BookingDetails = () => {
	const route = useRoute();
	const { bookingId } = route.params;

	const bookingReducer = useSelector(state => state.booking);
	const authReducer = useSelector(state => state.auth);
	const bikeStationReducer = useSelector(state => state.bikeStation);

	const dispatch = useDispatch();
	const Toast = useToast();
	const navigation = useNavigation();

	const [booking, setBooking] = useState({});
	const [bikeStations, setBikeStations] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);
	const [feedback, setFeedback] = useState('');

	useEffect(() => {
		dispatch(getBookingDetails(bookingId, authReducer.token));
		setBikeStations(bikeStationReducer.bikeStations.data);
	}, []);

	useEffect(() => {
		setBooking(bookingReducer.booking);
	}, [bookingReducer]);

	const formatDate = date => {
		let tempDate = new Date(date);
		const DD = String(tempDate.getDate()).padStart(2, '0');
		const MM = String(tempDate.getMonth() + 1).padStart(2, '0');
		const YYYY = String(tempDate.getFullYear());
		const HH = String(tempDate.getHours()).padStart(2, '0');
		const mm = String(tempDate.getMinutes()).padStart(2, '0');
		const day = String(tempDate.getDay());

		const dayOfWeek = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday',
		};

		const fDate = `${DD}-${MM}-${YYYY}`;
		const fTime = `${HH}:${mm}`;

		return [fDate, fTime, dayOfWeek[day]];
	};

	const handleStartBookingPress = () => {
		dispatch(
			startBooking(
				bookingId,
				authReducer.token,
				() => {
					dispatch(getBookingDetails(bookingId, authReducer.token));
					Toast.show({
						description: 'Booking started.',
						width: 'sm',
						backgroundColor: 'green.500',
						duration: 2500,
					});
				},
				() => {
					Toast.show({
						description: bookingReducer.error,
						width: 'sm',
						backgroundColor: 'red.500',
						duration: 2500,
					});
				}
			)
		);
	};

	const handleEndBookingPress = () => {
		setShowModal(true);
	};

	const handleModalOptionPress = destinationId => {
		dispatch(
			endBooking(
				bookingId,
				destinationId,
				authReducer.token,
				() => {
					dispatch(
						getBookingDetails(bookingId, authReducer.token, () => {
							setShowModal(false);
							Toast.show({
								description: bookingReducer.message,
								width: 'sm',
								backgroundColor: 'green.500',
								duration: 2500,
							});
						})
					);
				},
				() => {
					Toast.show({
						description: bookingReducer.error,
						width: 'sm',
						backgroundColor: 'red.500',
						duration: 2500,
					});
				}
			)
		);
	};

	const handlePaymentPress = () => {
		navigation.navigate('Checkout', {
			booking,
		});
	};

	const handleAddFeedbackPress = () => {
		setShowFeedbackModal(true);
	};

	const shareContent = async feedback => {
		try {
			const result = await Sharing.shareAsync(feedback);
			if (result.action === Sharing.sharedAction) {
				console.log('content shared successfully');
				console.log('share result: ', JSON.stringify(result));
			} else if (result.action === Sharing.dismissedAction) {
				console.log('Sharing was dismissed');
			}
		} catch (err) {
			console.log('Sharing failed with error: ', err.message);
		}
	};

	const shareMessage = message => {
		Share.share({
			message,
		})
			.then(res => {
				console.log('share result: ', res);
				if (res.action !== 'dismissedAction') {
					setShowFeedbackModal(false);
					dispatch(
						addFeedback(bookingId, feedback, authReducer.token, () => {
							setFeedback('');
							Toast.show({
								description: 'Feedback shared successfully.',
								backgroundColor: 'green.500',
								duration: 2500,
								width: 'sm',
							});
							dispatch(getBookingDetails(bookingId, authReducer.token));
						})
					);
				}
			})
			.catch(err => {
				console.log('share error: ', err);
			});
	};

	const handleFeedbackSubmit = () => {
		if (feedback !== '') {
			shareMessage(feedback);
		}
	};

	const bookingStatus = bookingReducer.booking.status;

	return (
		<SafeAreaWrapper>
			<Modal animationType='fade' transparent visible={showFeedbackModal}>
				<ModalContainer>
					<FeedbackContainer>
						<FeedbackTextContainer>
							<TextInput
								placeholder='Enter Text...'
								placeholderTextColor={colours.dark.white}
								style={{
									padding: 16,
									minHeight: '20%',
									color: colours.dark.white,
								}}
								multiline
								value={feedback}
								onChangeText={val => setFeedback(val)}
								maxLength={100}
							/>
						</FeedbackTextContainer>
						<CounterContainer>
							<Text>{`${feedback.length}/100`}</Text>
						</CounterContainer>
						<FeedbackButtonContainer>
							<FeedbackClose onPress={() => setShowFeedbackModal(false)}>
								<Text
									fontWeight={700}
									size={16}
									textColour={colours.dark.secondary}>
									Close
								</Text>
							</FeedbackClose>
							<FeedbackSubmit onPress={handleFeedbackSubmit}>
								<Text fontWeight={700} size={16}>
									Share
								</Text>
							</FeedbackSubmit>
						</FeedbackButtonContainer>
					</FeedbackContainer>
				</ModalContainer>
			</Modal>
			<Modal animationType='fade' visible={showModal} transparent>
				<ModalContainer>
					<ModalContentView>
						<ScrollView>
							{bikeStations.map(station => (
								<ModalOption
									key={station?._id}
									onPress={() => handleModalOptionPress(station._id)}>
									<Text>{station?.name}</Text>
								</ModalOption>
							))}
						</ScrollView>
						<TouchableOpacity onPress={() => setShowModal(false)}>
							<ModalClose>
								<Text textColour='#123'>Close</Text>
							</ModalClose>
						</TouchableOpacity>
					</ModalContentView>
				</ModalContainer>
			</Modal>
			<Container>
				<Field>
					<Label>
						<Text fontWeight={700}>Booking ID</Text>
					</Label>
					<Desc>
						<Text>{booking.bookingId}</Text>
					</Desc>
				</Field>
				<Field>
					<Label>
						<Text fontWeight={700}>Booking Status</Text>
					</Label>
					<Desc>
						<Text>{booking.status}</Text>
					</Desc>
				</Field>
				<Field>
					<Label>
						<Text fontWeight={700}>Booking Start</Text>
					</Label>
					<Desc>
						<Text>
							{booking.startedTime
								? formatDate(booking.startedTime)[2]
								: formatDate(booking.startTime)[2]}
							,{' '}
							{booking.startedTime
								? formatDate(booking.startedTime)[0]
								: formatDate(booking.startTime)[0]}
						</Text>
					</Desc>
				</Field>
				<Field>
					<Label>
						<Text fontWeight={700}>Start Time</Text>
					</Label>
					<Desc>
						<Text>
							{booking.startedTime
								? formatDate(booking.startedTime)[1]
								: formatDate(booking.startTime)[1]}
						</Text>
					</Desc>
				</Field>
				<Field>
					<Label>
						<Text fontWeight={700}>Source</Text>
					</Label>
					<Desc>
						<Text>{booking.bikeStationId?.name}</Text>
					</Desc>
				</Field>
				{booking.destination && (
					<Field>
						<Label>
							<Text fontWeight={700}>Destination</Text>
						</Label>
						<Desc>
							<Text>{booking.destination?.name}</Text>
						</Desc>
					</Field>
				)}
				<Field>
					<Label>
						<Text fontWeight={700}>Booking End</Text>
					</Label>
					<Desc>
						<Text>
							{booking.endedTime
								? formatDate(booking.endedTime)[2]
								: formatDate(booking.endTime)[2]}
							,{' '}
							{booking.endedTime
								? formatDate(booking.endedTime)[0]
								: formatDate(booking.endTime)[0]}
						</Text>
					</Desc>
				</Field>
				<Field>
					<Label>
						<Text fontWeight={700}>End Time</Text>
					</Label>
					<Desc>
						<Text>
							{booking.endedTime
								? formatDate(booking.endedTime)[1]
								: formatDate(booking.endTime)[1]}
						</Text>
					</Desc>
				</Field>
				<Field>
					<Label>
						<Text fontWeight={700}>
							{booking.endedTime ? `Total Cost` : `Estimated Cost`}
						</Text>
					</Label>
					<Desc>
						<Text>
							{'\u00A3'} {Number(booking.totalCost).toFixed(2)}
						</Text>
					</Desc>
				</Field>
			</Container>
			<Lower>
				{bookingStatus == 'Confirmed' && (
					<Button
						label='Start Booking'
						colour={colours.dark.secondary}
						onPress={handleStartBookingPress}
					/>
				)}
				{bookingStatus == 'Ongoing' && (
					<Button
						label='End Booking'
						colour={colours.dark.secondary}
						onPress={handleEndBookingPress}
					/>
				)}
				{bookingStatus == 'Pending Payment' && (
					<Button
						label='Make Payment'
						colour={colours.dark.secondary}
						onPress={handlePaymentPress}
					/>
				)}
				{bookingStatus == 'Completed' && !bookingReducer.booking.feedback && (
					<Button
						label='Add Feedback'
						colour={colours.dark.secondary}
						onPress={handleAddFeedbackPress}
					/>
				)}
			</Lower>
		</SafeAreaWrapper>
	);
};

export default BookingDetails;
