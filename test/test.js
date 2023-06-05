const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Escrow', function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiter;
  const deposit = ethers.utils.parseEther('0.1'); // ETH
  beforeEach(async () => {
    depositor = ethers.provider.getSigner(0); //deployer
    beneficiary = ethers.provider.getSigner(1);
    arbiter = ethers.provider.getSigner(5);
    const Escrow = await ethers.getContractFactory('Escrow');
    contract = await Escrow.deploy(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: deposit,
      }
    );
    await contract.deployed();
  });

  it('should be funded initially', async function () {
    let balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.eq(deposit);
  });

  describe('after escrow contract approval from address other than arbiter', () => {
    it('should revert a beneficiary approval', async () => {
      await expect(contract.connect(beneficiary).approve()).to.be.reverted;
    });

    it('should revert a depositor approval', async () => {
      await expect(contract.connect(depositor).approve()).to.be.reverted;
    });
  });

  describe('after contract approval from the arbiter', () => {
    it('should transfer balance to beneficiary', async () => {
      const before = await ethers.provider.getBalance(beneficiary.getAddress());
      const approveTxn = await contract.connect(arbiter).approve();
      await approveTxn.wait();

      const after = await ethers.provider.getBalance(beneficiary.getAddress());
      expect(after.sub(before)).to.eq(deposit);
    });
  });
});
