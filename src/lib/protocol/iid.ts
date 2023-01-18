import { ixo, SigningStargateClient, createQueryClient } from '@ixo/impactxclient-sdk'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { getVerificationMethod, KeyTypes, fee, RPC_ENDPOINT } from './common'

export const CreateIidDoc = async (client: SigningStargateClient, { address, did, pubKey }: any, keyType: KeyTypes) => {
  try {
    const message = {
      typeUrl: '/ixo.iid.v1beta1.MsgCreateIidDocument',
      value: ixo.iid.v1beta1.MsgCreateIidDocument.fromPartial({
        id: did,
        verifications: [
          ixo.iid.v1beta1.Verification.fromPartial({
            relationships: ['authentication'],
            method: getVerificationMethod(did, pubKey, did, keyType),
          }),
          ixo.iid.v1beta1.Verification.fromPartial({
            relationships: ['authentication'],
            method: getVerificationMethod(`${did}#${address}`, pubKey, did, keyType),
          }),
        ],
        signer: address,
        controllers: [did],
      }),
    }
    const response = await client.signAndBroadcast(address, [message], fee)
    console.log('CreateIidDoc', 'response', response)
    return response
  } catch (e) {
    console.error('CreateIidDoc', e)
    return undefined
  }
}

export const CheckIidDoc = async (did: string): Promise<IidDocument> => {
  try {
    const client = await createQueryClient(RPC_ENDPOINT!)
    const { iidDocument } = await client.ixo.iid.v1beta1.iidDocument({
      id: did,
    })
    console.log('CheckIidDoc', iidDocument)
    return iidDocument!
  } catch (e) {
    console.error('CheckIidDoc', e)
    return undefined!
  }
}

// const getAccountInfo = async (): Promise<{
//   accountNumber?: number
//   sequence?: number
// }> => {
//   try {
//     if (!address) {
//       throw `queryClient is not initialized!`
//     }
//     const { account } = await qc.cosmos.auth.v1beta1.account({ address })
//     const { accountNumber, sequence } = accountFromAny(account)
//     return { accountNumber, sequence }
//   } catch (e) {
//     console.error('getAccountInfo:', e)
//     return {}
//   }
// }