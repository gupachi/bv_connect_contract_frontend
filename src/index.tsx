import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WagmiConfig config={config}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WagmiConfig>
);
