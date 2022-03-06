import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import useTombFinance from '../../hooks/useTombFinance';
import TokenSymbol from '../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const tombFinance = useTombFinance();

  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const displayTombBalance = useMemo(() => getDisplayBalance(tombBalance), [tombBalance]);

  const tshareBalance = useTokenBalance(tombFinance.TSHARE);
  const displayTshareBalance = useMemo(() => getDisplayBalance(tshareBalance), [tshareBalance]);

  const tbondBalance = useTokenBalance(tombFinance.TBOND);
  const displayTbondBalance = useMemo(() => getDisplayBalance(tbondBalance), [tbondBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="CASH" />
          <StyledBalance>
            <StyledValue>{displayTombBalance}</StyledValue>
            <Label text="CASH Available" variant="primary" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="PRINTER" />
          <StyledBalance>
            <StyledValue>{displayTshareBalance}</StyledValue>
            <Label text="PRINTER Available" variant="primary" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="CBOND" />
          <StyledBalance>
            <StyledValue>{displayTbondBalance}</StyledValue>
            <Label text="CBOND Available" variant="primary" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  color: white;
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
