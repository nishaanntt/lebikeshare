import { Container } from './card.styles';

const Card = ({
	marginLeft,
	marginRight,
	marginTop,
	marginBottom,
	children,
}) => {
	return (
		<Container
			marginLeft={marginLeft}
			marginTop={marginTop}
			marginRight={marginRight}
			marginBottom={marginBottom}>
			{children}
		</Container>
	);
};

export default Card;
