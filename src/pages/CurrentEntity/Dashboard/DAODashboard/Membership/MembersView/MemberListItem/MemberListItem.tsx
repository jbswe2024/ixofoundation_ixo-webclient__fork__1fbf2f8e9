import ThreeDot from 'assets/icons/ThreeDot'
import { Box, FlexBox, TableBodyItem, TableRow } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { truncateString } from 'utils/formatters'
import { MemberDetailCard } from '../MemberDetailCard'
import { useHistory } from 'react-router-dom'
import { STATUSES } from '../../Toolbar/Toolbar'
import { Avatar } from '../../../../Components'

const Wrapper = styled(TableRow)<{ focused: boolean }>`
  ${({ theme, focused }) =>
    focused &&
    css`
      outline-color: ${theme.ixoNewBlue};
      background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
      box-shadow: ${theme.ixoShadow1};
    `}
  &:hover {
    outline-color: ${(props) => props.theme.ixoNewBlue};
    background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
    box-shadow: ${(props) => props.theme.ixoShadow1};

    & #three_dot {
      visibility: visible;
    }
  }
`

const DetailButton = styled.span`
  visibility: hidden;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  transition: all 0.2s;
`

interface Props {
  member: {
    avatar?: string
    name?: string
    role?: string
    staking?: number
    votes?: number
    proposals?: number
    status?: 'approved' | 'pending' | 'rejected'
    verified?: boolean
    administrator?: boolean
    assignedAuthority?: number

    addr: string
    weight: number
    votingPower?: number
  }
  selected: boolean
  onSelectMember: (addr: string) => void
}

const MemberListItem: React.FC<Props> = ({ member, selected, onSelectMember }): JSX.Element => {
  const history = useHistory()
  const { avatar, name, status, addr, staking, votes, proposals, votingPower } = member
  const [detailView, setDetailView] = useState(false)

  const handleMemberView = () => {
    history.push(`${history.location.pathname}/${addr}`)
  }

  return (
    <Wrapper
      height={'66px'}
      borderRadius='12px'
      background={'transparent'}
      cursor='pointer'
      outlineWidth='2px'
      outlineStyle='solid'
      outlineColor={'transparent'}
      transition='all .2s'
      position='relative'
      px={8}
      py={1}
      focused={selected}
      onClick={() => onSelectMember(addr)}
    >
      <TableBodyItem>
        <Box
          position='absolute'
          top='8px'
          left='8px'
          borderRadius='100%'
          width='12px'
          height='12px'
          background={STATUSES[status!]?.color}
        />
        <FlexBox alignItems='center' gap={5} marginLeft={8}>
          <Avatar size={50} url={avatar} />
          <Typography color='white' size='lg' weight='medium' hover={{ underline: true }} onClick={handleMemberView}>
            {truncateString(name ?? addr, 20)}
          </Typography>
        </FlexBox>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {new Intl.NumberFormat('en-us', {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(votingPower ?? 0)}
        </Typography>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {new Intl.NumberFormat(undefined, {
            notation: 'compact',
            compactDisplay: 'short',
            minimumFractionDigits: 2,
          })
            .format(staking ?? 0)
            .replace(/\D00$/, '')}
        </Typography>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {votes ?? 0}
        </Typography>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {proposals ?? 0}
        </Typography>
      </TableBodyItem>

      <TableBodyItem>
        <DetailButton
          id='three_dot'
          onClick={(event) => {
            setDetailView(true)
            event.stopPropagation()
          }}
        >
          <ThreeDot />
        </DetailButton>
        {detailView && (
          <Box position='absolute' top='0px' right='0px' zIndex={100}>
            <MemberDetailCard member={member} onClose={() => setDetailView(false)} />
          </Box>
        )}
      </TableBodyItem>
    </Wrapper>
  )
}

export default MemberListItem