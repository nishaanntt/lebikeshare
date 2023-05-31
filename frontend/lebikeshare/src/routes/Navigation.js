import AuthStack from './AuthStack';
import DrawerNav from './DrawerNav';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const Navigation = () => {
	const authReducer = useSelector(state => state.auth);
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			{authReducer.isLoggedIn ? <DrawerNav /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default Navigation;
