import { Flex, ScrollArea, ActionIcon } from '@mantine/core'
import styled from 'styled-components'
import { useAccount } from 'hooks/account'
import Tooltip from 'components/Tooltip/Tooltip'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { LiaBoltSolid, LiaPlaySolid } from 'react-icons/lia'
import { useCompanionContext } from 'contexts/CompanionContext'
import { useCompanionDesignConfig } from 'hooks/userInterface/useCompanionDesignConfig'
import { KeyValueActionPanel } from './ActionPanel/ActionPanel'
import { GoArrowLeft } from 'react-icons/go'
import { useLocation, useNavigate } from 'react-router-dom'
import Assistant from 'components/Assistant'
import ActionsScreen from './Actions/ActionsScreen'

const StyledScrollArea = styled(ScrollArea)`
  & > div > div {
    height: 100%;
  }
`

const ControlPanel = () => {
  const { address } = useAccount()
  const { activeTab, setActiveTab } = useCompanionContext()
  const { keyValue, resetKeyValue } = useKeyValueViewerContext()
  const { toolbarActiveBackground, toolbarActiveColor, toolbarBackground, toolbarColor } = useCompanionDesignConfig()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goBack = () => {
    resetKeyValue()
    if (keyValue?.type === 'claim') {
      const search = new URLSearchParams()
      search.delete('collectionId')
      search.delete('agentRole')
      navigate({ pathname: pathname, search: search.toString() })
    }
  }

  return (
    <Flex w='360px' h='100%' bg='#F0F3F9' direction='column' justify='space-between' gap={0} style={{ color: 'black' }}>
      <StyledScrollArea h='100%'>
        <Flex w='100%' direction='column' h='100%' p={20} pt={32}>
          {!keyValue && activeTab === 'user' && <ActionsScreen />}
          {!keyValue && activeTab === 'entity' && <Assistant />}
          {keyValue && <KeyValueActionPanel type={keyValue.type} data={keyValue.data} />}
        </Flex>
      </StyledScrollArea>
      <Flex w='100%' bg='#EBEBEB' p={21} justify='space-around' align='center'>
        <Flex gap={40}>
          {!keyValue && (
            <Tooltip text={'user'}>
              <ActionIcon
                size={46}
                radius='xl'
                bg={activeTab === 'user' ? toolbarActiveBackground : toolbarBackground}
                onClick={() => setActiveTab('user')}
              >
                <LiaPlaySolid size='24' color={activeTab === 'user' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
            </Tooltip>
          )}
          {address && !keyValue && (
            <Tooltip text={'entity'}>
              <ActionIcon
                size={46}
                radius='xl'
                bg={activeTab === 'entity' ? toolbarActiveBackground : toolbarBackground}
                onClick={() => setActiveTab('entity')}
              >
                <LiaBoltSolid size='24' color={activeTab === 'entity' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
            </Tooltip>
          )}
          {keyValue && (
            <Tooltip text={'Back'}>
              <ActionIcon
                size={46}
                radius='xl'
                color='#20798C'
                bg={activeTab === 'entity' ? toolbarActiveBackground : toolbarBackground}
                onClick={goBack}
              >
                <GoArrowLeft size={24} color={activeTab === 'entity' ? toolbarActiveColor : toolbarColor} />
              </ActionIcon>
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ControlPanel
