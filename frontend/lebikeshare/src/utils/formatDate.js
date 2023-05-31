const formatDate = date => {
	let tempDate = new Date(date);
	const DD = String(tempDate.getDate()).padStart(2, '0');
	const MM = String(tempDate.getMonth() + 1).padStart(2, '0');
	const YYYY = String(tempDate.getFullYear());
	const HH = String(tempDate.getHours()).padStart(2, '0');
	const mm = String(tempDate.getMinutes()).padStart(2, '0');
	const day = String(tempDate.getDay());

	const dayOfWeek = {
		0: 'Sunday',
		1: 'Monday',
		2: 'Tuesday',
		3: 'Wednesday',
		4: 'Thursday',
		5: 'Friday',
		6: 'Saturday',
	};

	const fDate = `${DD}-${MM}-${YYYY}`;
	const fTime = `${HH}:${mm}`;

	return [fDate, fTime, dayOfWeek[day]];
};

export default formatDate;
