const token = localStorage.getItem('token');
const customerId=localStorage.getItem('customerId');
//console.log('customerId >>>>',customerId);

const books = document.getElementById('books');
//console.log('books >>>>',books)

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http:localhost:8000/sellers/get-book', { headers: { 'Authorization': token } })
        .then(result => {
            // console.log(result.data);
            result.data.forEach(element => {
                showBooksOnScreen(element);
            });
        })
        .catch(err => {
            console.log(err);
        })

})

function showBooksOnScreen(book) {

    const child = `<div id="${book.id}">
        <h4>${book.title}</h4>
        <img src="${book.image}" alt="${book.title}">
        <h3>Price : $ ${book.price}</h4>
        <form onsubmit="purchaseBook(event,${book.id})" method="post">
        <label for="customerId">Enter CustomerId : </label>
        <input type="text" name="customerId" id="customerId">
        <button type="submit">Purchase</button>
        </form?
        </div><br>`;
    //console.log('child>>>>', child);
    books.innerHTML += child;
    // console.log('books >>', books)
}


function purchaseBook(event,id) {
    const customerId=event.target.customerId.value;
const obj={
    id,
    customerId
}
console.log('obj',obj);
axios.post('http:localhost:8000/customer/add-order',obj)
.then(result=>{
    console.log(result);
})
.catch(err=>{
    console.log(err);
})
}