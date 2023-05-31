import * as Yup from 'yup';

import {
	Body,
	Field,
	ForgotPasswordWrapper,
	KeyboardDismissView,
	LoginWrapper,
	Logo,
	LogoContainer,
	Lower,
	PressableText,
	Upper,
} from './login.styles';
import { Button, Input, SafeAreaWrapper, Text } from '../../components';
import { Keyboard, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import { handleLogin } from '../../redux/action/auth.action';
import { useNavigation } from '@react-navigation/native';

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Please enter a valid email')
		.required('Please enter a valid email'),
	password: Yup.string()
		.min(7, 'The password should be at least 7 characters long.')
		.required('Please enter valid password'),
});

const Login = () => {
	const dispatch = useDispatch();

	const navigation = useNavigation();

	const handleSignUpPress = () => {
		navigation.navigate('register');
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			onSubmit={values => {
				console.log(values);
				const data = {
					email: values.email,
					password: values.password,
				};
				dispatch(handleLogin(data));
			}}
			validationSchema={LoginSchema}
			validateOnBlur={true}>
			{({ handleChange, handleSubmit, values, errors, isValid }) => (
				<SafeAreaWrapper>
					<KeyboardDismissView onPress={Keyboard.dismiss}>
						<Upper behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
							<LoginWrapper>
								<LogoContainer>
									<Logo>LeBikeShare</Logo>
								</LogoContainer>
								<Body>
									<Field fieldMarginBottom={15}>
										<Input
											placeholder='Email'
											onChangeText={handleChange('email')}
											value={values.email}
											autoCapitalize='none'
										/>
									</Field>
									<Field fieldMarginBottom={5}>
										<Input
											placeholder='Password'
											onChangeText={handleChange('password')}
											secureTextEntry={true}
											value={values.password}
											autoCapitalize='none'
										/>
									</Field>
									<ForgotPasswordWrapper>
										<PressableText
											onPress={() => navigation.navigate('forgotPassword')}>
											<Text fontWeight={700}>Forgotten Password?</Text>
										</PressableText>
									</ForgotPasswordWrapper>
								</Body>

								<Button
									label='Log in'
									type='fill'
									colour={!isValid ? '#003566' : '#001d3d'}
									disabled={!isValid}
									onPress={handleSubmit}
								/>
							</LoginWrapper>
						</Upper>
					</KeyboardDismissView>
					<Lower>
						<Text>Don't have an account?</Text>
						<PressableText marginLeft={3} onPress={handleSignUpPress}>
							<Text fontWeight={700} textColour='#0f78b9'>
								Sign up.
							</Text>
						</PressableText>
					</Lower>
				</SafeAreaWrapper>
			)}
		</Formik>
	);
};

export default Login;
