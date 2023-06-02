import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import Footer from './Footer';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState( () => {
    const escrowsStored = localStorage.getItem('escrowList');
    return escrowsStored ? JSON.parse(escrowsStored) : [];
  });



  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);


  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = document.getElementById('amount').value;
    const etherValue = ethers.utils.parseUnits(value.toString(), 'ether'); // Input to ETH
    const escrowContract = await deploy(signer, arbiter, beneficiary, etherValue);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: ethers.utils.formatUnits(etherValue, 'ether').toString(), // Format as ETH
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ Contract Approved!";
        });

        await approve(escrowContract, signer);
      },
    };
    
    const addItemToList = (escrow) => {
      setEscrows((escrowsStored) => [...escrowsStored, escrow]);
    };

    addItemToList(escrow);

  }

  useEffect(() => {
    localStorage.setItem('escrowList', JSON.stringify(escrows));
  }, [escrows]);

  return (
    <>
      <div className="contract">
        <h1> Make Escrow Contract </h1>
        <label>
          Arbiter
          <input type="text" id="arbiter" placeholder="an arbiter address, example: 0xABC" />
        </label>

        <label>
          Beneficiary
          <input type="text" id="beneficiary" placeholder="a beneficiary address, example: 0x123" />
        </label>

        <label>
          Deposit Amount (ETH)
          <input type="text" id="amount" placeholder="example: 0.001" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          <b>Deploy</b>
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map( (escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
      
      <div> <Footer /> </div>
    </>
  );
}

export default App;
