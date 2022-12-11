
var post = 1;

function save(event) {
    // event.preventDefault();
    const title = event.target.title.value;
    const image = event.target.image.value;
    const price = event.target.price.value;
    const sellerId = event.target.sellerId.value;
    const id = event.target.bookId.value;
    const obj = {
        title,
        image,
        price,
        sellerId,
        id
    }
    //console.log('obj >>>>>',obj,token);
    if (post) {
        axios.post('http:localhost:8000/sellers/add-book', obj)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }
    else {
        axios.put('http:localhost:8000/sellers/edit-book', obj)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })

    }
}

const books = document.getElementById('books');
//console.log('books >>>>',books)

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http:localhost:8000/sellers/get-book')
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
        <button onclick="deleteBook(${book.id})">Delete</button>
        <button onclick="edit(${book.id},'${book.title}',${book.price},'${book.image}')">Edit</button>
        </div><br>`;
    //console.log('child>>>>', child);
    books.innerHTML += child;
    // console.log('books >>', books)
}



function deleteBook(id) {
    const obj = {
        id
    }
    console.log('obj', obj)
    axios.delete('http:localhost:8000/sellers/delete-book', obj)
        .then(result => {
            console.log(result);
            removeFromScreen(id);
        })
        .catch(err => {
            console.log(err);
        })
}

function removeFromScreen(id) {
    let deletechild = document.getElementById(id);
    if (deletechild) {
        books.removeChild(deletechild);
    }
}


function edit(id, title, price, image) {
    post = 0;
    document.getElementById('title').value = title;
    document.getElementById('price').value = price;
    document.getElementById('image').value = image;
    document.getElementById('bookId').value = id;
    removeFromScreen(id);
}