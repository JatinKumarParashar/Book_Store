const token=localStorage.getItem('token')
const sellerId=localStorage.getItem('sellerId');
var post=1;

function save(event) {
   event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const id=event.target.customerId.value;
    const obj = {
        username,
        email,
        password,
        id,
        
    }
    //console.log('obj >>>>>',obj,token);
   if (post) {
	 axios.post('http:localhost:8000/customer/add-customer', obj)
	        .then(result => {
	            console.log(result);
	        })
	        .catch(err => {
	            console.log(err);
	        })
}
else{
    axios.put('http:localhost:8000/customer/edit-customer', obj)
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
    axios.get('http:localhost:8000/customer/get-customer')
        .then(result => {
           console.log(result.data);
            result.data.forEach(element => {
                showBooksOnScreen(element);
                console.log(element)
            });
        })
        .catch(err => {
            console.log(err);
        })

})

function showBooksOnScreen(customer) {

    const child = `<li id="${customer.id}">
        ${customer.username} - ${customer.email} 
        <button onclick="deleteBook(${customer.id})">Delete</button>
        <button onclick="edit(${customer.id},'${customer.username}','${customer.email}','${customer.password}')">Edit</button>
        </li><br>`;
    //console.log('child>>>>', child);
    books.innerHTML += child;
   // console.log('books >>', books)
}



function deleteBook(id) {
    const obj = {
        id
    }
    console.log('obj',obj)
    axios.delete(`http:localhost:8000/customer/delete-customer/${id}`)
    .then(result=>{
        console.log(result);
        removeFromScreen(id);
    })
    .catch(err=>{
        console.log(err);
    })
}

function removeFromScreen(id){
    let deletechild = document.getElementById(id);
    if(deletechild){
        books.removeChild(deletechild);
    }
}


function edit(id,username,email,password){
    post=0;
document.getElementById('username').value=username;
document.getElementById('email').value=email;
document.getElementById('password').value=password;
document.getElementById('customerId').value=id;
removeFromScreen(id)
}