import * as Yup from 'yup';

import { Button, Input, SafeAreaWrapper, Text } from '../../components';
import {
	ButtonContainer,
	Container,
	InputContainer,
	TextContainer,
	TitleWrapper,
} from './forgotPassword.styles';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorWrapper } from '../register/register.styles';
import { Formik } from 'formik';
import { colours } from '../../utils/constants';
import { forgotPassword } from '../../redux/action/auth.action';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useToast } from 'native-base';

const ValidationSchema = Yup.object().shape({
	email: Yup.string().email().required(),
});

const ForgotPassword = () => {
	const authReducer = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const toast = useToast();

	const callback = () => {
		toast.show({
			description:
				'If the email is registered with us, check for the otp received on the email.',
			backgroundColor: 'green.500',
			width: 'sm',
		});
		navigation.navigate('resetPasswordOtp');
	};

	return (
		<Formik
			initialValues={{
				email: '',
			}}
			validationSchema={ValidationSchema}
			onSubmit={values => {
				const { email } = values;
				dispatch(forgotPassword(email, callback));
			}}>
			{({ handleChange, handleSubmit, values, errors }) => (
				<SafeAreaWrapper>
					<Container>
						<TitleWrapper>
							<Text size={24} fontWeight={700}>
								Trouble Logging In?
							</Text>
						</TitleWrapper>
						<TextContainer>
							<Text textAlign='center'>
								Enter your registered email address and we'll send you an OTP to
								get back into your account.
							</Text>
						</TextContainer>
						<InputContainer>
							<ErrorWrapper error={errors.email}>
								<Input
									placeholder={'Email'}
									value={values.email}
									onChangeText={handleChange('email')}
									autoCapitalize='none'
								/>
							</ErrorWrapper>
						</InputContainer>
						<ButtonContainer>
							<Button
								label='Submit'
								colour={colours.dark.secondary}
								onPress={handleSubmit}
							/>
						</ButtonContainer>
					</Container>
				</SafeAreaWrapper>
			)}
		</Formik>
	);
};

export default ForgotPassword;
