---
id: 9c2oqo4y
title: dao-creation
file_version: 1.1.3
app_version: 1.14.0
---

When creating dao, add admin group's did as a controller
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/CreateEntity/CreateDAO/Pages/ReviewDAO/ReviewDAO.tsx
```tsx
95         controller = controller.concat([utils.did.generateWasmDid(daoControllerAddress)])
```

<br/>

Choose relayer to get correct blocksync url by chainId,<br/>
came when cloning entity from...
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/CreateEntity/CreateDAO/Pages/SelectCreationProcess/SelectCreationProcess.tsx
```tsx
44       const relayer = useAppSelector(selectRelayerByChainId(chainId!))
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/9c2oqo4y).