document.getElementById('fetch-hashes').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/getWineHashes');
        const wineHashes = await response.json();
        const qrCodesContainer = document.getElementById('qr-codes');
        qrCodesContainer.innerHTML = '';

        wineHashes.forEach((hash, index) => {
            const qrImageSrc = `/api/generateQR?data=${encodeURIComponent(`https://testhost-1-56o2.onrender.com/#${hash}`)}&filename=wine_hash_${index + 1}`;
            const qrCodeDiv = document.createElement('div');
            qrCodeDiv.className = 'wine-info';
            qrCodeDiv.innerHTML = `
                <img class="qr-code" src="${qrImageSrc}" alt="QR code for wine hash ${index + 1}">
                <button onclick="displayWineDetails('${hash}')">Show Details</button>
            `;
            qrCodesContainer.appendChild(qrCodeDiv);
        });
    } catch (error) {
        console.error('Error fetching wine hashes:', error);
    }
});

async function displayWineDetails(hash) {
    const detailsContainer = document.getElementById('wine-details');
    if (!detailsContainer) {
        console.error('Details container not found!');
        return; // Exit if no container found
    }

    try {
        const response = await fetch(`/api/getWineDetails?hash=${hash}`);
        const wineDetails = await response.json();
        console.log("Wine details:", wineDetails); // Log the response to check structure

        detailsContainer.innerHTML = `
            <h1>Wine Details</h1>
            <p>Name: ${wineDetails[0]}</p>
            <p>Date: ${wineDetails[1]}</p>
            <p>Manufacturer: ${wineDetails[2]}</p>
            <p>Type: ${wineDetails[3]}</p>
        `;
    } catch (error) {
        console.error('Error fetching wine details:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1); // Get the hash without the '#'
    if (hash) {
        displayWineDetails(hash);
    }
});