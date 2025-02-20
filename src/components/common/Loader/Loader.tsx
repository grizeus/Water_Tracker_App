import { RotatingLines, ThreeDots } from 'react-loader-spinner';
// TODO: styles await
import { WrapThreeDotsDiv } from './Loader.styled';

interface Props {
  width: string;
  strokeColor: string;
}

export const Loader = () => {
  return (
    <WrapThreeDotsDiv>
      <ThreeDots
        height="90"
        width="90"
        radius="9"
        color="#407bff"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </WrapThreeDotsDiv>
  );
};

export const ContentLoader = ({
  width = '18px',
  strokeColor = 'white',
}: Props) => {
  return (
    <RotatingLines
      visible={true}
      width={width}
      strokeColor={strokeColor}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
