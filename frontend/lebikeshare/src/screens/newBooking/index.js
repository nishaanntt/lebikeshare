import { Button, SafeAreaWrapper, Text } from '../../components';
import {
	ButtonWrapper,
	Container,
	DisplayView,
	Field,
	LabelWrapper,
	ModalButton,
	ModalButtonContainer,
	ModalContainer,
	ModalContentContainer,
	PressableInput,
} from './newBooking.style';
import { Modal, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { colours } from '../../utils/constants';
import { createNewBooking } from '../../redux/action/booking.action';
import { getBikeStationDetails } from '../../redux/action/bikeStation.action';
import { useToast } from 'native-base';

const NewBooking = () => {
	const route = useRoute();
	const { station } = route.params;
	console.log('station: ', station);
	const authReducer = useSelector(state => state.auth);
	const bikeStationReducer = useSelector(state => state.bikeStation);
	const dispatch = useDispatch();
	const Toast = useToast();
	const navigation = useNavigation();

	useEffect(() => {
		dispatch(getBikeStationDetails(station._id, authReducer.token, () => {}));
	}, []);

	const availableBikes = bikeStationReducer.availableBikes;
	console.log('availableBikes: ', availableBikes);

	const [start, setStart] = useState(new Date());
	console.log('start: ', start);
	const [end, setEnd] = useState(new Date());
	console.log('end: ', end);
	const [mode, setMode] = useState('datetime');
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const [startDate, setStartDate] = useState('Select Date');
	const [startTime, setStartTime] = useState('');
	const [endDate, setEndDate] = useState('Select Date');
	const [endTime, setEndTime] = useState('');

	const formatDate = date => {
		let tempDate = new Date(date);
		let dd = tempDate.getDate();
		let mm = tempDate.getMonth() + 1;
		let yyyy = tempDate.getFullYear();
		let hh = tempDate.getHours();
		let min = tempDate.getMinutes();
		if (dd < 10) dd = `0${dd}`;
		if (mm < 10) mm = `0${mm}`;
		if (hh < 10) hh = `0${hh}`;
		if (min < 10) min = `0${min}`;

		let fDate = `${dd}-${mm}-${yyyy}`;
		let fTime = `${hh}:${min}`;
		return [fDate, fTime];
	};

	const onChangeStartDate = (event, selectedDate) => {
		const currentDate = selectedDate || start;
		setShowStartDatePicker(Platform.OS === 'ios');
		setStart(currentDate);

		let tempDate = new Date(currentDate);
		let [fDate, fTime] = formatDate(tempDate);
		setStartTime(fTime);
		setStartDate(fDate);
	};

	const onChangeEndDate = (event, selectedDate) => {
		const currentDate = selectedDate || end;
		setShowEndDatePicker(Platform.OS === 'ios');
		setEnd(currentDate);

		let tempDate = new Date(currentDate);
		let [fDate, fTime] = formatDate(tempDate);
		setEndDate(fDate);
		setEndTime(fTime);
	};

	const showStartMode = currentMode => {
		setShowStartDatePicker(true);
		setMode(currentMode);
	};

	const showEndMode = currentMode => {
		setShowEndDatePicker(true);
		setMode(currentMode);
	};

	const calculateInterval = (start, end) => {
		const diffInMins = Math.floor((end - start) / 1000 / 60);
		const intervals = Math.ceil(diffInMins / 30);
		return intervals;
	};

	const estimatedCost = (start, end) => {
		const intervals = calculateInterval(start, end);
		const pricePer30Mins = 1.65;
		const totalCost = intervals * pricePer30Mins;
		return totalCost.toFixed(2);
	};

	const handleSubmit = () => {
		if (availableBikes && availableBikes.length > 0) {
			const data = {
				bikeId: availableBikes[0]?._id,
				startTime: start,
				endTime: end,
				source: station._id,
			};
			dispatch(
				createNewBooking(data, authReducer.token, () => {
					Toast.show({
						description: 'Booking created successfully.',
						width: 'sm',
						backgroundColor: 'green.500',
						duration: 2000,
					});
					navigation.goBack();
				})
			);
		} else {
			Toast.show({
				description: 'Sorry, no bikes available at the moment.',
				width: 'sm',
				backgroundColor: 'red.500',
				duration: 2000,
			});
		}
	};

	return (
		<SafeAreaWrapper>
			<Container>
				<Field>
					<LabelWrapper>
						<Text>Source Station</Text>
					</LabelWrapper>
					<DisplayView>
						<Text textColour='black'>{station.name}</Text>
					</DisplayView>
				</Field>
				<Field>
					<LabelWrapper>
						<Text>Start Time</Text>
					</LabelWrapper>
					<PressableInput onPress={() => showStartMode('datetime')}>
						<Text textColour='black'>{`${startDate}${
							startTime != '' ? ',' : ''
						} ${startTime}`}</Text>
					</PressableInput>
				</Field>
				{showStartDatePicker && (
					<Modal transparent animationType='fade' visible={showStartDatePicker}>
						<ModalContainer>
							<ModalContentContainer>
								<DateTimePicker
									testID='dateTimePicker'
									value={start}
									mode={mode}
									is24Hour={true}
									display='spinner'
									onChange={onChangeStartDate}
									minimumDate={new Date()}
									minuteInterval={5}
								/>
								<ModalButtonContainer>
									<ModalButton onPress={() => setShowStartDatePicker(false)}>
										<Text size={18} fontWeight={700}>
											Submit
										</Text>
									</ModalButton>
								</ModalButtonContainer>
							</ModalContentContainer>
						</ModalContainer>
					</Modal>
				)}
				<Field>
					<LabelWrapper>
						<Text>End Time</Text>
					</LabelWrapper>
					<PressableInput onPress={() => showEndMode('datetime')}>
						<Text textColour='black'>{`${endDate}${
							endTime != '' ? ',' : ''
						} ${endTime}`}</Text>
					</PressableInput>
				</Field>
				{showEndDatePicker && (
					<Modal transparent animationType='fade' visible={showEndDatePicker}>
						<ModalContainer>
							<ModalContentContainer>
								<DateTimePicker
									testID='endDateTimePicker'
									value={end}
									mode={mode}
									is24Hour={true}
									display='spinner'
									onChange={onChangeEndDate}
									minimumDate={start}
									minuteInterval={5}
								/>
								<ModalButtonContainer>
									<ModalButton onPress={() => setShowEndDatePicker(false)}>
										<Text size={18} fontWeight={700}>
											Submit
										</Text>
									</ModalButton>
								</ModalButtonContainer>
							</ModalContentContainer>
						</ModalContainer>
					</Modal>
				)}
				<Field>
					<LabelWrapper>
						<Text>Estimated Cost</Text>
					</LabelWrapper>
					<DisplayView>
						{startDate != 'Select Date' && endDate != 'Select Date' ? (
							<Text textColour='black'>
								{'\u00A3'}
								{estimatedCost(start, end)}
							</Text>
						) : (
							<Text textColour='black'>
								{'\u00A3'}
								{'0.00'}
							</Text>
						)}
					</DisplayView>
				</Field>
				<ButtonWrapper>
					<Button
						label='Create Booking'
						colour={colours.dark.secondary}
						onPress={handleSubmit}
					/>
				</ButtonWrapper>
			</Container>
		</SafeAreaWrapper>
	);
};

export default NewBooking;
