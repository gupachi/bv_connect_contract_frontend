import { constants } from "../components/constants";
import { ethers, Contract, utils } from "ethers";
import SimpleCardNFTFactoryABI from "../abi/SimpleCardNFTFactory.json";
import { useEffect, useState } from "react";
import {userEvent} from '@testing-library/user-event';
import Web3 from 'web3';
import { setConstantValue } from 'typescript';
import axios from 'axios';
import { contract } from 'web3/lib/commonjs/eth.exports';

// 외부와의 통신에서 사용 
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
  const[answer,setAnswer] = useState("");
  const [inputData, setInputData] = useState(""); // 기숙사 Quiz 에서 쓰일 정보 
  // transferTo와 setTransferTo 상태 변수 추가
  const [transferTo, setTransferTo] = useState("");
  const [quiz, setQuiz] = useState("");
// ...



    const TransferTo = async () => {
    // transferTo를 인자로 전달
    const tx = await simpleCardNFTFactory.transferSimpleCardNFT(transferTo);
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

 // to -from 관계  누군한테 정보를 전달할 것인지 
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




 const fetchInputData = async() => {
    try {
        const response = await axios.get(constants.ETHERSCAN_API_URL, {
            params: {
                module: "proxy",
                action: "eth_getTransactionByHash",
                txhash: account,
                apikey: constants.API_KEY
            }
        });
    
        const data = response.data.result?.input;
        setInputData(data);
    } catch (error) {
        console.error("Error fetching transaction data:", error);
    }
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
        </div>
        <div>
        <button onClick={() => Register()}>Register My Info</button>
      </div>
      <div>
        <button onClick={() => Mint()}>Mint</button>
      </div>
     
      <div>
  <button onClick={() => fetchInputData()}>Fetch Input Data</button> 
  {inputData && <div>{inputData}</div>}
   </div>

    </>
  );
  
  
}