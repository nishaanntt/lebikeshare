import { Button, Card, Input, SafeAreaWrapper, Text } from '../../components';
import { CardTitleWrapper, Container, Scroll } from './adminDashboard.styles';
import { Platform, Pressable, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

const AdminDashboard = () => {
	const formatDate = rawDate => {
		let date = new Date(rawDate);

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hours = date.getHours();
		let minutes = date.getMinutes();

		month < 10 ? (month = `0${month}`) : (month = `${month}`);
		day < 10 ? (day = `0${day}`) : (day = `${day}`);
		hours < 10 ? (hours = `0${hours}`) : (hours = `${hours}`);
		minutes < 10 ? (minutes = `0${minutes}`) : (minutes = `${minutes}`);

		return `${day}-${month}-${year}, ${hours}:${minutes}`;
	};

	const formatTime = rawDate => {
		let date = new Date(rawDate);

		let hours = date.getHours();
		let minutes = date.getMinutes();

		return `${hours}:${minutes}`;
	};

	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);
	const [value, setValue] = useState(new Date());
	const [time, setTime] = useState(formatTime(new Date()));
	console.log('time: ', time);

	const togglePicker = () => {
		setShow(!show);
	};

	const onChange = ({ type }, selectedValue) => {
		if (type == 'set') {
			const currentDate = selectedValue;
			setDate(currentDate);

			if (Platform.OS === 'android') {
				togglePicker();
				setValue(formatDate(currentDate));
				setTime(formatTime(currentDate));
			}
		} else {
			togglePicker();
		}
	};

	const confirmDateIos = () => {
		setValue(formatDate(date));
		setTime(formatTime(date));
		togglePicker();
	};

	return (
		<SafeAreaWrapper>
			<Scroll>
				<Container>
					<Card>
						<CardTitleWrapper>
							<Text textColour='black' fontWeight={700}>
								Bike Stations
							</Text>
						</CardTitleWrapper>
					</Card>
					<View>
						{show && (
							<DateTimePicker
								mode='datetime'
								display='spinner'
								value={date}
								onChange={onChange}
								style={{ height: 120, marginTop: -10 }}
								minimumDate={new Date()}
							/>
						)}
						{show && Platform.OS === 'ios' && (
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
								}}>
								<Button label='Cancel' onPress={togglePicker} />
								<Button label='Confirm' onPress={confirmDateIos} />
							</View>
						)}
						{!show && (
							<Pressable onPress={togglePicker}>
								<Input
									placeholder={'date'}
									editable={false}
									onPressIn={togglePicker}
									value={value}
								/>
							</Pressable>
						)}
					</View>
				</Container>
			</Scroll>
		</SafeAreaWrapper>
	);
};

export default AdminDashboard;
