const QRCode = require('qrcode');
const { ethers } = require('ethers');
const { InfuraProvider } = require('@ethersproject/providers');
require('dotenv').config();

const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_date",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_manufacturer",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_wineType",
                "type": "string"
            }
        ],
        "name": "registerWine",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_wineHash",
                "type": "bytes32"
            }
        ],
        "name": "getWine",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllWineHashes",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xfc4E141d708Be4192c7b302B8CF950b3Dc0F6b86';

// Provider (using a public Ethereum RPC endpoint, e.g., Infura)
const provider = new InfuraProvider('sepolia', '0b2745c0581a43aba9a132e2975cd118');

// Generate QR Code and save as an image
function generateQR(data, filename) {
    return QRCode.toFile(filename, data, {
        color: {
            dark: '#000',  // Black dots
            light: '#FFF' // White background
        }
    }).then(() => {
        console.log(`QR Code generated and saved as ${filename}`);
    }).catch(err => {
        console.error(`Error generating QR Code for ${data}:`, err);
    });
}
async function getWineHashes() {
    try {
        const wineHashes = await contract.getAllWineHashes();
        console.log('Wine Hashes:');
        wineHashes.forEach((hash, index) => {
            console.log(`Hash ${index + 1}: ${hash}`);
            generateQR(hash, `wine_hash_${index + 1}.png`);
        });
    } catch (error) {
        console.error('Error fetching wine hashes:', error);
    }
}

async function getWineDetails(wineHash) {
    try {
        const wine = await contract.getWine(wineHash);
        console.log(`Wine details for hash ${wineHash}:`);
        console.log(`Description: ${wine[0]}`);
        console.log(`Date: ${wine[1]}`);
        console.log(`Manufacturer: ${wine[2]}`);
        console.log(`Type: ${wine[3]}`);
    } catch (error) {
        console.error(`Error fetching wine details for hash ${wineHash}:`, error);
    }
}

async function registerWine(description, date, manufacturer, wineType) {
    try {
        const tx = await contract.registerWine(description, date, manufacturer, wineType);
        await tx.wait();
        console.log('Wine registered successfully.');
    } catch (error) {
        console.error('Error registering wine:', error);
    }
}

getWineHashes();