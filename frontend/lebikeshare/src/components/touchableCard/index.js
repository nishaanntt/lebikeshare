import { CardContainer } from './touchableCard.style';
import Text from '../text/text.style';

const TouchableCard = ({
	marginLeft,
	marginRight,
	marginTop,
	marginBottom,
	children,
	onPress = () => {},
}) => {
	return (
		<CardContainer
			marginLeft={marginLeft}
			marginTop={marginTop}
			marginRight={marginRight}
			marginBottom={marginBottom}
			onPress={onPress}>
			{children}
		</CardContainer>
	);
};

export default TouchableCard;
