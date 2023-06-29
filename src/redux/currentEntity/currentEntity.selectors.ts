import { EntityAccount } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { createSelector } from '@reduxjs/toolkit'
import { TEntityModel } from 'api/blocksync/types/entities'
import { RootState } from 'redux/store'

export const selectCurrentEntity = (state: RootState): TEntityModel => state.currentEntity

export const selectEntityId = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.id
})

export const selectEntityType = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.type
})

export const selectEntityMetadata = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.metadata
})

export const selectEntityLinkedResource = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.linkedResource ?? []
})

export const selectEntityLinkedEntity = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.linkedEntity ?? []
})

export const selectEntityProfile = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.profile
})

export const selectEntityCreator = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.creator
})

export const selectEntityAdministrator = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.administrator
})

export const selectEntityPage = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.page
})

export const selectEntityTags = createSelector(selectCurrentEntity, (entity: TEntityModel) => {
  return entity.tags
})

export const selectEntityAccounts = createSelector(selectCurrentEntity, (entity: TEntityModel): EntityAccount[] => {
  return entity.accounts
})

export const selectEntityOwner = createSelector(selectCurrentEntity, (entity: TEntityModel): string => {
  return (entity as any).owner
})

export const selectEntityService = createSelector(selectCurrentEntity, (entity: TEntityModel): Service[] => {
  return entity.service
})

export const selectEntityStartDate = createSelector(selectCurrentEntity, (entity: TEntityModel): string => {
  return entity.startDate as never as string
})

export const selectEntityEndDate = createSelector(selectCurrentEntity, (entity: TEntityModel): string => {
  return entity.endDate as never as string
})
