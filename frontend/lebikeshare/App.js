import 'react-native-gesture-handler';

import { NativeBaseProvider } from 'native-base';
import Navigation from './src/routes/Navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import configureStore from './src/redux/store';

const STRIPE_KEY =
	'pk_test_51MxZ50GM6SeOIOfhpMGCoA4Mdn7OJWgsEVeMaMd9HFybLlkuFT5nAa4hHxRgLMsOV2zsk0pikFoKo2ys1imYlClV00Qd4KuMsh';

export default function App() {
	const { store, persistor } = configureStore();
	return (
		<NativeBaseProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<StripeProvider publishableKey={STRIPE_KEY}>
						<Navigation />
					</StripeProvider>
				</PersistGate>
			</Provider>
		</NativeBaseProvider>
	);
}
