# Decentralized Escrow Application

## About

Project Name: Decentralized Escrow Application

Skills: Blockchain, Ethereum, Solidity, React, Smart Contracts, Hardhat.

## Project Description:

An Escrow Dapp built with [Hardhat](https://hardhat.org/) and React. D-App connects to Ethereum blockchain for interacting with escrow contract(s) and uses a React frontend.

## Overview:

The Escrow dApp is an decentralised application that leverages blockchain technology & smart contracts to create and interact with secure & transparent escrow contracts. The D-App provides a decentralized platform for transactions between multiple parties.

Escrow dApp combines the power of React for the frontend interface & Solidity for smart contract development. By using Hardhat development environment & ethers.js, the app offers a framework for deploying, testing & interacting with the contracts.

## Key Features:

1. Escrow Smart Contract: The escrow contract acts as a trusted intermediary between all parties involved in a transaction. The smart contract ensures that funds are securely held until approval, protecting the buyer (depositor) and the seller (beneficiary).

2. User-Friendly Interface: The frontend interface built with React, provides a nice user experience. D-App allows participants to create new escrow contracts, interact with existing contracts, and release funds upon arbiter approval.

3. Role-based Access: The Escrow dApp implements a role-based access system consisting of three key roles: depositor (deployer), beneficiary, and arbiter. The depositor creates & deploys the escrow contract, the arbiter acts as a third-party approver of the contract. the beneficiary receives the funds once the contract is approved.

4. Trustless & Transparent: Escrow dApp ensures trustless transactions by leveraging the immutability & transparency of blockchain. All parties can verify the contract details, including arbiter, depositor and beneficiary address along with the amount (in ETH). Track the approval using events, and validate the release of funds through smart contract.

5. Secure Deployment & Testing: DApp utilizes Hardhat, a powerful smart contract development environment to ensure secure deployment, testing & debugging using hardhat testing framework & Chai assertion library.

6. Miscellaneous:

   - App transfers funds held in escrow to beneficiary instantly on approval.

   - Function Modifiers implemented for role-based access.

   - Escrow approval limited to arbiter role, to prevent unauthorised access.

   - Events triggered for contract approval by the arbiter.

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts.

Compile the contracts using `npx hardhat compile`. The artifacts path configuration can be found in `hardhat.config.js`.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
