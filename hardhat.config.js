require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_RPC_URL_SEPOLIA,
      accounts: [process.env.SEPOLIA_TESTNET_PRIVATE_KEY]
    }
  },
  solidity: '0.8.17',
  paths: {
    artifacts: './app/src/artifacts',
  }
};
