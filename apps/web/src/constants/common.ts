export const isDevelopment = !process.env.NODE_ENV || process.env.REACT_APP_CHAIN_ID === 'devnet-1'
export const currentRelayerNode = process.env.REACT_APP_RELAYER_NODE ?? ''
export const currentChainId = process.env.REACT_APP_CHAIN_ID
export const relayersToInclude = ['did:x:zQ3shj4dPHhbsSXYcmsZLoDkiPJxkHhWYZpihWSQn95fuos2y']
export const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID ?? ''
export const algoliaSearchKey = process.env.REACT_APP_ALGOLIA_SEARCH_KEY ?? ''
export const algoliaIndexName = `entities-${currentChainId}`
