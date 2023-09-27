import { useState } from "react";
import { Wallet } from "../components/wallet";
import { MintAndTransfer } from "./MintAndTransfer";
import { useConnect } from "wagmi";

export const Main = () => {
  const [account, setAccount] = useState("");
  return (
    <div>
      <Profile />
      <Wallet account={account} setAccount={setAccount}></Wallet>
      <MintAndTransfer
        account={account}
        setAccount={setAccount}
      ></MintAndTransfer>
    </div>
  );
};

function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
