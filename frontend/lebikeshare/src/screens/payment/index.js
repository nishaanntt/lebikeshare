import { Button, SafeAreaWrapper, Text } from '../../components';
import {
	ButtonContainer,
	Container,
	Desc,
	DescContainer,
	Field,
	LabelWrapper,
	ModalButton,
	ModalContainer,
	ModalContent,
	ModalContentView,
	TitleContainer,
	TotalWrapper,
} from './payment.style';
import { checkout, confirmPayment } from '../../redux/action/payment.action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Modal } from 'react-native';
import { colours } from '../../utils/constants';
import formatDate from '../../utils/formatDate';
import { useEffect } from 'react';
import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
	const route = useRoute();
	const { booking } = route.params;
	console.log('booking: ', booking);
	const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
		useStripe();
	const authReducer = useSelector(state => state.auth);
	const paymentReducer = useSelector(state => state.payment);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [showModal, setShowModal] = useState(false);

	const openPaymentSheet = async () => {
		console.log('Inside openPaymentSheet');
		const { paymentOption, error } = await presentPaymentSheet();
		if (error) {
			console.log(`Error Code: ${error.code}`, error.message);
			return;
		}
		dispatch(
			confirmPayment(booking._id, authReducer.token, () => {
				setShowModal(true);
			})
		);
	};

	const initializePaymentSheet = async () => {
		const amount = Number(Number(booking.totalCost).toFixed(2)) * 100;
		dispatch(checkout(amount, authReducer.token));
		const { error } = await initPaymentSheet({
			merchantDisplayName: 'LeBikeShare',
			customerId: paymentReducer.customerId,
			customerEphemeralKeySecret: paymentReducer.ephemeralKey,
			paymentIntentClientSecret: paymentReducer.paymentIntent,
			defaultBillingDetails: {
				name: `${authReducer.userData.firstName} ${authReducer.userData.lastName}`,
				email: authReducer.userData.email,
			},
		});
		if (error) {
			console.log('Payment sheet not initialized: ', error);
			return;
		}

		console.log('Payment sheet initialized.');
	};

	useEffect(() => {
		initializePaymentSheet();
	}, []);
	return (
		<SafeAreaWrapper>
			<Container>
				<Modal visible={showModal} transparent animationType='fade'>
					<ModalContainer>
						<ModalContentView>
							<ModalContent>
								<TitleContainer>
									<Text fontWeight={700} size={18}>
										Payment Successful!
									</Text>
								</TitleContainer>
								<DescContainer>
									<Text size={16} textAlign='center'>
										Thank you for using LeBikeShare! Tap below to continue.
									</Text>
								</DescContainer>
							</ModalContent>
							<ModalButton onPress={() => navigation.navigate('bookingStack')}>
								<Text fontWeight={700} size={16}>
									Continue
								</Text>
							</ModalButton>
						</ModalContentView>
					</ModalContainer>
				</Modal>
				<Field>
					<LabelWrapper>
						<Text fontWeight={700}>Booking ID</Text>
					</LabelWrapper>
					<Desc>
						<Text>{booking.bookingId}</Text>
					</Desc>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={700}>Booking Start Date</Text>
					</LabelWrapper>
					<Desc>
						<Text>
							{formatDate(booking.startedTime)[2]},{' '}
							{formatDate(booking.startedTime)[0]}
						</Text>
					</Desc>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={700}>Booking Start Time</Text>
					</LabelWrapper>
					<Desc>
						<Text>{formatDate(booking.startedTime)[1]}</Text>
					</Desc>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={700}>Booking End Date</Text>
					</LabelWrapper>
					<Desc>
						<Text>
							{formatDate(booking.endedTime)[2]},{' '}
							{formatDate(booking.endedTime)[0]}
						</Text>
					</Desc>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={700}>Booking End Time</Text>
					</LabelWrapper>
					<Desc>
						<Text>{formatDate(booking.endedTime)[1]}</Text>
					</Desc>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={700}>Source</Text>
					</LabelWrapper>
					<Desc>
						<Text>{booking.bikeStationId.name}</Text>
					</Desc>
				</Field>
				{booking.destination && (
					<Field>
						<LabelWrapper>
							<Text fontWeight={700}>Destination</Text>
						</LabelWrapper>
						<Desc>
							<Text>{booking.destination.name}</Text>
						</Desc>
					</Field>
				)}
			</Container>
			<TotalWrapper>
				<Text size={18} fontWeight={700}>
					Total:
				</Text>
				<Text size={16} fontWeight={700}>
					{'\u00A3'}
					{Number(booking.totalCost).toFixed(2)}
				</Text>
			</TotalWrapper>
			<ButtonContainer>
				<Button
					label='Checkout'
					colour={colours.dark.secondary}
					onPress={openPaymentSheet}
				/>
			</ButtonContainer>
		</SafeAreaWrapper>
	);
};

export default PaymentScreen;
