import './App.css';
import {useState,useEffect} from 'react'
import SimpleStorage from './contracts/SimpleStorage.json';
import Web3 from 'web3';

function App() {

  const [state, setState] = useState({web3:null,contract:null})
  const [data, setData] = useState(null)
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    let provider=new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function Template(){
      let web3=new Web3(provider);
  
      const networkId=await web3.eth.net.getId();
      const deployedNetwork=SimpleStorage.networks[networkId];
      // console.log(deployedNetwork.address);
  
      const contract=await new web3.eth.Contract(SimpleStorage.abi,deployedNetwork.address);
      // console.log(contract);
      setState({web3:web3,contract:contract})
    }
    provider && Template()
  }, [])
  console.log(state);

  useEffect(() => {
    const {contract}=state;
    async function readContract(){
      console.log(contract);
      const value=await contract.methods.getter().call();
      console.log(value);
      setData(value);
    }
  contract && readContract()
  }, [state])
  

  async function getAccount(){
    let {web3}=state;
    let allAccounts=await web3.eth.getAccounts();
    console.log(allAccounts);
    setAccounts(allAccounts);
  }
  
  // async function readContract(){
  //   const {contract}=state;
  //   console.log(contract);
  //   const value=await contract.methods.getter().call();
  //   console.log(value);
  //   setData(value);
  // }

  async function writeContract(number){
    const {contract}=state;
    let value=document.querySelector('#data').value;
    const set=await contract.methods.setter(value ).send({
      from:'0xC7B32DC2e04fC355CE545deD5408872f17f008b5'
    });
  }
  
  return (
    <div className="App">
      <button onClick={getAccount}>Get Accounts</button>
      <p>This are all account : ${accounts && accounts.map((e)=>{
        return <p>{e}</p>
      })}</p>
      {/* <button onClick={readContract}>Read Contract</button> */}
      <input type='text' id='data'/>
      <button onClick={writeContract}>Set Value</button>
      <div>The data is {data}</div>
     
    </div>
  );
}

export default App;
