import { useState } from 'react';

const DTPicker = () => {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');

	const [show, setShow] = useState(false);
};

export default DTPicker;
