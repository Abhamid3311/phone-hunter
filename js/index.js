const searchFood = () => {
    const inputField = document.getElementById('input-search');
    const inputText = inputField.value;

    inputField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(phones => displaySearchResult(phones.data));
};

const displaySearchResult = (phones) => {
    // console.log(phones);
    const searchResults = document.getElementById('search-result');
    searchResults.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
        const col = document.createElement('div');


        col.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top img-fluid">
            <div class="card-body">
                 <h4 class="card-title">${phone.phone_name}</h4>
                 <h6 class="card-title">Brand name: ${phone.brand}</h6>
                 <button class="btn btn-primary">Explorer</button>
            </div>
        </div>
    `
        searchResults.appendChild(col);

    })

}