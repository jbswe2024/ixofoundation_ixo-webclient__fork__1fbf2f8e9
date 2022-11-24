import { ixo, SigningStargateClient } from '@ixo/impactxclient-sdk'
import {
  AccordedRight,
  Context,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import BigNumber from 'bignumber.js'
import { fee } from './common'

export const CreateEntity = async (
  client: SigningStargateClient,
  address: string,
  did: string,
  payload: {
    entityType: string
    entityStatus?: number
    context: Context[]
    service?: Service[]
    linkedResource?: LinkedResource[]
    accordedRight?: AccordedRight[]
    linkedEntity?: LinkedEntity[]
  }[],
): Promise<any> => {
  try {
    const messages = payload.map((item) => {
      const {
        entityType,
        entityStatus,
        context,
        service,
        linkedResource,
        accordedRight,
        linkedEntity,
      } = item
      return {
        typeUrl: '/ixo.entity.v1beta1.MsgCreateEntity',
        value: ixo.entity.v1beta1.MsgCreateEntity.fromPartial({
          entityType: entityType.toLowerCase(),
          entityStatus: entityStatus ?? 0,
          context: context.map((item) =>
            ixo.iid.v1beta1.Context.fromPartial(item),
          ),
          ownerDid: did,
          ownerAddress: address,
          service: service?.map((item: Service) =>
            ixo.iid.v1beta1.Service.fromPartial(item),
          ),
          linkedResource: linkedResource?.map((item: LinkedResource) =>
            ixo.iid.v1beta1.LinkedResource.fromPartial(item),
          ),
          accordedRight: accordedRight?.map((item: AccordedRight) =>
            ixo.iid.v1beta1.AccordedRight.fromPartial(item),
          ),
          linkedEntity: linkedEntity ?? [],
        }),
      }
    })
    const updatedFee = {
      ...fee,
      gas: new BigNumber(fee.gas).times(messages.length).toString(),
    }
    const response = await client.signAndBroadcast(
      address,
      messages,
      updatedFee,
    )
    console.log('CreateEntity', 'response', response)
    return response
  } catch (e) {
    console.error('CreateEntity', e)
    return undefined
  }
}

// export const TransferEntity = async (entityDid: string): Promise<any> => {
//   const client = await createClient()

//   const tester = getUser()
//   const account = (await tester.getAccounts())[0]
//   const myAddress = account.address
//   const did = tester.did

//   const alice = getUser(WalletUsers.alice)

//   const message = {
//     typeUrl: '/ixo.entity.v1beta1.MsgTransferEntity',
//     value: ixo.entity.v1beta1.MsgTransferEntity.fromPartial({
//       entityDid: entityDid,
//       ownerDid: did,
//       ownerAddress: myAddress,
//       recipientDid: alice.did,
//     }),
//   }

//   const response = await client.signAndBroadcast(myAddress, [message], fee)
//   return response
// }

// export const UpdateEntity = async (): Promise<any> => {
//   const client = await createClient()

//   const tester = getUser()
//   const account = (await tester.getAccounts())[0]
//   const myAddress = account.address
//   const did = tester.did

//   const message = {
//     typeUrl: '/ixo.entity.v1beta1.MsgUpdateEntity',
//     value: ixo.entity.v1beta1.MsgUpdateEntity.fromPartial({
//       status: 1,
//       controllerDid: did,
//       controllerAddress: myAddress,
//     }),
//   }

//   const response = await client.signAndBroadcast(myAddress, [message], fee)
//   return response
// }