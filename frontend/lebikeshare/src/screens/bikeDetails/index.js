import { Button, Input, SafeAreaWrapper, Text } from '../../components';
import {
	Cancel,
	Confirm,
	Container,
	ErrorWrapper,
	Field,
	LabelWrapper,
	Lower,
	ModalContainer,
	ModalContentView,
	ModalLower,
	ModalUpper,
} from './bikeDetails.style';
import { deleteBike, getBikeList } from '../../redux/action/bike.action';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-native';
import { colours } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useToast } from 'native-base';

const BikeDetails = () => {
	const bikeReducer = useSelector(state => state.bike);
	const authReducer = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const data = bikeReducer.bike.data;
	const navigation = useNavigation();
	const Toast = useToast();

	const [showModal, setShowModal] = useState(false);

	const handleConfirmDeletePress = () => {
		dispatch(
			deleteBike(
				authReducer.token,
				data._id,
				() => {
					dispatch(getBikeList(authReducer.token));
					navigation.goBack();
				},
				() => {
					setShowModal(false);
					Toast.show({
						description: 'Something went wrong.',
						backgroundColor: 'red.500',
						width: 'sm',
						duration: 2500,
					});
				}
			)
		);
	};
	return (
		<SafeAreaWrapper>
			<Modal animationType='fade' transparent visible={showModal}>
				<ModalContainer>
					<ModalContentView>
						<ModalUpper>
							<Text fontWeight={700}>
								Are you sure you want to delete the bike?
							</Text>
						</ModalUpper>
						<ModalLower>
							<Cancel onPress={() => setShowModal(false)}>
								<Text>Dismiss</Text>
							</Cancel>
							<Confirm onPress={handleConfirmDeletePress}>
								<Text>Confirm</Text>
							</Confirm>
						</ModalLower>
					</ModalContentView>
				</ModalContainer>
			</Modal>
			<Container>
				<Field>
					<LabelWrapper>
						<Text fontWeight={600}>Bike Number</Text>
					</LabelWrapper>
					<ErrorWrapper>
						<Input
							placeholder={'Bike Number'}
							editable={false}
							value={data.bikeNumber}
						/>
					</ErrorWrapper>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={600}>Bike Station</Text>
					</LabelWrapper>
					<ErrorWrapper>
						<Input
							placeholder={'Bike Number'}
							editable={false}
							value={data.station.name}
						/>
					</ErrorWrapper>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={600}>Last Service</Text>
					</LabelWrapper>
					<ErrorWrapper>
						<Input
							placeholder={'Bike Number'}
							editable={false}
							value={data.lastService ? data.lastService : 'Not Available'}
						/>
					</ErrorWrapper>
				</Field>
				<Field>
					<LabelWrapper>
						<Text fontWeight={600}>Status</Text>
					</LabelWrapper>
					<ErrorWrapper>
						<Input
							placeholder={'Bike Number'}
							editable={false}
							value={data.status}
						/>
					</ErrorWrapper>
				</Field>
			</Container>
			<Lower>
				<Button
					label='Delete Bike'
					colour={colours.dark.secondary}
					onPress={() => setShowModal(true)}
				/>
			</Lower>
		</SafeAreaWrapper>
	);
};

export default BikeDetails;
