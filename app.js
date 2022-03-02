
const searchInput = () => {
    document.getElementById('resultsContainer').innerHTML = ''
    document.getElementById('detailsContainer').innerHTML = ''

    // Catching the input data 
    const inputText = document.getElementById('input').value
    const inputData = inputText.toLowerCase()

    // Fetching input data from API 
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputData}`
    fetch(url)
        .then(responce => responce.json())
        .then(data => getPhoneResults(data.data.slice(0, 20)))


}




const getPhoneResults = phones => {


    // Getting the number of available results 
    const numResults = document.getElementById('numberOfResults')
    numResults.innerText = phones.length

    //No results found display
    if (phones.length == 0) {
        document.getElementById('no-results').style.display = 'block'

    }
    else if (phones.length != 0) {
        document.getElementById('no-results').style.display = 'none'
    }




    phones.forEach(phone => {

        const div = document.createElement('div')
        div.classList = 'card text-center col-sm-12 col-md-3  mx-3 my-3'

        const informationOfPhone = `
        <div class=" d-flex justify-content-center">
        <img src="${phone.image}" class="card-img-top img-fluid w-50 p-3" alt="...">
        </div>
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
    document.getElementById('detailsContainer').innerHTML = ''
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(responce => responce.json())
        .then(data => displayDetails(data))
}

// Display details information of the phone 


const displayDetails = details => {


    const div = document.createElement('div')

    // Checking the relise date avaibality 

    const getDate = () => {
        if (details.data.releaseDate === "") {
            return 'No relase date found'
        }
        else { return `${details.data.releaseDate}` }
    }

    const otherFeatures = other => {

        for (const [key, value] of Object.entries(other)) {
            return `${key} : ${value}`
        }


    }



    const detailsInformation = `
    <div class="card mb-3 m-auto mt-2" style="max-width: 1040px;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex justify-content-center align-items-center">
                        <img src="${details.data.image}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">Name: ${details.data.name}</h4>
                            <h4 class="card-title">Brand: ${details.data.brand}</h4>
                            <h5 class="card-title">Main Features: </h5>
                            <ul>
                                <li>Storage: ${details.data.mainFeatures.storage}</li>
                                <li>Display Size: ${details.data.mainFeatures.displaySize}</li>
                                <li>Memory: ${details.data.mainFeatures.memory}</li>
                                <li>Release Date: ${getDate()} </li>
                            </ul>
                            <p class="card-text"><h5>Sensors:</h5>${details.data.mainFeatures.sensors.join()}</p>
                            <p class="card-text"><h5>Others:</h5>${otherFeatures(details.data.others)}</p>
                        </div>
                    </div>
                </div>
            </div>
    
    `



    div.innerHTML = detailsInformation
    document.getElementById('detailsContainer').appendChild(div)



}