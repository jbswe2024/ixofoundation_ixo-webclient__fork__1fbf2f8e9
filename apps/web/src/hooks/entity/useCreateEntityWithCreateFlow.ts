import { useWallet } from '@ixo-webclient/wallet-connector'
import { customMessages, ixo, utils } from '@ixo/impactxclient-sdk'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { fee } from 'lib/protocol'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { initialCellnodeService, initialIpfsService } from 'redux/createEntity/createEntity.reducer'
import { useAppSelector } from 'redux/hooks'
import { uploadToService } from 'services'
import { hexToUint8Array } from 'utils/encoding'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'

export const useCreateEntityWithCreateFlow = () => {
  const { execute, wallet, close } = useWallet()
  const entity = useAppSelector((state) => state.createFlow)
  const [isLoading, setIsLoading] = useState(false)
  const [completedDid, setCompletedDid] = useState<string | null>(null)
  const { protocolId } = useParams()

  const uploadLinkedResources = async (linkedResources: (LinkedResource & { data?: any })[]) => {
    const linkedResourcesToUpload = linkedResources.filter(
      (linkedResource) => !linkedResource.proof || linkedResource.proof === '',
    )

    if (linkedResourcesToUpload.length === 0) {
      return linkedResources.map(({ data, ...rest }) => rest)
    }

    const uploadedResources = await Promise.all(
      linkedResourcesToUpload.map(async (linkedResource) => {
        const service = linkedResource.serviceEndpoint?.includes('cellnode')
          ? initialCellnodeService
          : initialIpfsService

        const buff = Buffer.from(JSON.stringify(linkedResource.data))

        const resource = await uploadToService(buff.toString('base64'), service)

        return {
          ...linkedResource,
          serviceEndpoint: LinkedResourceServiceEndpointGenerator(resource!, service),
          proof: LinkedResourceProofGenerator(resource!, service),
        }
      }),
    )

    const updatedLinkedResources = linkedResources.map((resource) => {
      const uploadedResource = uploadedResources.find((uploaded) => uploaded.id === resource.id)
      return uploadedResource || resource
    })

    return updatedLinkedResources.map(({ data, ...rest }) => rest)
  }

  const determineEntityType = (type: string) => {
    if (
      type === 'protocol/project' ||
      type === 'protocol/oracle' ||
      type === 'protocol/dao' ||
      type === 'protocol/investment' ||
      type === 'protocol/asset'
    ) {
      return type.split('/').pop()
    }

    if (type === 'protocol/request') {
      return 'deed/request'
    }

    return type
  }

  const signCreateEntityTransaction = async () => {
    try {
      setIsLoading(true)
      if (!wallet) {
        throw new Error('Wallet is not connected')
      }

      const { daoController, ...rest } = entity
      const entityType = determineEntityType(rest.type)
      const hexPubKey = hexToUint8Array(wallet.pubKey as unknown as string)
      const verification = [
        ...customMessages.iid.createIidVerificationMethods({
          did: wallet.did,
          pubkey: hexPubKey,
          address: wallet.address,
          controller: wallet.did,
          type: 'secp',
        }),
      ]
      const controller = [wallet.did]

      if (entityType === 'dao') {
        // Verification
        if (daoController) {
          verification.push(
            ixo.iid.v1beta1.Verification.fromPartial({
              relationships: ['authentication'],
              method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
                id: `{id}#${daoController}`,
                type: 'CosmosAccountAddress',
                controller: '{id}',
                blockchainAccountID: daoController,
              }),
            }),
          )
        }

        // controller
        controller.push(utils.did.generateWasmDid(daoController))
      }

      const message = {
        typeUrl: '/ixo.entity.v1beta1.MsgCreateEntity',
        value: {
          ...rest,
          verification,
          context: [{ key: 'class', val: protocolId }],
          ownerDid: wallet.did,
          controller,
          startDate: entity.startDate ? utils.proto.toTimestamp(new Date(entity.startDate)) : undefined,
          endDate: entity.endDate ? utils.proto.toTimestamp(new Date(entity.endDate)) : undefined,
          entityType,
          linkedResource: await uploadLinkedResources(entity.linkedResource),
        },
      }

      const transactionResponse = await execute({
        data: { messages: [message], fee: fee, memo: '' },
      })

      close()
      setIsLoading(false)
      const did = utils.common.getValueFromEvents(transactionResponse, 'wasm', 'token_id')
      setCompletedDid(did)

      return transactionResponse
    } catch (error) {
      setIsLoading(false)
    }
  }

  return { signCreateEntityTransaction, isLoading, completedDid }
}