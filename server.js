const express = require('express');
const path = require('path');
const QRCode = require('qrcode');
const { ethers } = require('ethers');
const { InfuraProvider } = require('@ethersproject/providers');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

// Contract ABI (Application Binary Interface)
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


// Contract address
const contractAddress = '0xfc4E141d708Be4192c7b302B8CF950b3Dc0F6b86';

// Provider (using a public Ethereum RPC endpoint, e.g., Infura)
const provider = new InfuraProvider('sepolia', '0b2745c0581a43aba9a132e2975cd118');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get wine hashes
app.get('/api/getWineHashes', async (req, res) => {
    try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const wineHashes = await contract.getAllWineHashes();
        res.json(wineHashes);
    } catch (error) {
        console.error('Error fetching wine hashes:', error);
        res.status(500).json({ error: 'Failed to fetch wine hashes' });
    }
});

// API endpoint to get wine details
app.get('/api/getWineDetails', async (req, res) => {
    const { hash } = req.query;
    try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const wineDetails = await contract.getWine(hash);
        res.json(wineDetails);
    } catch (error) {
        console.error('Error fetching wine details:', error);
        res.status(500).json({ error: 'Failed to fetch wine details' });
    }
});

// API endpoint to generate QR code
app.get('/api/generateQR', async (req, res) => {
    const { data, filename } = req.query;
    try {
        const qrImagePath = path.join(__dirname, 'public', filename + '.png');
        await QRCode.toFile(qrImagePath, data, {
            color: {
                dark: '#000',
                light: '#FFF'
            }
        });
        res.sendFile(qrImagePath);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});