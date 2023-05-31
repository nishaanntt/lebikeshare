import { Button, SafeAreaWrapper, Text } from '../../components';
import {
	ButtonContainer,
	TextWrapper,
	VerifyContainer,
} from './verifyEmail.styles';

import { colours } from '../../utils/constants';
import { openInbox } from 'react-native-email-link';

const VerifyEmail = () => {
	return (
		<SafeAreaWrapper>
			<VerifyContainer>
				<TextWrapper marginBottom={20}>
					<Text fontWeight={800} size={28}>
						Thank you for signing up!
					</Text>
				</TextWrapper>
				<TextWrapper marginBottom={10}>
					<Text size={21} fontWeight={600}>
						Verification email sent.
					</Text>
				</TextWrapper>
				<TextWrapper>
					<Text size={18} fontWeight={600}>
						Verification pending.
					</Text>
				</TextWrapper>
			</VerifyContainer>
			<ButtonContainer>
				<Button
					type='fill'
					label='Open Email'
					colour={colours.dark.accent1}
					onPress={() => openInbox()}
				/>
			</ButtonContainer>
		</SafeAreaWrapper>
	);
};

export default VerifyEmail;
