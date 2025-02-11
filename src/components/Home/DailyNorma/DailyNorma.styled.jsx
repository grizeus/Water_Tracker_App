import styled from '@emotion/styled';

export const Section = styled.section`
  display: none;
`;

export const DailyWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 0;
  border: 1px solid #ecf2ff;
  border-radius: 10px;
  padding: 8px 0;
  padding-left: 20px;
  margin-top: 24px;
  margin-bottom: 8px;
  width: 164px;

  box-shadow: 0 4px 8px 0 rgba(158, 187, 255, 0.12);
  background: #fff;

  @media screen and (min-width: 768px) and (max-width: 1439px) {
    top: 16px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const TitleForm = styled.h3`
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.33333;
  color: #2f2f2f;
`;

export const ButtonEdit = styled.button`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  color: #8baeff;
  background-color: inherit;
  cursor: pointer;
`;

export const Description = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: #407bff;
`;
