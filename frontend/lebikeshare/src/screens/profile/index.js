import {
	Body,
	ButtonWrapper,
	Container,
	Field,
	InputWrapper,
} from './profile.style';
import { Button, Input, SafeAreaWrapper, Text } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getUserProfile } from '../../redux/action/user.action';

const Profile = () => {
	const userReducer = useSelector(state => state.user);
	const authReducer = useSelector(state => state.auth);
	const dispatch = useDispatch();

	console.log('userId: ', authReducer.userData._id);

	useEffect(() => {
		dispatch(getUserProfile(authReducer.userData?._id, authReducer.token));
	}, []);

	const user = userReducer.user;
	console.log('user: ', user);

	const [editable, setEditable] = useState(false);
	const [address, setAddress] = useState({});

	const dobString = user?.dateOfBirth;
	const dob = new Date(dobString).toLocaleDateString('en-US');

	const handleButtonPress = () => {
		setEditable(!editable);
		if (editable) {
			// dispatch update user profile api
		}
	};

	useEffect(() => {
		if (user.address) {
			setAddress(user?.address[0]);
		}
	}, [user]);

	return (
		<SafeAreaWrapper>
			<Container>
				<Body>
					<Field>
						<Text>First Name</Text>
						<InputWrapper>
							<Input value={user?.firstName} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Last Name</Text>
						<InputWrapper>
							<Input value={user?.lastName} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Email</Text>
						<InputWrapper>
							<Input value={user?.email} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Mobile</Text>
						<InputWrapper>
							<Input value={user?.mobileNumber} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Date of Birth</Text>
						<InputWrapper>
							<Input value={dob} editable={false} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Address Line 1</Text>
						<InputWrapper>
							<Input value={address?.line1} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Address Line 2 (Optional)</Text>
						<InputWrapper>
							<Input value={address?.line2} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Town</Text>
						<InputWrapper>
							<Input value={address?.town} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>County (Optional)</Text>
						<InputWrapper>
							<Input value={address?.county} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Postcode</Text>
						<InputWrapper>
							<Input value={address?.postcode} editable={editable} />
						</InputWrapper>
					</Field>
					<Field>
						<Text>Country</Text>
						<InputWrapper>
							<Input value={address?.country} editable={false} />
						</InputWrapper>
					</Field>
				</Body>
				{/* <ButtonWrapper>
					<Button
						label={`${editable ? 'Save Changes' : 'Edit Profile'}`}
						onPress={() => handleButtonPress()}
					/>
				</ButtonWrapper> */}
			</Container>
		</SafeAreaWrapper>
	);
};

export default Profile;
