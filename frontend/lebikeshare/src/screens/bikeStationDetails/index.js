import * as Yup from 'yup';

import {
	Bike,
	BikeList,
	BikeListTitleWrapper,
	BikeListWrapper,
	Container,
	ErrorWrapper,
	Field,
	LabelWrapper,
	Lower,
	ModalContainer,
	ModalContentView,
	ModalOption,
	Row,
	Separator,
	SeparatorWrapper,
	TouchableView,
} from './bikeStationDetails.style';
import {
	Button,
	Input,
	SafeAreaWrapper,
	Text,
	TouchableCard,
} from '../../components';
import { Modal, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Formik } from 'formik';
import { colours } from '../../utils/constants';

const BikeStationSchema = Yup.object().shape({
	name: Yup.string().min(3).max(50).required(),
	totalSlots: Yup.number().min(0).max(50).required(),
});

const BikeStationDetails = () => {
	const authReducer = useSelector(state => state.auth);
	const bikeStationReducer = useSelector(state => state.bikeStation);

	const bikeStation = bikeStationReducer.bikeStation;
	const bikes = bikeStation.bikes;

	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);

	const statusOptions = ['Active', 'Inactive'];

	const [statusValue, setStatusValue] = useState(bikeStation?.data.status);

	const [isEdit, setIsEdit] = useState(false);

	const handleModalOptionPress = status => {
		setShowModal(false);
		setStatusValue(status);
	};

	const handleModalPress = () => {
		if (isEdit) {
			setShowModal(true);
		}
	};

	return (
		<Formik
			initialValues={{
				name: bikeStation.data.name,
				totalSlots: bikeStation.data.totalSlots,
			}}
			validationSchema={BikeStationSchema}
			onSubmit={values => {
				setIsEdit(!isEdit);
				console.log(JSON.stringify(values));
			}}>
			{({ handleChange, handleSubmit, errors, values }) => (
				<>
					<Modal animationType='fade' transparent visible={showModal}>
						<ModalContainer>
							<ModalContentView>
								<ScrollView>
									{statusOptions.map((status, index) => (
										<ModalOption
											onPress={() => handleModalOptionPress(status)}
											key={index}>
											<Text>{status}</Text>
										</ModalOption>
									))}
								</ScrollView>
							</ModalContentView>
						</ModalContainer>
					</Modal>
					<SafeAreaWrapper>
						<Container>
							<Field>
								<LabelWrapper>
									<Text>Station Name</Text>
								</LabelWrapper>
								<ErrorWrapper error={errors.name}>
									<Input
										placeholder='Enter name'
										value={values.name}
										onChangeText={handleChange('name')}
										editable={isEdit}
									/>
								</ErrorWrapper>
							</Field>
							<Field>
								<LabelWrapper>
									<Text>Status</Text>
								</LabelWrapper>
								<ErrorWrapper>
									<TouchableView onPress={handleModalPress}>
										<Text textColour={'black'}>{statusValue}</Text>
									</TouchableView>
								</ErrorWrapper>
							</Field>
							<Field>
								<LabelWrapper>
									<Text>Total Slots</Text>
								</LabelWrapper>
								<ErrorWrapper error={errors.totalSlots}>
									<Input
										placeholder='Enter number'
										value={values.totalSlots.toString()}
										onChangeText={handleChange('totalSlots')}
										editable={isEdit}
									/>
								</ErrorWrapper>
							</Field>
							<Field>
								<LabelWrapper>
									<Text>Available Slots</Text>
								</LabelWrapper>
								<ErrorWrapper>
									<Input
										placeholder={'Enter number'}
										value={bikeStation?.data.availableSlots.toString()}
										editable={false}
									/>
								</ErrorWrapper>
							</Field>
							<SeparatorWrapper>
								<Separator />
							</SeparatorWrapper>
							<BikeListWrapper>
								<BikeListTitleWrapper>
									<Text fontWeight={700}>Bikes in Station</Text>
								</BikeListTitleWrapper>
								<BikeList>
									{bikes.map(bike => {
										console.log('bike: ', bike);
										return (
											<TouchableCard
												key={bike._id}
												onPress={() => {}}
												marginBottom={10}>
												<Row>
													<Text fontWeight={700}>Bike Number:{'  '}</Text>
													<Text>{bike.bikeNumber}</Text>
												</Row>
												<Row>
													<Text fontWeight={700}>Status:{'  '}</Text>
													<Text>{bike.status}</Text>
												</Row>
												<Row>
													<Text fontWeight={700}>Last Service:{'  '}</Text>
													<Text>
														{bike.lastService
															? bike.lastService
															: 'Not Available'}
													</Text>
												</Row>
											</TouchableCard>
										);
									})}
								</BikeList>
							</BikeListWrapper>
						</Container>
						<Lower>
							<Button
								label={isEdit ? 'Save Changes' : 'Edit Details'}
								colour={colours.dark.secondary}
								onPress={isEdit ? handleSubmit : () => setIsEdit(!isEdit)}
							/>
						</Lower>
					</SafeAreaWrapper>
				</>
			)}
		</Formik>
	);
};

export default BikeStationDetails;
