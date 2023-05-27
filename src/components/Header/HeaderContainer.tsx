import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { EntityType } from 'types/entities'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import HeaderRight from './HeaderRight/HeaderRight'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'constants/device'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { ButtonTypes, Button } from '../Form/Buttons'
import { InfoLink, ModalData, TopBar } from './HeaderContainer.styles'
import Success from 'assets/icons/Success'
import {
  selectAccountRegistered,
  selectAccountAddress,
  selectAccountFunded,
  selectAccountName,
} from 'redux/account/account.selectors'
import { useAccount } from 'hooks/account'
import { CreateIidDoc } from 'lib/protocol'
import { truncateString } from 'utils/formatters'
import { useAppSelector } from 'redux/hooks'
import { selectEntityHeaderButtonColorUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

interface Props {
  entityType?: EntityType
  headerUIConfig?: any
  name?: string
  registered?: boolean
  address?: string
  funded?: boolean
}

// class Header extends React.Component<Props, State> {
const Header: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    address,
    pubKey,
    pubKeyUint8,
    signingClient,
    keyType,
    did,
    selectedWallet,
    updateBalances,
    updateRegistered,
  } = useAccount()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalResponse] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const buttonColor: string = useAppSelector(selectEntityHeaderButtonColorUIConfig)

  useEffect(() => {
    const { registered, address } = props
    if (address && registered === false) {
      setIsModalOpen(true)
    } else if (registered === true) {
      setIsModalOpen(false)
    }
  }, [props])

  const handleBurgerClick = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const handleToggleModal = (isModalOpen: boolean): void => {
    setIsModalOpen(isModalOpen)
  }
  const handleLedgerDid = async (): Promise<void> => {
    if (signingClient && address && did && pubKey && keyType) {
      const res = await CreateIidDoc(signingClient, { address, did, pubKey: pubKeyUint8!, keyType })
      updateRegistered(!!res)
    } else {
      console.error('handleLedgerDid', { signingClient, address, did, pubKey, keyType })
    }
  }

  const handledFunded = (): void => {
    updateBalances()
  }

  const renderModalHeader = (): {
    title: string
    titleNoCaps?: boolean
  } => {
    if (props.name) {
      return {
        title: 'Hi, ' + truncateString(props.name, 20, 'end'),
        titleNoCaps: true,
      }
    } else {
      return {
        title: '',
        titleNoCaps: undefined,
      }
    }
  }

  const renderModalData = (): JSX.Element => {
    const { address, funded } = props

    if (modalResponse.length > 0) {
      return (
        <ModalData>
          <p>{modalResponse}</p>
          <Button type={ButtonTypes.dark} onClick={(): void => handleToggleModal(false)}>
            CONTINUE
          </Button>
        </ModalData>
      )
    } else if (funded) {
      return (
        <ModalData>
          <p>
            YOUR ACCOUNT HAS SUCCESSFULLY BEEN FUNDED
            <br />
            Now you can Register your self-sovereign identity on the blockchain, which will deduct a small gas fee from
            your account.
          </p>
          <Button type={ButtonTypes.dark} onClick={handleLedgerDid}>
            SIGN THIS REQUEST
          </Button>
        </ModalData>
      )
    } else {
      return (
        <ModalData>
          <Success width='64' fill='#49BFE0' />
          <h3 style={{ textTransform: 'uppercase' }}>YOU HAVE SUCCESSFULLY INSTALLED THE {selectedWallet}</h3>
          <p>
            <span>NEXT STEP - </span>Fund your Account with IXO Tokens to Register your self-sovereign identity on the
            blockchain
            <br />
            (This requires a small amount of IXO for gas).
            <br />
            Your Account address is <span>{truncateString(address!, 20, 'middle') ?? '-'}</span>
          </p>
          <Button type={ButtonTypes.dark} onClick={handledFunded}>
            I HAVE FUNDED MY ACCOUNT
          </Button>
          <InfoLink
            href='https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6'
            target='_blank'
          >
            Why do I need to sign my credentials?
          </InfoLink>
        </ModalData>
      )
    }
  }

  // handleLedgerDid = (): void => {
  //   if (this.props.userInfo.didDoc) {
  //     const payload = this.props.userInfo.didDoc

  //     blocksyncApi.utils
  //       .getSignData(payload, 'did/AddDid', payload.pubKey)
  //       .then((response: any) => {
  //         if (response.sign_bytes && response.fee) {
  //           keysafe.requestSigning(
  //             response.sign_bytes,
  //             (error: any, signature: any) => {
  //               this.setState({ isLedgering: true })
  //               if (!error) {
  //                 blocksyncApi.user
  //                   .registerUserDid(payload, signature, response.fee, 'sync')
  //                   .then((response: any) => {
  //                     if ((response.code || 0) === 0) {
  //                       this.setState({
  //                         modalResponse:
  //                           'Your credentials have been registered on the ixo blockchain. This will take a few seconds in the background, you can continue using the site.',
  //                       })
  //                     } else {
  //                       this.setState({
  //                         modalResponse:
  //                           'Unable to ledger did at this time, please contact our support at support@ixo.world',
  //                       })
  //                     }
  //                   })
  //               }
  //             },
  //             'base64',
  //           )
  //         } else {
  //           this.setState({
  //             modalResponse:
  //               'Unable to ledger did at this time, please contact our support at support@ixo.world',
  //           })
  //         }
  //       })
  //       .catch(() => {
  //         this.setState({
  //           modalResponse:
  //             'Unable to ledger did at this time, please contact our support at support@ixo.world',
  //         })
  //       })
  //   } else {
  //     this.setState({
  //       modalResponse:
  //         'We cannot find your keysafe information, please reach out to our support at support@ixo.world',
  //     })
  //   }
  // }

  const { headerUIConfig } = props

  let customBackground = '#000000'
  if (headerUIConfig) {
    const { background } = headerUIConfig
    if (background) {
      customBackground = background
    }
  }

  return (
    <TopBar
      className={`container-fluid ${isMobileMenuOpen === true ? 'openMenu' : ''}`}
      color={buttonColor}
      background={customBackground}
    >
      <ModalWrapper isModalOpen={isModalOpen} handleToggleModal={handleToggleModal} header={renderModalHeader()}>
        {renderModalData()}
      </ModalWrapper>
      <div className='row'>
        <HeaderLeft
          currentEntity={props.entityType!}
          openMenu={isMobileMenuOpen}
          handleBurgerClick={handleBurgerClick}
        />
        <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
          <HeaderRight toggleModal={handleToggleModal} />
        </MediaQuery>
      </div>
    </TopBar>
  )
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  name: selectAccountName(state),
  address: selectAccountAddress(state),
  registered: selectAccountRegistered(state),
  funded: selectAccountFunded(state),
  entityType: entitiesSelectors.selectSelectedEntitiesType(state),
  headerUIConfig: entitiesSelectors.selectEntityHeaderUIConfig(state),
})

export const HeaderConnected = connect(mapStateToProps)(Header)
