import { constants } from "../components/constants";
import { ethers, Contract, utils } from "ethers";
import SimpleCardNFTFactoryABI from "../abi/SimpleCardNFTFactory.json";
import { useEffect, useState } from "react";

const abi = SimpleCardNFTFactoryABI.abi; //SimpleCardNFTFactoryABI는 스마트 컨트랙트의 ABI(Application Binary Interface) 정보를 가져옵니다.
interface MintTranProps {
  account: string;
  setAccount: (account: string) => void;
}

export const MintAndTransfer = ({ account, setAccount }: MintTranProps) => {
  //여러 개의 상태 변수를 선언하여 사용자 입력을 관리합니다
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [transferTo, setTransferTo] = useState("");

  //ethers.js 라이브러리를 사용하여 이더리움과 연결합니다.
  //// signer는 거래에 서명할 수 있는 객체입니다.
  //// provider는 이더리움 노드에 연결하는 객체입니다.
  //// simpleCardNFTFactory는 스마트 컨트랙트와 상호작용할 수 있는 객체입니다.
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

  //Register, Mint, TransferTo 함수를 정의하여 스마트 컨트랙트와 상호작용합니다.
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

  //사용자 입력을 받고, 버튼을 클릭하면 상태를 업데이트하거나 이더리움 트랜잭션을 발생시킵니다.
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
