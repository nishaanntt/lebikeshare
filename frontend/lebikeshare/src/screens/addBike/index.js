import * as Yup from 'yup';

import {
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetTextInput,
	TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { Button, Input, Text } from '../../components';
import {
	ButtonWrapper,
	DateWrapper,
	ErrorWrapper,
	Field,
	LabelWrapper,
	ModalClose,
	ModalContainer,
	ModalContentView,
	ModalOption,
	PressableView,
} from './addBike.style';
import {
	Keyboard,
	Modal,
	ScrollView,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { addBike, getBikeList } from '../../redux/action/bike.action';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import { colours } from '../../utils/constants';
import { useEffect } from 'react';
import { useState } from 'react';

const AddBikeSchema = Yup.object().shape({
	bikeNumber: Yup.string().min(3).max(5).required(),
	status: Yup.string()
		.oneOf(['Available', 'Booked', 'Under Maintenance'])
		.required(),
	lastService: Yup.object().shape({
		dd: Yup.number().min(1).max(30),
		mm: Yup.number().min(1).max(12),
		yyyy: Yup.number().max(new Date().getFullYear()),
	}),
});

const AddBike = ({ bottomSheetModalRef, snapPoints }) => {
	const authReducer = useSelector(state => state.auth);
	const bikeStationReducer = useSelector(state => state.bikeStation);
	const dispatch = useDispatch();

	const [bikeStations, setBikeStations] = useState([]);
	console.log('bikeStations: ', bikeStations);

	useEffect(() => {
		setBikeStations(bikeStationReducer.bikeStations.data);
	}, []);

	const [showModal, setShowModal] = useState(false);
	const [station, setStation] = useState({
		name: 'Select',
		stationId: '',
	});
	const [bikeStatus, setBikeStatus] = useState('Available');
	console.log('station: ', station);
	return (
		<Formik
			initialValues={{
				bikeNumber: '',
				status: '',
				lastService: {
					dd: '',
					mm: '',
					yyyy: '',
				},
			}}
			validationSchema={AddBikeSchema}
			onSubmit={(values, { resetForm }) => {
				const data = {
					bikeNumber: values.bikeNumber,
					status: bikeStatus,
					station: station.stationId,
					lastService:
						values.lastService.dd != '' &&
						values.lastService.mm != '' &&
						values.lastService.yyyy != ''
							? `${values.lastService.dd}-${values.lastService.mm}-${values.lastService.yyyy}`
							: '',
				};
				dispatch(
					addBike(data, authReducer.token, () => {
						dispatch(getBikeList(authReducer.token));
						resetForm();
					})
				);
			}}>
			{({ handleChange, handleSubmit, values, errors }) => (
				<View>
					{console.log(errors)}
					<Modal animationType='fade' transparent={true} visible={showModal}>
						<ModalContainer>
							<ModalContentView>
								<ScrollView>
									{bikeStations.map(station => {
										return (
											<ModalOption
												onPress={() => {
													setShowModal(false);
													setStation({
														name: station.name,
														stationId: station._id,
													});
												}}
												key={station._id}>
												<Text>{station.name}</Text>
											</ModalOption>
										);
									})}
								</ScrollView>
								<TouchableOpacity onPress={() => setShowModal(false)}>
									<ModalClose>
										<Text textColour='#123'>Close</Text>
									</ModalClose>
								</TouchableOpacity>
							</ModalContentView>
						</ModalContainer>
					</Modal>
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={0}
						snapPoints={snapPoints}
						handleIndicatorStyle={{
							backgroundColor: colours.dark.white,
						}}
						backgroundStyle={{
							backgroundColor: colours.dark.bg_colour,
							borderWidth: 1,
						}}>
						<BottomSheetScrollView
							style={{
								backgroundColor: colours.dark.secondary,
								padding: 16,
								paddingTop: 20,
							}}>
							<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
								<>
									<View>
										<Field>
											<LabelWrapper>
												<Text>Bike Name</Text>
											</LabelWrapper>
											<ErrorWrapper error={errors.bikeNumber}>
												<Input
													placeholder='Bike Number'
													onChangeText={handleChange('bikeNumber')}
													value={values.bikeNumber}
												/>
											</ErrorWrapper>
										</Field>
										<Field>
											<LabelWrapper>
												<Text>Bike Status</Text>
											</LabelWrapper>
											<ErrorWrapper error={errors.status}>
												<Input
													placeholder='Bike Status'
													onChangeText={handleChange('status')}
													value={values.status}
													autoCapitalize='none'
												/>
											</ErrorWrapper>
										</Field>
										<Field>
											<LabelWrapper>
												<Text>Station</Text>
											</LabelWrapper>
											<ErrorWrapper>
												<TouchableOpacity onPress={() => setShowModal(true)}>
													<PressableView>
														<Text textColour='#4f6d7a'>{station.name}</Text>
													</PressableView>
												</TouchableOpacity>
											</ErrorWrapper>
										</Field>
										<Field>
											<LabelWrapper>
												<Text>Last Service (Optional)</Text>
											</LabelWrapper>
											<DateWrapper>
												<ErrorWrapper error={errors.lastService?.dd}>
													<Input
														placeholder='DD'
														onChangeText={handleChange('lastService.dd')}
														value={values.lastService?.dd}
													/>
												</ErrorWrapper>
												<ErrorWrapper error={errors.lastService?.mm}>
													<Input
														placeholder='MM'
														onChangeText={handleChange('lastService.mm')}
														value={values.lastService?.mm}
													/>
												</ErrorWrapper>
												<ErrorWrapper error={errors.lastService?.yyyy}>
													<Input
														placeholder='YYYY'
														onChangeText={handleChange('lastService.yyyy')}
														value={values.lastService?.yyyy}
													/>
												</ErrorWrapper>
											</DateWrapper>
										</Field>
									</View>
									<ButtonWrapper>
										<Button
											label='Add Bike'
											onPress={handleSubmit}
											colour={colours.dark.bg_colour}
										/>
									</ButtonWrapper>
								</>
							</TouchableWithoutFeedback>
						</BottomSheetScrollView>
					</BottomSheetModal>
				</View>
			)}
		</Formik>
	);
};

export default AddBike;
