import styled from '@emotion/styled';

export const ModalWrap = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 32px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};

  @media (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
    min-width: 704px;
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    min-width: 1008px;
  }
`;
export const FormText = styled.p`
  color: ${({ theme }) => theme.color.black};
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11; /* 111.111% */
`;
