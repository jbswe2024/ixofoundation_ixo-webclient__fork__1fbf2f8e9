import PolygonIcon from 'assets/images/polygon-icon.svg'
import XIcon from 'assets/images/x-icon.svg'
import { DashboardThemeContext, ThemeContext } from 'components/Dashboard/Dashboard'
import React, { FunctionComponent, useContext, useState } from 'react'
import styled from 'styled-components'

interface ValueProps {
  value: string
  contractId?: string
  preIcon?: boolean
}

const ValueComponentContainer = styled.div<{ theme: ThemeContext }>`
  background: ${({ theme }): string => (theme.isDark ? '#143F54' : '#e9edf5')};
  // padding-left: 2em;
  position: relative;
`

const StyledValueContainer = styled.div`
  padding: 0.8em 4em 0.8em 0;
  align-items: center;
  flex-direction: column;
  display: flex;
  img {
    margin-right: 1em;
  }
  span {
    line-height: 120%;
  }
`

const StyledEyeContainer = styled.div<{ theme: ThemeContext }>`
  position: absolute;
  cursor: pointer;
  height: 100%;
  right: 0;
  top: 0;
  background-color: ${({ theme }): string => (theme.isDark ? '#107591' : '#e9edf5')};
  width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 3px solid transparent;
`

const ValueCell: FunctionComponent<ValueProps> = ({ value, contractId, preIcon = true }) => {
  const theme = useContext(DashboardThemeContext)
  const [, setWalletModalOpen] = useState(false)
  // const [createPaymentTemplateModalOpen, setCreatePaymentTemplateModalOpen] = useState(false)
  // const [createPaymentContractModalOpen, setCreatePaymentContractModalOpen] = useState(false)
  // const [makePaymentModalOpen, setMakePaymentModalOpen] = useState(false)

  return (
    <>
      <ValueComponentContainer theme={theme}>
        <StyledValueContainer>
          {preIcon && <img alt='' src={XIcon} />}
          <span>{value.match(/(.*) (\(\d+\))/)![1]}</span>
          <span>{value.match(/(.*) (\(\d+\))/)![2]}</span>
        </StyledValueContainer>
        <StyledEyeContainer theme={theme} onClick={(): void => setWalletModalOpen(true)}>
          <img alt='' src={PolygonIcon} />
        </StyledEyeContainer>
      </ValueComponentContainer>
      {/* <ModalWrapper
        isModalOpen={createPaymentTemplateModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreatePaymentTemplateModalOpen(false)}
      >
        <CreatePaymentTemplateModal entityDid={entityDid!} paymentCoins={paymentCoins as any} />
      </ModalWrapper> */}
      {/* <ModalWrapper
        isModalOpen={createPaymentContractModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreatePaymentContractModalOpen(false)}
      >
        <CreatePaymentContractModal entityDid={entityDid!} paymentCoins={paymentCoins as any} />
      </ModalWrapper> */}
      {/* <ModalWrapper
        isModalOpen={makePaymentModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setMakePaymentModalOpen(false)}
      >
        <MakePaymentModal
          entityDid={entityDid!}
          accountAddress={selectedAddress!}
          walletType={walletType!}
          contractId={contractId!}
          handleCreateTemplate={(): void => {
            setMakePaymentModalOpen(false)
            setModalTitle('Create a Payment Template')
            setCreatePaymentTemplateModalOpen(true)
          }}
          handleCreateContract={(): void => {
            setMakePaymentModalOpen(false)
            setModalTitle('Create a Payment Contract')
            setCreatePaymentContractModalOpen(true)
          }}
          handleCancelContract={(): void => {
            setMakePaymentModalOpen(false)
          }}
        />
      </ModalWrapper> */}
    </>
  )
}

export default ValueCell