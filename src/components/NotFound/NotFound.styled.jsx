import styled from '@emotion/styled';

export const ErrorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

export const StyledPicture = styled.picture`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 150px;
`;

export const ErrorBtn = styled.button`
  background-color: ${({ theme }) => theme.color.accent};
  color: ${props => props.theme.color.white};
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 18px;
  height: 44px;
  box-shadow: 0px 4px 8px 0px rgba(64, 123, 255, 0.34);
  transition: background-color ${({ theme }) => theme.transition.main};

  height: auto;
  width: auto; 
  min-width: 130px; 
  max-width: 100%; 

  &:hover {
    box-shadow: 0px 4px 14px 0px rgba(64, 123, 255, 0.54);
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: 16px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: 20px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    font-size: 24px;
  }
`;
