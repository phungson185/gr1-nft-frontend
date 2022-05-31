import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
export const web3 = new Web3();
import MinterAbi from './abis/Minter.json';

export const minterContract = (address: string) => new web3.eth.Contract(MinterAbi as AbiItem[], address);
