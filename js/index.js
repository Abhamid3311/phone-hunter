//Alert Message
const alertMsg = (display) => {
    const searchMsg = document.getElementById('search-msg');
    searchMsg.style.display = display;
};
//spinner
const toggleSpinner = (view) => {
    const spinnerView = document.getElementById('spinner');
    spinnerView.style.display = view;
};

//Search Phone 
const searchField = () => {
    const inputField = document.getElementById('input-search');
    const inputText = inputField.value;
    //clear search field
    inputField.value = '';
    //clear detail field
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    if (inputText == "") {
        alertMsg('block');
        toggleSpinner('none');
    } else {
        alertMsg('none');
        toggleSpinner('block');
        //data load
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(phones => displaySearchResults((phones.data).slice(0, 20)));
    }
    document.getElementById('load-more').style.display = "block";
};

const displaySearchResults = (phones) => {
    if (phones.length == 0) {
        alertMsg('block');
        toggleSpinner('none')
    } else {
        alertMsg('none');
        const searchResults = document.getElementById('search-result');

        //clear search result field
        searchResults.textContent = '';
        phones.forEach(phone => {
            const col = document.createElement('div');
            col.innerHTML = `
        <div class="card shadow rounded">
            <img src="${phone.image}" class="card-img-top img-fluid">
            <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <h6 class="card-title">Brand name: ${phone.brand}</h6>
                 <a href="#" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Explorer</a>
            </div>
        </div>`;
            searchResults.appendChild(col);
        });
        toggleSpinner('none');
    }
};


//Phone Details

const loadPhoneDetails = (phoneId) => {
    const phoneUrl = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(phoneUrl)
        .then(res => res.json())
        .then(details => displayPhoneDetails(details.data))
};

const displayPhoneDetails = (detail) => {
    const phoneDetail = document.getElementById('phone-detail');
    //clear phone detail
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <h3>Phone Details:</h3>
        <div class="card w-50 h-50 mx-auto">
            <img src="${detail.image}" class="card-img-top img-fluid">
            <div class="card-body">
                <h5 class="card-title">${detail.name}</h5>
                <h6 class="card-text">Brand Name: ${detail.brand}</h6>
                <p class="card-title">${detail.releaseDate ? detail.releaseDate : 'not available'}</p>
                
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Storage: ${detail?.mainFeatures.storage}</li>
                <li class="list-group-item">Display: ${detail?.mainFeatures.displaySize}</li>
                <li class="list-group-item">Chip Set: ${detail?.mainFeatures.chipSet}</li>
                <li class="list-group-item">Memory: ${detail?.mainFeatures.memory}</li>

                <li class="list-group-item"><b>Sensors</b></li>
                <li class="list-group-item"> ${detail?.mainFeatures.sensors}</li>
                
                <li class="list-group-item"><b>Other Features</b></li>
                <li class="list-group-item">WLAN: ${detail?.others?.WLAN}</li>
                <li class="list-group-item">Bluetooth: ${detail?.others?.Bluetooth}</li>
                <li class="list-group-item">GPS: ${detail?.others?.GPS}</li>
                <li class="list-group-item">Radio: ${detail?.others?.Radio}</li>
                <li class="list-group-item">NFC: ${detail?.others?.NFC}</li>
                <li class="list-group-item">USB: ${detail?.others?.USB}</li>
            </ul>

            <div class="card-body">
                <a href="#" class="card-link btn btn-primary ">Buy Now <i class="bi bi-arrow-right"></i></a>
                <a href="#" class="card-link btn btn-primary">add to cart <i class="bi bi-bag-check"></i></a>
            </div>
        </div>`;
    phoneDetail.appendChild(div);
}