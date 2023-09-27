import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

interface WalletProps {
  account: string;
  setAccount: (account: string) => void;
}

export const Wallet = ({ account, setAccount }: WalletProps) => {
  /** 여기다가 구현해보세용~~~ */
};
