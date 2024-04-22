/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { UncheckedDenom, UncheckedDepositInfo, Empty, ProposeMessage, Binary, Status, Coin, Addr, Config, DepositInfoResponse, HooksResponse } from "./DaoPreProposeMultiple.types";
import { BaseClient, DeliverTxResponse, ExecuteProps } from "./Base.client";
export interface DaoPreProposeMultipleReadOnlyInterface {
  contractAddress: string;
  proposalModule: () => Promise<Addr>;
  dao: () => Promise<Addr>;
  config: () => Promise<Config>;
  depositInfo: ({
    proposalId
  }: {
    proposalId: number;
  }) => Promise<DepositInfoResponse>;
  proposalSubmittedHooks: () => Promise<HooksResponse>;
  queryExtension: ({
    msg
  }: {
    msg: Empty;
  }) => Promise<Binary>;
}
export interface DaoPreProposeMultipleInterface extends DaoPreProposeMultipleReadOnlyInterface {
  contractAddress: string;
  sender: string;
  propose: ({
    msg
  }: {
    msg: ProposeMessage;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    depositInfo,
    openProposalSubmission
  }: {
    depositInfo?: UncheckedDepositInfo;
    openProposalSubmission: boolean;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  withdraw: ({
    denom
  }: {
    denom?: UncheckedDenom;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  extension: ({
    msg
  }: {
    msg: Empty;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  addProposalSubmittedHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  removeProposalSubmittedHook: ({
    address
  }: {
    address: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  proposalCompletedHook: ({
    newStatus,
    proposalId
  }: {
    newStatus: Status;
    proposalId: number;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class DaoPreProposeMultipleClient extends BaseClient {
  sender: string;
  contractAddress: string;

  constructor(execute: any, sender: string, contractAddress: string) {
    super(execute);
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.propose = this.propose.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.extension = this.extension.bind(this);
    this.addProposalSubmittedHook = this.addProposalSubmittedHook.bind(this);
    this.removeProposalSubmittedHook = this.removeProposalSubmittedHook.bind(this);
    this.proposalCompletedHook = this.proposalCompletedHook.bind(this);
  }

  propose = async ({
    msg,
    transactionConfig
  }: {
    msg: ProposeMessage;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      propose: {
        msg
      }
    }, fee, memo, funds, transactionConfig);
  };
  updateConfig = async ({
    depositInfo,
    openProposalSubmission,
    transactionConfig
  }: {
    depositInfo?: UncheckedDepositInfo;
    openProposalSubmission: boolean;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      update_config: {
        deposit_info: depositInfo,
        open_proposal_submission: openProposalSubmission
      }
    }, fee, memo, funds, transactionConfig);
  };
  withdraw = async ({
    denom,
    transactionConfig
  }: {
    denom?: UncheckedDenom;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      withdraw: {
        denom
      }
    }, fee, memo, funds, transactionConfig);
  };
  extension = async ({
    msg,
    transactionConfig
  }: {
    msg: Empty;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      extension: {
        msg
      }
    }, fee, memo, funds, transactionConfig);
  };
  addProposalSubmittedHook = async ({
    address,
    transactionConfig
  }: {
    address: string;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      add_proposal_submitted_hook: {
        address
      }
    }, fee, memo, funds, transactionConfig);
  };
  removeProposalSubmittedHook = async ({
    address,
    transactionConfig
  }: {
    address: string;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      remove_proposal_submitted_hook: {
        address
      }
    }, fee, memo, funds, transactionConfig);
  };
  proposalCompletedHook = async ({
    newStatus,
    proposalId,
    transactionConfig
  }: {
    newStatus: Status;
    proposalId: number;
    transactionConfig: ExecuteProps["transactionConfig"]
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<DeliverTxResponse> => {
    return await super.execute(this.sender, this.contractAddress, {
      proposal_completed_hook: {
        new_status: newStatus,
        proposal_id: proposalId
      }
    }, fee, memo, funds, transactionConfig);
  };
}