import { useEffect, useState } from "react"
import Web3 from "web3"
import { web3ProviderFrom } from "../tomb-finance/ether-utils"
import { getBalance } from "../utils/formatBalance"
import axios from 'axios'

const web3 = new Web3("https://bsc-dataseed.binance.org/")

const ERC20ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]
const treasuryAddress = "0x8378EAeDa45Fb7b5a21710dc751Ab08aDacf5aD0"

// const assetList = [
//     "0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca", // 2shares
//     "0x6398ACBBAB2561553a9e458Ab67dCFbD58944e52", // 2shares/FTM LP
//     "0x83A52eff2E9D112E9B022399A9fD22a9DB7d33Ae", // cash/wftm
//     "0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7", // printer
//     "0xd352daC95a91AfeFb112DBBB3463ccfA5EC15b65", // printer/wftm
// ]

// const contracts = assetList.map(asset => new web3.eth.Contract(ERC20ABI, asset))

// function useTotalTreasuryBalance() {
//     const [ prices, setPrices ] = useState(assetList.map(asset => {
//         return { token: asset, value: 0 }
//     }))
//     useEffect(() => {
//         getPrices()
//     }, [])

//     async function getPrices() {
//         for (const token of contracts) {
//             console.log(token)
//         }
//     }

//     return prices
// }

function useTotalTreasuryBalance() {
    const ThreeShares = new web3.eth.Contract(ERC20ABI, '0xDACDCf56f42b3F3a0fB57459CeFC10b8F393f199')
    const WFTM = new web3.eth.Contract(ERC20ABI, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    const [balance, setBalance] = useState(0)
    const [balance_2shares_wftm, setBalance_2shares_wftm] = useState(0)
    const [balance_cash_wftm, setBalance_cash_wftm] = useState(0)
    const [balance_printer_wftm, setBalance_printer_wftm] = useState(0)
    const [balance_cash, setBalance_cash] = useState(0)
    const [balance_printer, setBalance_printer] = useState(0)
    const [balance_2shares, setBalance_2shares] = useState(0)

    useEffect(() => {
        getBalance()
        const interval = setInterval(() => {
            getBalance()
        }, 30000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return {balance}

    async function getBalance() {
        // const { data2omb } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=2omb-fi')
        // const { data2shares } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=2share')
        // const { datacash } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=30mb-token')
        
        //const { data } = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=3shares')
        //const pRinterBalance = web3.utils.fromWei(await ThreeShares.methods.balanceOf(treasuryAddress).call())
        //const valueprinter = pRinterBalance * data[0].current_price

        const data2sharesAndcash = await axios('https://openapi.debank.com/v1/user/chain_balance?id=0x8378EAeDa45Fb7b5a21710dc751Ab08aDacf5aD0&chain_id=bsc')   
        setBalance(data2sharesAndcash.data.usd_value)
   
    }

    async function getcashBalance() {
        const tokencash = new web3.eth.Contract(ERC20ABI, '0x14DEf7584A6c52f470Ca4F4b9671056b22f4FfDE')
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=BUSD&sellToken=0x14DEf7584A6c52f470Ca4F4b9671056b22f4FfDE&sellAmount=100000000000000000`)
        const usdValue = 1

        return usdValue
    }

    async function getprinterBalance() {
        const tokenprinter = new web3.eth.Contract(ERC20ABI, '0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7')
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=BUSD&sellToken=0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7&sellAmount=100000000000000000`)
        const usdValue = Number(web3.utils.fromWei(await tokenprinter.methods.balanceOf(treasuryAddress).call())) * Number(data.price)

        return usdValue
    }

    async function get2sharesBalance() {
        const token2shares = new web3.eth.Contract(ERC20ABI, '0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca')
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=BUSD&sellToken=0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca&sellAmount=100000000000000000`)
        const usdValue = Number(web3.utils.fromWei(await token2shares.methods.balanceOf(treasuryAddress).call())) * Number(data.price)

        return usdValue
    }

    async function getLPPrice(LPAddress, tokenAddress) {
        const token = new web3.eth.Contract(ERC20ABI, tokenAddress)
        const LPtoken = new web3.eth.Contract(ERC20ABI, LPAddress)
        const { data } = await axios('https://api.binance.com/api/v1/ticker/price?symbol=FTMUSDT')
        const wftmValue = Number(web3.utils.fromWei(await WFTM.methods.balanceOf(LPAddress).call())) * Number(data.price)

        const tokenValue = Number(await getTokenPrice(tokenAddress)) * Number(web3.utils.fromWei(await token.methods.balanceOf(LPAddress).call()))

        const OneTokenValue = (wftmValue + tokenValue) / Number(web3.utils.fromWei(await LPtoken.methods.totalSupply().call()))

        const total = OneTokenValue * Number(web3.utils.fromWei(await LPtoken.methods.balanceOf(treasuryAddress).call()))

        return total
    }

    async function getTokenPrice(tokenAddress) {
        const { data } = await axios(`https://fantom.api.0x.org/swap/v1/quote?buyToken=BUSD&sellToken=${tokenAddress}&sellAmount=100000000000000000`)
        return data.price
    }
}

export default useTotalTreasuryBalance