import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

interface WalletProps {
  account: string;
  setAccount: (account: string) => void;
}

export const Wallet = ({ account, setAccount }: WalletProps) => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  setAccount(address!);

  return (
    <>
      {isConnected ? (
        <>
          <div>
            Connected to {address}
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>
        </>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </>
  );
};