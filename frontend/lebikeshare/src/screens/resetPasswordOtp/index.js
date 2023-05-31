import { Button, Input, SafeAreaWrapper, Text } from '../../components';
import {
	ButtonContainer,
	Container,
	InputContainer,
	InputWrapper,
	TextContainer,
	TitleWrapper,
} from './resetPasswordOtp.styles';
import { useDispatch, useSelector } from 'react-redux';

import { colours } from '../../utils/constants';
import { resetPassword } from '../../redux/action/auth.action';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const ResetPasswordOtp = () => {
	const [otp, setOtp] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handlePasswordChange = val => {
		setNewPassword(val);
	};

	const handleConfirmPasswordChange = val => {
		setConfirmPassword(val);
	};

	const handleOtpChange = val => {
		setOtp(val);
	};

	const handleSubmit = () => {
		if (otp !== '' && newPassword !== '' && confirmPassword !== '') {
			dispatch(
				resetPassword(
					otp,
					newPassword,
					confirmPassword,
					() => navigation.navigate('login'),
					() => {}
				)
			);
		}
	};

	return (
		<SafeAreaWrapper>
			<Container>
				<TitleWrapper>
					<Text fontWeight={700} size={24}>
						Reset Password
					</Text>
				</TitleWrapper>
				<TextContainer>
					<Text textAlign='center'>
						Please enter the OTP received on your registered email. The OTP is
						valid for 15 minutes.
					</Text>
				</TextContainer>
				<InputContainer>
					<InputWrapper>
						<Input
							placeholder={'OTP'}
							value={otp}
							onChangeText={val => handleOtpChange(val)}
						/>
					</InputWrapper>
					<InputWrapper>
						<Input
							placeholder={'New Password'}
							value={newPassword}
							onChangeText={val => handlePasswordChange(val)}
						/>
					</InputWrapper>
					<InputWrapper>
						<Input
							placeholder={'Confirm Password'}
							value={confirmPassword}
							onChangeText={val => handleConfirmPasswordChange(val)}
						/>
					</InputWrapper>
				</InputContainer>
				<ButtonContainer>
					<Button
						label='Submit'
						onPress={handleSubmit}
						colour={colours.dark.secondary}
					/>
				</ButtonContainer>
			</Container>
		</SafeAreaWrapper>
	);
};

export default ResetPasswordOtp;
