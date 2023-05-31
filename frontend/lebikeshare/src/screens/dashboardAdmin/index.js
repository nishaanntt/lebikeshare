import * as Location from 'expo-location';
import * as Yup from 'yup';

import { Animated, Dimensions, Modal, Platform, View } from 'react-native';
import { Button, Input, SafeAreaWrapper, Text } from '../../components';
import {
	ButtonWrapper,
	CardButtonWrapper,
	CloseButtonWrapper,
	CloseWrapper,
	ErrorWrapper,
	Field,
	LabelWrapper,
	ModalContainer,
	ModalContentView,
	ModalTitleWrapper,
	Row,
} from './bikeStation.style';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
	addBikeStation,
	getBikeStationDetails,
	getBikeStationList,
} from '../../redux/action/bikeStation.action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { Formik } from 'formik';
import { colours } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';

const BikeStationSchema = Yup.object().shape({
	name: Yup.string().min(1).max(50).required(),
	totalSlots: Yup.number().min(1).max(50).required(),
});

const { width } = Dimensions.get('window');

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const BikeStation = () => {
	const authReducer = useSelector(state => state.auth);
	const bikeStationReducer = useSelector(state => state.bikeStation);

	const navigation = useNavigation();

	const dispatch = useDispatch();

	const Toast = useToast();

	const [errorMsg, setErrorMsg] = useState(null);

	const [bikeStations, setBikeStations] = useState([]);

	const [mapRegion, setMapRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});

	const [modalVisible, setModalVisible] = useState(false);

	const [marker, setMarker] = useState();

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

	const handleMapPress = event => {
		const { coordinate } = event.nativeEvent;
		setMarker(coordinate);
		setTimeout(() => {
			setModalVisible(true);
		}, 200);
	};

	const handleModalDismiss = () => {
		setModalVisible(false);
		setMarker(null);
	};

	const handleManagePress = station => {
		dispatch(
			getBikeStationDetails(station._id, authReducer.token, () =>
				navigation.navigate('Bike Station Details', {
					stationId: station._id,
					title: station.name,
				})
			)
		);
	};

	const addBikeStationSuccessCallback = () => {
		setModalVisible(false);
		setMarker(null);
		dispatch(getBikeStationList(authReducer.token));
		Toast.show({
			description: 'Bike station added successfully.',
			width: 'sm',
			backgroundColor: 'green.500',
			duration: 2000,
		});
	};

	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);

	const interpolations = bikeStations?.data?.map((station, index) => {
		const inputRange = [
			(index - 1) * CARD_WIDTH,
			index * CARD_WIDTH,
			(index + 1) * CARD_WIDTH,
		];
		const scale = mapAnimation.interpolate({
			inputRange,
			outputRange: [1, 2.5, 1],
			extrapolate: 'clamp',
		});
		return { scale };
	});

	useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3);
			if (index <= 0) {
				index = 0;
			}

			clearTimeout(regionTimeout);

			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index && bikeStations != undefined) {
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

	const _map = useRef(null);
	const _scrollView = useRef(null);

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
				<Formik
					initialValues={{
						name: '',
						totalSlots: null,
					}}
					validationSchema={BikeStationSchema}
					onSubmit={(values, { resetForm }) => {
						const data = {
							name: values.name,
							location: {
								latitude: marker.latitude,
								longitude: marker.longitude,
							},
							totalSlots: values.totalSlots,
						};
						dispatch(
							addBikeStation(data, authReducer.token, () => {
								setModalVisible(false);
								setMarker(null);
								dispatch(getBikeStationList(authReducer.token));
								Toast.show({
									description: 'Bike station added successfully.',
									width: 'sm',
									backgroundColor: 'green.500',
									duration: 2000,
								});
								resetForm();
							})
						);
					}}>
					{({ handleChange, handleSubmit, values, errors }) => (
						<>
							<Modal
								animationType='fade'
								transparent={true}
								visible={modalVisible}>
								<ModalContainer>
									<ModalContentView>
										<ModalTitleWrapper>
											<Text fontWeight={700} size={18}>
												Add Bike Station
											</Text>
										</ModalTitleWrapper>
										<Field>
											<LabelWrapper>
												<Text>Bike Station Name</Text>
											</LabelWrapper>
											<ErrorWrapper error={errors.name}>
												<Input
													placeholder={'Enter name'}
													onChangeText={handleChange('name')}
													value={values.name}
												/>
											</ErrorWrapper>
										</Field>
										<Field>
											<LabelWrapper>
												<Text>Total Slots</Text>
											</LabelWrapper>
											<ErrorWrapper error={errors.totalSlots}>
												<Input
													placeholder={'Enter number'}
													onChangeText={handleChange('totalSlots')}
													value={values.totalSlots}
												/>
											</ErrorWrapper>
										</Field>
										<ButtonWrapper>
											<Button
												label='Add Bike Station'
												colour={colours.dark.secondary}
												onPress={handleSubmit}
											/>
										</ButtonWrapper>
										<CloseWrapper>
											<CloseButtonWrapper onPress={handleModalDismiss}>
												<Text fontWeight={500}>Dismiss</Text>
											</CloseButtonWrapper>
										</CloseWrapper>
									</ModalContentView>
								</ModalContainer>
							</Modal>
							<MapView
								ref={_map}
								provider={PROVIDER_GOOGLE}
								style={{ flex: 1 }}
								region={mapRegion}
								showsUserLocation={true}
								onLongPress={handleMapPress}
								followsUserLocation={true}
								mapPadding={16}
								loadingEnabled={true}
								zoomControlEnabled={true}
								showsCompass={true}>
								{marker !== null && (
									<Marker
										coordinate={marker}
										draggable
										onDragEnd={() => setModalVisible(true)}
									/>
								)}
								{bikeStations != undefined &&
									bikeStations?.data?.map((station, index) => {
										return (
											<Marker
												key={index}
												coordinate={{
													latitude: station.location.latitude,
													longitude: station.location.longitude,
												}}
												title={station.name}
												onPress={e => {
													e.persist();
													onMarkerPress(e);
												}}
											/>
										);
									})}
							</MapView>
							{bikeStations?.count != 0 && (
								<Animated.ScrollView
									ref={_scrollView}
									horizontal
									scrollEventThrottle={1}
									showsHorizontalScrollIndicator={false}
									style={{
										position: 'absolute',
										bottom: 0,
										left: 0,
										right: 0,
										paddingVertical: 10,
									}}
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
									)}>
									{bikeStations != undefined &&
										bikeStations?.data?.map((station, index) => (
											<View
												key={index}
												style={{
													elevation: 2,
													backgroundColor: '#FFF',
													borderTopLeftRadius: 5,
													borderTopRightRadius: 5,
													marginHorizontal: 10,
													shadowColor: '#000',
													shadowRadius: 5,
													shadowOpacity: 0.3,
													shadowOffset: { x: 2, y: -2 },
													height: CARD_HEIGHT,
													width: CARD_WIDTH,
													overflow: 'hidden',
													marginBottom: 30,
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
														flexDirection: 'row',
														justifyContent: 'space-between',
													}}>
													<View>
														<Row>
															<Text fontWeight={700}>Name:{'  '}</Text>
															<Text>{station.name}</Text>
														</Row>
														{/* <Row>
															<Text fontWeight={700}>Status:{'  '}</Text>
															<Text>{station.status}</Text>
														</Row> */}
														<Row>
															<Text fontWeight={700}>
																Available Slots:{'  '}
															</Text>
															<Text>{station.availableSlots}</Text>
														</Row>
														<Row>
															<Text fontWeight={700}>Total Slots:{'  '}</Text>
															<Text>{station.totalSlots}</Text>
														</Row>
													</View>
													<View
														style={{
															justifyContent: 'center',
														}}>
														<CardButtonWrapper
															onPress={() => handleManagePress(station)}>
															<Text>Manage</Text>
														</CardButtonWrapper>
													</View>
												</View>
											</View>
										))}
								</Animated.ScrollView>
							)}
						</>
					)}
				</Formik>
			)}
		</>
	);
};

export default BikeStation;
