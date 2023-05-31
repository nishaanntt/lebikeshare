import { Login, Register, ResetPasswordOtp, VerifyEmail } from '../screens';

import ForgotPassword from '../screens/forgottenPassword';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='login'
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='register'
				component={Register}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='verifyEmail'
				component={VerifyEmail}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='forgotPassword'
				component={ForgotPassword}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='resetPasswordOtp'
				component={ResetPasswordOtp}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;
