const generatePassword = () => {
	const chars =
		'1234567890!@#$%&*qwertyuiopQWERTYUIOPasdfghjklASDFGHJKLzxcvbnmZXCVBNM';

	let password = '';

	const passLength = 10;

	for (let i = 0; i < passLength; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return password;
};

module.exports = generatePassword;
