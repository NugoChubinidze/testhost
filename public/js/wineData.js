async function displayWineDetails(hash) {
    const detailsContainer = document.getElementById('wine-details');
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