---
id: so2y078a
title: dao-proposal
file_version: 1.1.3
app_version: 1.14.0
---

Make Proposal message (ixo custom module) for subDAO joining to impactsDAO
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/hooks/proposal.ts
<!-- collapsed -->

```typescript
682      const makeJoinAction = (data: any): any => {
683        const { id, coreAddress, address } = data
684        return makeStargateMessage({
685          stargate: {
686            typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
687            value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
688              id,
689              linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial({
690                type: 'MemberDAO',
691                id: address,
692                relationship: `member`,
693                service: ``,
694              }),
695              signer: coreAddress,
696            }),
697          },
698        })
699      }
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/so2y078a).