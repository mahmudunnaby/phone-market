
const searchInput = () => {
    const inputText = document.getElementById('input').value
    const inputData = inputText.toLowerCase()

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputData}`
    fetch(url)
        .then(responce => responce.json())
        .then(data => getPhoneResults(data.data))

}


const getPhoneResults = phones => {
    console.log(phones)
}