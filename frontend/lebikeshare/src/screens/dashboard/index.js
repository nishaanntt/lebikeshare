import * as Location from 'expo-location';

import {
	Animated,
	Dimensions,
	Platform,
	TouchableOpacity,
	View,
} from 'react-native';
import { Button, SafeAreaWrapper, Text } from '../../components';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
	getBikeStationDetails,
	getBikeStationList,
} from '../../redux/action/bikeStation.action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { Row } from './dashboard.styles';
import StationCard from './stationCard';
import { colours } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';

const { width } = Dimensions.get('window');

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Dashboard = () => {
	const authReducer = useSelector(state => state.auth);
	const bikeStationReducer = useSelector(state => state.bikeStation);

	const navigation = useNavigation();

	const dispatch = useDispatch();

	const Toast = useToast();

	const [mapRegion, setMapRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});

	const [errorMsg, setErrorMsg] = useState(null);
	const [bikeStations, setBikeStations] = useState([]);
	console.log('bikeStations: ', bikeStations);

	const userLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied.');
			return;
		}

		let location = await Location.getCurrentPositionAsync();
		setMapRegion({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		});
	};

	useEffect(() => {
		userLocation();
	}, []);

	useEffect(() => {
		dispatch(getBikeStationList(authReducer.token));
	}, []);

	useEffect(() => {
		setBikeStations(bikeStationReducer?.bikeStations);
	}, [bikeStationReducer]);

	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);

	const _map = useRef(null);
	const _scrollView = useRef(null);

	useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3);
			if (index <= 0) {
				index = 0;
			}

			clearTimeout(regionTimeout);

			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index && bikeStations !== undefined) {
					mapIndex = index;
					const { location } = bikeStations?.data[index];
					_map.current.animateToRegion(
						{
							...location,
							latitudeDelta: mapRegion.latitudeDelta,
							longitudeDelta: mapRegion.longitudeDelta,
						},
						350
					);
				}
			}, 10);
		});
	});

	const onMarkerPress = mapEventData => {
		const markerId = mapEventData._targetInst.return.key;

		let x = markerId * CARD_WIDTH + markerId * 20;
		if (Platform.OS === 'ios') {
			x = x - SPACING_FOR_CARD_INSET;
		}
		_scrollView.current.scrollTo({ x: x, y: 0, animated: true });
	};

	const handleBookingPress = station => {
		dispatch(
			getBikeStationDetails(station._id, authReducer.token, () => {
				navigation.navigate('bookingStack', {
					screen: 'newBooking',
					params: { station },
				});
			})
		);
	};

	return (
		<>
			{errorMsg ? (
				<SafeAreaWrapper>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							flex: 1,
							padding: 16,
						}}>
						<Text fontWeight={900} size={18} textAlign='center'>
							Location permission required to continue.
						</Text>
					</View>
				</SafeAreaWrapper>
			) : (
				<>
					<MapView
						ref={_map}
						provider={PROVIDER_GOOGLE}
						style={{ flex: 1 }}
						region={mapRegion}
						showsUserLocation={true}
						followsUserLocation={true}
						mapPadding={16}
						loadingEnabled={true}
						zoomControlEnabled={true}
						showsCompass={true}>
						{bikeStations != undefined &&
							bikeStations?.data?.map((station, index) => (
								<Marker
									key={index}
									coordinate={station.location}
									title={station.name}
									description={`Available Bikes: ${
										station.totalSlots - station.availableSlots
									}`}
									onPress={e => {
										e.persist();
										onMarkerPress(e);
									}}
								/>
							))}
					</MapView>
					<Animated.ScrollView
						horizontal
						ref={_scrollView}
						scrollEventThrottle={1}
						pagingEnabled
						snapToInterval={CARD_WIDTH + 20}
						snapToAlignment={'center'}
						contentInset={{
							top: 0,
							left: SPACING_FOR_CARD_INSET,
							bottom: 0,
							right: SPACING_FOR_CARD_INSET,
						}}
						contentContainerStyle={{
							paddingHorizontal:
								Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
						}}
						style={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							paddingVertical: 10,
						}}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: {
											x: mapAnimation,
										},
									},
								},
							],
							{
								useNativeDriver: true,
							}
						)}
						showsHorizontalScrollIndicator={false}>
						{bikeStations != undefined &&
							bikeStations?.data?.map((station, index) => {
								return (
									<StationCard
										station={station}
										key={index}
										onPress={() => handleBookingPress(station)}
									/>
								);
							})}
					</Animated.ScrollView>
				</>
			)}
		</>
	);
};

export default Dashboard;
