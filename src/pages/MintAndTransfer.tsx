import { constants } from "../components/constants";
import { ethers, Contract, utils } from "ethers";
import SimpleCardNFTFactoryABI from "../abi/SimpleCardNFTFactory.json";
import { useEffect, useState } from "react";

const abi = SimpleCardNFTFactoryABI.abi;
interface FarmProps {
  account: string;
  setAccount: (account: string) => void;
}

export const MintAndTransfer = ({ account, setAccount }: FarmProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [transferTo, setTransferTo] = useState("");

  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const provider = new ethers.providers.JsonRpcProvider(
    constants.SeopoliaRPCUrl
  );
  let simpleCardNFTFactory = new ethers.Contract(
    constants.ContractAddress,
    abi,
    provider
  );
  simpleCardNFTFactory = simpleCardNFTFactory.connect(signer);

  const Register = async () => {
    const tx = await simpleCardNFTFactory.registerSimpleCardInfo(
      name,
      email,
      company,
      university,
      major,
      phone,
      portfolio
    );
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  const Mint = async () => {
    const tx = await simpleCardNFTFactory.mintSimpleCardNFT({
      value: utils.parseEther("0.01"),
    });
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  const TransferTo = async () => {
    const tx = await simpleCardNFTFactory.transferSimpleCardNFT(transferTo);
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Portfolio"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />
        <button onClick={() => Register()}>Register My Info</button>
      </div>
      <div>
        <button onClick={() => Mint()}>Mint</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Transfer to"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <button onClick={() => TransferTo()}>Transfer</button>
      </div>
    </>
  );
};
