async function displayWineDetails(hash) {
    const detailsContainer = document.getElementById('wine-details');
    const wineContainer = document.getElementsByClassName('wine');
    const data = document.querySelectorAll('.data');
    if (!detailsContainer) {
        console.error('Details container not found!');
        return
    }

    try {
        const response = await fetch(`/api/getWineDetails?hash=${hash}`);
        const wineDetails = await response.json();
        console.log("Wine details:", wineDetails);
        let c = 0;
        let max = wineDetails.length;
        data.forEach(dt => {
            dt.innerHTML = wineDetails[c];
            c++;
            if (c == max) {
                brake;
            }
        });

        // detailsContainer.innerHTML = `
        //     <p>Name: ${wineDetails[0]}</p>
        //     <p>Date: ${wineDetails[1]}</p>
        //     <p>Manufacturer: ${wineDetails[2]}</p>
        //     <p>Type: ${wineDetails[3]}</p>
        // `;

        // wineContainer.innerHTML = `
        //     <div class="brandName">${wineDetails[2]}</div>
        //     <div class="details">
        //         <div class="age">${wineDetails[1]}</div>
        //         <div class="species">${wineDetails[3]}</div>
        //     </div>
        //     <div class="description">${wineDetails[0]}</div>
        // `
    } catch (error) {
        console.error('Error fetching wine details:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        displayWineDetails(hash);
    }
});