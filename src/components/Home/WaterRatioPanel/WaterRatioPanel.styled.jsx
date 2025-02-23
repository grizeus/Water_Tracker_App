import styled from "@emotion/styled";

export const WaterRange = styled.input`
  &[type="range"] {
    appearance: none;
    width: 100%;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.color.secondaryPowderBlue};
    background-image: linear-gradient(
      ${({ theme }) => theme.color.secondaryLightBlue},
      ${({ theme }) => theme.color.secondaryLightBlue}
    );
    background-repeat: no-repeat;
  }

  &[type="range"]:focus {
    outline: none;
  }

  &[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    animation: 0.2s;
    border-radius: 10px;
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  &[type="range"]::-webkit-slider-thumb {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.white};
    border: solid 1px ${({ theme }) => theme.color.accent};
    -webkit-appearance: none;
    margin-top: -4px;
  }
`;

export const WaterRangeContainer = styled.div`
  position: relative;
  height: 102px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 356px;
    height: 90px;
  }
`;

export const Mark = styled.span`
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  margin-bottom: 4px;
  gap: 4px;
  color: ${({ theme }) => theme.color.accent};

  &::before {
    content: "|";
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.secondaryLightBlue};
  }
`;

export const LeftMark = styled.span`
  transform: translateX(-50%);
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.color.accent};

  &::before {
    content: "|";
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.color.secondaryLightBlue};
  }
`;

export const RightMark = styled.span`
  transform: translateX(50%);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.color.accent};

  &::before {
    content: "|";
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.secondaryLightBlue};
  }
`;

export const AddWaterButton = styled.button`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 6px 76px 6px 76px;
  background-color: ${({ theme }) => theme.color.accent};
  color: #fff;
  border: none;
  box-shadow: ${({ theme }) => theme.boxShadowforButton.normalButton};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadowforButton.hoverButton};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 336px;
    padding: 10px 104px 10px 104px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    width: 178px;
    height: 44px;
    padding: 10px 30px 10px 30px;
  }
`;
