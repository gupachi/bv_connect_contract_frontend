import { constants } from "../components/constants";
import { ethers, Contract, utils } from "ethers";
import SimpleCardNFTFactoryABI from "../abi/SimpleCardNFTFactory.json";
import { useEffect, useState } from "react";
import {userEvent} from '@testing-library/user-event';
import Web3 from 'web3';
import { setConstantValue } from 'typescript';



const abi = SimpleCardNFTFactoryABI.abi; //SimpleCardNFTFactoryABI는 스마트 컨트랙트의 ABI(Application Binary Interface) 정보를 가져옵니다.
interface MintTranProps {
  account: string;
  setAccount: (account: string) => void;
}
export const MintAndTransfer = ({ account, setAccount }: MintTranProps) => {
  // 기존의 상태 변수 선언
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [age, setAge] = useState("");
  const [dorm, setDorm] = useState("");
  const[answer,setAnswer] = useState(""); // 기숙사 Quiz 에서 쓰일 정보 
  // transferTo와 setTransferTo 상태 변수 추가
  const [transferTo, setTransferTo] = useState("");



  const TransferTo = async () => {
    // transferTo를 인자로 전달
    const tx = await simpleCardNFTFactory.transferSimpleCardNFT(transferTo);
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

 // to -from 관계 
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
      status,
      age, 
      dorm,

    );
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };
   // 민팅하기 
  const Mint = async () => {
    const tx = await simpleCardNFTFactory.mintSimpleCardNFT({
      value: utils.parseEther("0.01"),
    });
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };


  // Metamask가 설치된 경우에 etherscan에 연결 
  if(window.ethereum) {
    const web3 = new Web3(window.ethereum);
  } else {
    console.log('Please install Metamask.');
  }
  // 오류: Web3 -> metamask 연결 -> EtherScan input data 보기 
  const info = async () => {
   Web3.eth.getTransaction(transferTo)
  .then(  transfer => {
    // ABI 디코딩을 통해 input data 해석
    const contract = new Web3.eth.Contract(abi);
    const inputData = contract.decodeFunctionCall(transfer.input);
    console.log(inputData);
  });
}
  

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
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dorm"
          value={dorm}
          onChange={(e) => setDorm(e.target.value)}
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
          onChange={(e) =>  setTransferTo(e.target.value)}
        />
        <button onClick={() => TransferTo()}>Transfer</button>
      </div>
      <div>
      <input
          type="text"
          placeholder="Quiz"
          value={answer}
          onChange={(e) => (e.target.value)}
        />
        <button onClick={() => info()}>Answer</button>
    </div>
    
   
    
    </>
  );
        
        }