import * as Yup from 'yup';

import { Button, Input, SafeAreaWrapper, Text } from '../../components';
import {
	ButtonWrapper,
	Container,
	DoBWrapper,
	ErrorWrapper,
	Field,
	FormWrapper,
	HeaderWrapper,
	LabelWrapper,
	Lower,
	Upper,
} from './register.styles';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Toast, useToast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import { PressableText } from '../login/login.styles';
import { colours } from '../../utils/constants';
import { handleRegister } from '../../redux/action/auth.action';
import { useNavigation } from '@react-navigation/native';

const RegisterSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(3, 'The first name should be at least 3 characters long.')
		.max(50, 'Invalid first name.')
		.required('Please enter first name.'),
	lastName: Yup.string()
		.min(3, 'The last name should be at least 3 characters long.')
		.max(50, 'Invalid last name.')
		.required('Please enter last name.'),
	email: Yup.string()
		.email('Please enter a valid email.')
		.required('Please enter a valid email.'),
	mobileNumber: Yup.string()
		.matches(
			/^(?:\+44|0)?(7\d{3}|\(0\)\s?\d{4})\s?\d{3}\s?\d{3}$/,
			'Invalid Phone Number'
		)
		.required('Please enter a valid mobile number.'),
	dateOfBirth: Yup.object().shape({
		dd: Yup.number()
			.min(1, 'Please enter a valid date.')
			.max(30, 'Please enter a valid date.')
			.required('Please enter a valid date.'),
		mm: Yup.number()
			.min(1, 'Please enter a valid month.')
			.max(12, 'Please enter a valid month.')
			.required('Please enter a valid month.'),
		yyyy: Yup.number()
			.max(
				new Date().getFullYear() - 18,
				'You need to be at least 18 years old to register.'
			)
			.required('Please enter a valid year.'),
	}),
	address: Yup.object().shape({
		line1: Yup.string()
			.min(1, 'Please enter a valid address.')
			.max(50, 'Please enter a valid address.')
			.required('Please enter a valid address.'),
		line2: Yup.string()
			.min(1, 'Please enter a valid address.')
			.max(50, 'Please enter a valid address.'),
		town: Yup.string()
			.min(1, 'Please enter a valid Town name.')
			.max(10, 'Please enter a valid town name.')
			.required('Please enter a valid town name.'),
		county: Yup.string()
			.min(1, 'Please enter a valid county.')
			.max(50, 'Please enter a valid county.'),
		postcode: Yup.string()
			.min(6, 'Please enter a valid postcode')
			.max(7, 'Please enter a valid postcode.')
			.required('Please enter a valid postcode.'),
	}),
});

const Register = () => {
	const navigation = useNavigation();

	const authReducer = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const toast = useToast();

	const callbackSuccess = () => {
		toast.show({
			description:
				'Registered successfully. Check your inbox for your verification link.',
			width: 'sm',
			backgroundColor: 'green.500',
			duration: 7000,
		});
		navigation.navigate('login');
	};

	const callbackFail = () => {
		toast.show({
			description: 'Request Failed',
			width: 'sm',
			backgroundColor: 'red.500',
		});
	};

	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
				mobileNumber: '',
				dateOfBirth: {
					dd: '',
					mm: '',
					yyyy: '',
				},
				address: {
					line1: '',
					line2: '',
					town: '',
					county: '',
					postcode: '',
					country: 'United Kingdom',
				},
			}}
			validationSchema={RegisterSchema}
			onSubmit={values => {
				const {
					firstName,
					lastName,
					email,
					mobileNumber,
					dateOfBirth,
					address,
				} = values;
				const data = {
					firstName,
					lastName,
					email,
					mobileNumber,
					dateOfBirth: `${dateOfBirth.dd}-${dateOfBirth.mm}-${dateOfBirth.yyyy}`,
					address,
				};
				dispatch(handleRegister(data, callbackSuccess, callbackFail));
			}}>
			{({ handleChange, handleSubmit, values, errors }) => (
				<SafeAreaWrapper>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<Container>
							<Upper>
								<HeaderWrapper>
									<Text fontWeight={700} size={24}>
										Sign Up
									</Text>
								</HeaderWrapper>
								<FormWrapper>
									<Field>
										<LabelWrapper>
											<Text>First Name</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.firstName}>
											<Input
												placeholder='First Name'
												onChangeText={handleChange('firstName')}
												value={values.firstName}
											/>
										</ErrorWrapper>
									</Field>

									<Field>
										<LabelWrapper>
											<Text>Last Name</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.lastName}>
											<Input
												placeholder='Last Name'
												onChangeText={handleChange('lastName')}
												value={values.lastName}
											/>
										</ErrorWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>Email</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.email}>
											<Input
												placeholder='Email'
												onChangeText={handleChange('email')}
												value={values.email}
												autoCapitalize='none'
											/>
										</ErrorWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>Mobile</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.mobileNumber}>
											<Input
												placeholder='Mobile'
												onChangeText={handleChange('mobileNumber')}
												value={values.mobileNumber}
											/>
										</ErrorWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>Date of Birth </Text>
										</LabelWrapper>
										<DoBWrapper>
											<ErrorWrapper error={errors.dateOfBirth?.dd}>
												<Input
													placeholder='DD'
													onChangeText={handleChange('dateOfBirth.dd')}
													value={values.dateOfBirth.dd}
												/>
											</ErrorWrapper>
											<ErrorWrapper error={errors.dateOfBirth?.mm}>
												<Input
													placeholder='MM'
													onChangeText={handleChange('dateOfBirth.mm')}
													value={values.dateOfBirth.mm}
												/>
											</ErrorWrapper>
											<ErrorWrapper error={errors.dateOfBirth?.yyyy}>
												<Input
													placeholder='YYYY'
													onChangeText={handleChange('dateOfBirth.yyyy')}
													value={values.dateOfBirth.yyyy}
												/>
											</ErrorWrapper>
										</DoBWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>Address Line 1</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.address?.line1}>
											<Input
												placeholder='Address Line 1'
												onChangeText={handleChange('address.line1')}
												value={values.address.line1}
											/>
										</ErrorWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>Address Line 2 (Optional)</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.address?.line2}>
											<Input
												placeholder='Address Line 2'
												onChangeText={handleChange('address.line2')}
												value={values.address.line2}
											/>
										</ErrorWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>Town</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.address?.town}>
											<Input
												placeholder='Town'
												onChangeText={handleChange('address.town')}
												value={values.address.town}
											/>
										</ErrorWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>County (Optional)</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.address?.county}>
											<Input
												placeholder='County'
												onChangeText={handleChange('address.county')}
												value={values.address.county}
											/>
										</ErrorWrapper>
									</Field>
									<Field>
										<LabelWrapper>
											<Text>Postcode</Text>
										</LabelWrapper>
										<ErrorWrapper error={errors.address?.postcode}>
											<Input
												placeholder='Postcode'
												onChangeText={handleChange('address.postcode')}
												value={values.address.postcode}
											/>
										</ErrorWrapper>
									</Field>
								</FormWrapper>
								<ButtonWrapper>
									<Button
										label='Sign up'
										type='fill'
										colour={colours.dark.secondary}
										onPress={handleSubmit}
									/>
								</ButtonWrapper>
							</Upper>
							<Lower>
								<Text>Already have an account?</Text>
								<PressableText
									marginLeft={3}
									onPress={() => navigation.navigate('login')}>
									<Text fontWeight={700} textColour='#0f78b9'>
										Log in.
									</Text>
								</PressableText>
							</Lower>
						</Container>
					</TouchableWithoutFeedback>
				</SafeAreaWrapper>
			)}
		</Formik>
	);
};

export default Register;
