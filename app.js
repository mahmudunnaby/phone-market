
const searchInput = () => {

    // Catching the input data 
    const inputText = document.getElementById('input').value
    const inputData = inputText.toLowerCase()

    // Fetching input data from API 
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputData}`
    fetch(url)
        .then(responce => responce.json())
        .then(data => getPhoneResults(data.data))

}


const getPhoneResults = phones => {
    // console.log(phones)

    // Getting the number of available results 
    const numResults = document.getElementById('numberOfResults')
    numResults.innerText = phones.length
    // console.log(phones.length)



    // for (const phone of phones) {

    //     const div = document.createElement('div')
    //     div.classList = 'card text-center col-sm-12 col-md-3  mx-3 my-3'

    //     const informationOfPhone = `

    //     <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
    //     <div class="card-body">
    //         <h5 class="card-title">Name:${phone.phone_name}</h5>
    //         <h5 class="card-title">Brand: ${phone.brand}</h5>
    //         <button onclick="getDetailsPhone(${phone.slug})" class="btn btn-primary ">Details</button>
    //     </div>`


    //     div.innerHTML = informationOfPhone
    //     document.getElementById('resultsContainer').appendChild(div)

    // }


    phones.forEach(phone => {

        const div = document.createElement('div')
        div.classList = 'card text-center col-sm-12 col-md-3  mx-3 my-3'

        const informationOfPhone = `

        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name:${phone.phone_name}</h5>
            <h5 class="card-title">Brand: ${phone.brand}</h5>
            <button onclick="getDetailsPhone('${phone.slug}')" class="btn btn-primary ">Details</button>
        </div>`


        div.innerHTML = informationOfPhone
        document.getElementById('resultsContainer').appendChild(div)

    })

}


const getDetailsPhone = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url)
    // fetch(url)
    //     .then(responce => responce.json())
    //     .then(data => console.log(data))
}

