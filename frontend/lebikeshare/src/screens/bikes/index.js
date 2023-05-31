import { Button, SafeAreaWrapper } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import AddBike from '../addBike';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Container } from './bikes.style';
import { FlashList } from '@shopify/flash-list';
import RenderItem from './Flashlist.item';
import { View } from 'react-native';
import { colours } from '../../utils/constants';
import { getBikeList } from '../../redux/action/bike.action';

const Bikes = () => {
	const authReducer = useSelector(state => state.auth);
	const bikeReducer = useSelector(state => state.bike);
	const paymentReducer = useSelector(state => state.payment);
	console.log('paymentReducer: ', paymentReducer);
	const dispatch = useDispatch();

	const [bikes, setBikes] = useState();
	console.log('bikes: ', bikes);

	useEffect(() => {
		dispatch(getBikeList(authReducer.token));
	}, []);

	useEffect(() => {
		setBikes(bikeReducer.bikes);
	}, [bikeReducer]);

	const bikeCount = bikes?.count;
	console.log('bikeCount: ', bikeCount);

	const bottomSheetModalRef = useRef(null);
	const snapPoints = ['65%', '100%'];

	const handlePresentModal = () => {
		bottomSheetModalRef.current?.present();
	};

	return (
		<BottomSheetModalProvider>
			<SafeAreaWrapper>
				<Container>
					<FlashList
						data={bikes?.data}
						renderItem={({ item }) => <RenderItem data={item} key={item._id} />}
						estimatedItemSize={63}
					/>
					<AddBike
						bottomSheetModalRef={bottomSheetModalRef}
						snapPoints={snapPoints}
					/>
				</Container>
				<View style={{ padding: 16 }}>
					<Button
						label='Add Bike'
						colour={colours.dark.secondary}
						onPress={handlePresentModal}
					/>
				</View>
			</SafeAreaWrapper>
		</BottomSheetModalProvider>
	);
};

export default Bikes;
