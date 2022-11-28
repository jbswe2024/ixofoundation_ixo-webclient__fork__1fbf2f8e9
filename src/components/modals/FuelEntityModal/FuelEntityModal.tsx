import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import AmountInput from 'common/components/AmountInput/AmountInput'
import { tokenBalance } from 'modules/Account/Account.utils'
import BigNumber from 'bignumber.js'
import CheckIcon from 'assets/images/icon-check.svg'
import { ReactComponent as QRCodeIcon } from 'assets/images/modal/qrcode.svg'
import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import { Container, NextStep, PrevStep, CheckWrapper, OverlayWrapper, Divider } from '../styles'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SignStep, TXStatus, TokenSelector, ModalInput } from '../common'
import { useAccount } from 'modules/Account/Account.hooks'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import useSelectedEntity from 'modules/Entities/SelectedEntity/SelectedEntity.hooks'

const NetworkFee = styled.div`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  color: #83d9f2;
  strong {
    font-weight: bold;
  }
`

const CreditMethodWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;

  button {
    cursor: pointer;
    background: #03324a;
    border: 1px solid #25758f;
    box-sizing: border-box;
    box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 10px;
    width: 100px;
    margin: 0 10px;

    color: #ffeeee;
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    transition: all 0.2s;

    &:focus {
      outline: unset !important;
    }
    &:hover {
      color: #ffeeee !important;
    }
    &.inactive {
      color: #537b8e;
    }
    &.active {
      border: 1px solid ${(props): string => props.theme.ixoBlue};
    }
  }
`

const MaxButton = styled.div`
  border-radius: 13px;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  background-color: ${(props): string => props.theme.ixoBlue};
  padding: 5px 15px;
  margin: 0px 5px;
  cursor: pointer;
`

enum CreditMethod {
  ADD = 'Add',
  WITHDRAW = 'Withdraw',
}
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const FuelEntityModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { balances } = useAccount()
  const { address: entityAddress } = useSelectedEntity()

  const [steps, setSteps] = useState<string[]>(['Credit', 'Amount', 'Order', 'Sign'])
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentMethod, setCurrentMethod] = useState<CreditMethod | null>(null)
  const [amount, setAmount] = useState<number | null>(null)
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string>('')
  const [title, setTitle] = useState('Credit')

  const canNext: boolean = useMemo(() => {
    switch (currentStep) {
      case 1:
        if (amount && amount > 0) {
          return true
        }
        return false
      case 2:
        return true
      default:
        return false
    }
  }, [currentStep, amount])

  const canPrev: boolean = useMemo(() => {
    switch (currentStep) {
      case 1:
      case 2:
        return true
      default:
        return false
    }
  }, [currentStep])

  const handleAmountChange = (event: any): void => {
    setAmount(event.target.value)
  }

  const handleMaxClick = (): void => {
    setAmount(new BigNumber(tokenBalance(balances, selectedCoin!.denom!).amount!).toNumber() - 0.005)
  }

  const handlePrevStep = (): void => {
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = (): void => {
    setCurrentStep(currentStep + 1)
    // if (currentStep === 2) {
    // let formattedAmount: any = asset
    // if (formattedAmount.denom === 'ixo') {
    //   formattedAmount = {
    //     amount: getUIXOAmount(String(amount)),
    //     denom: 'uixo',
    //   }
    // }
    // if (walletType === 'keysafe') {
    //   const msg = {
    //     type: currentMethod === CreditMethod.ADD ? 'cosmos-sdk/MsgSend' : 'project/WithdrawFunds',
    //     value:
    //       currentMethod === CreditMethod.ADD
    //         ? {
    //             amount: [formattedAmount],
    //             from_address: accountAddress,
    //             to_address: projectAddress,
    //           }
    //         : {
    //             senderDid: userInfo.didDoc.did,
    //             data: {
    //               projectDid: entityDid,
    //               recipientDid: userInfo.didDoc.did,
    //               amount: formattedAmount.amount,
    //               isRefund: true,
    //             },
    //           },
    //   }
    //   const fee = {
    //     amount: [{ amount: String(5000), denom: 'uixo' }],
    //     gas: String(200000),
    //   }
    //   broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, [msg], memo, fee, (hash: any) => {
    //     if (hash) {
    //       setSignTXStatus(TXStatus.SUCCESS)
    //       setSignTXhash(hash)
    //     } else {
    //       setSignTXStatus(TXStatus.ERROR)
    //     }
    //   })
    // } else if (walletType === 'keplr') {
    //   const [accounts, offlineSigner] = await keplr.connectAccount()
    //   const address = accounts[0].address
    //   const client = await keplr.initStargateClient(offlineSigner)

    //   const payload = {
    //     msgs: [
    //       {
    //         typeUrl: '/cosmos.bank.v1beta1.MsgSend',
    //         value:
    //           currentMethod === CreditMethod.ADD
    //             ? MsgSend.fromPartial({
    //                 fromAddress: address,
    //                 toAddress: projectAddress,
    //                 amount: [formattedAmount],
    //               })
    //             : MsgSend.fromPartial({
    //                 fromAddress: projectAddress,
    //                 toAddress: address,
    //                 amount: [formattedAmount],
    //               }),
    //       },
    //     ],
    //     chain_id: process.env.REACT_APP_CHAIN_ID,
    //     fee: {
    //       amount: [{ amount: String(5000), denom: 'uixo' }],
    //       gas: String(200000),
    //     },
    //     memo,
    //   }

    //   try {
    //     const result = await keplr.sendTransaction(client, address, payload)
    //     if (result) {
    //       setSignTXStatus(TXStatus.SUCCESS)
    //       setSignTXhash(result.transactionHash)
    //     } else {
    //       // eslint-disable-next-line
    //       throw 'transaction failed'
    //     }
    //   } catch (e) {
    //     setSignTXStatus(TXStatus.ERROR)
    //   }
    // }
    // }
  }

  const handleCreditMethod = (method: CreditMethod): void => {
    setCurrentMethod(method)
    setTitle(method)
    setSteps([method, 'Amount', 'Order', 'Sign'])
    handleNextStep()
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const handleSubmit = (): void => {
    setSignTXStatus(TXStatus.PENDING)
    setSignTXhash('')

    // TODO: sdk call
  }

  useEffect(() => {
    if (currentStep === 0) {
      setAmount(null)
    }
    if (currentStep === 2) {
      handleSubmit()
    }
    // eslint-disable-next-line
  }, [currentStep])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title,
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <div className='px-4 pb-4'>
          <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
        </div>

        {currentStep < 3 && (
          <div className='position-relative'>
            <CheckWrapper>
              <TokenSelector
                selectedToken={selectedCoin!}
                tokens={balances}
                handleChange={(coin): void => setSelectedCoin(coin)}
                disabled={currentStep !== 0}
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <CheckWrapper>
              <div className='mt-3' />
              <ModalInput
                name='send_amount'
                disabled
                preIcon={<QRCodeIcon />}
                placeholder='Project Address'
                value={entityAddress}
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <OverlayWrapper>
              <img src={OverlayButtonIcon} alt='down' />
            </OverlayWrapper>
          </div>
        )}

        {currentStep >= 1 && currentStep <= 2 && (
          <>
            <Divider className='my-4' />
            <CheckWrapper className='d-flex align-items-center'>
              {currentMethod === CreditMethod.WITHDRAW && (
                <MaxButton className='mr-3' onClick={handleMaxClick}>
                  MAX
                </MaxButton>
              )}
              <AmountInput
                amount={amount!}
                handleAmountChange={handleAmountChange}
                disable={currentStep !== 1}
                suffix={selectedCoin!.denom!.toUpperCase()}
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <NetworkFee className='mt-2'>
              Network fees: <strong>0.005 {selectedCoin!.denom!.toUpperCase()}</strong>
            </NetworkFee>
          </>
        )}
        {currentStep === 3 && <SignStep status={signTXStatus} hash={signTXhash} />}

        {currentStep === 0 && (
          <CreditMethodWrapper>
            <button onClick={(): void => handleCreditMethod(CreditMethod.ADD)}>{CreditMethod.ADD}</button>
            <button onClick={(): void => handleCreditMethod(CreditMethod.WITHDRAW)}>{CreditMethod.WITHDRAW}</button>
          </CreditMethodWrapper>
        )}

        <NextStep show={canNext} onClick={handleNextStep}>
          <img src={NextStepIcon} alt='next-step' />
        </NextStep>
        <PrevStep show={canPrev} onClick={handlePrevStep}>
          <img src={NextStepIcon} alt='prev-step' />
        </PrevStep>
      </Container>
    </ModalWrapper>
  )
}

export default FuelEntityModal
