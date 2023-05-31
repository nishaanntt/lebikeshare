import {
	AuthReducer,
	BikeReducer,
	BikeStationReducer,
	BookingReducer,
	FeedbackReducer,
	PaymentReducer,
	UserReducer,
} from './reducer';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	auth: AuthReducer,
	user: UserReducer,
	bike: BikeReducer,
	bikeStation: BikeStationReducer,
	payment: PaymentReducer,
	booking: BookingReducer,
	feedback: FeedbackReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk, logger);

const configureStore = () => {
	let store = createStore(persistedReducer, middleware);
	let persistor = persistStore(store);
	return { store, persistor };
};

export default configureStore;
