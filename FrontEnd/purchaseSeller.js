


function save(event) {
    event.preventDefault();
    const customerId = event.target.customerId.value;
    axios.get(`http:localhost:8000/sellers/get-order/${customerId}`)
        .then(result => {
            console.log(result.data);
            result.data.forEach(element => {
                showBooksOnScreen(element);
            });
        })
        .catch(err => {
            console.log(err);
        })
}


const books = document.getElementById('books');
function showBooksOnScreen(book) {

    const child = `<div id="${book.id}">
        <h4>${book.title}</h4>
        <img src="${book.image}" alt="${book.title}">
        <h3>Price : $ ${book.price}</h4>
        </div><br>`;
    //console.log('child>>>>', child);
    books.innerHTML += child;
    // console.log('books >>', books)
}