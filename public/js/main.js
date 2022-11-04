const formProductos = document.querySelector('#formProductos');
const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const inputImg = document.querySelector('#linkImg');
const divProductos = document.querySelector('#productos');
const formMessages = document.querySelector('#formMessages');
const inputMessages = document.querySelector('#inputMessages');
const inputUsername = document.querySelector('#inputUsername');
const messages = document.querySelector('#messages');


const socket = io();

formProductos.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(inputTitle.value && inputImg.value && inputPrice.value){
        const nuevoProducto = {
            title: inputTitle.value,
            price: inputPrice.value,
            img: inputImg.value
        }
        socket.emit('Cliente:nuevoProducto', nuevoProducto) 
        inputImg.value = '';
        inputTitle.value = '';
        inputPrice.value= '';
    }
})
socket.on('Server:TodosLosProductos', async  (data)=>{
    const products = await data;
     console.log(products)
     divProductos.innerHTML = '';
     products.forEach(function(product){
         divProductos.innerHTML += `
             <div class="card m-2 tarjeta">
               <div class="row g-0">
               <div class="col-md-5">
                 <img class="img-fluid rounded-start imagen" src=${product.img} >
               </div>
               <div class="col-md-7">
                 <div class="card-body">
                 <h5 class="card-title">${product.title}</h5>
                 <p class="card-text">Precio $${product.price}</p>
                 </div>
               </div>
               </div>
             </div>
         `
     });
})

formMessages.addEventListener('submit', (e)=>{
  e.preventDefault();

  if(inputMessages.value){
    const nuevoMensaje ={
      username: inputUsername.value,
      message: inputMessages.value 
    }
    socket.emit('Cliente:chatmessage', nuevoMensaje);
    inputMessages.value = '';
    inputUsername.value = '';
  }
})


socket.on('Server:TodosLosMensajes', async(data)=>{
  const mensajes = await data
  console.log(mensajes)
  messages.innerHTML = '';
  mensajes.forEach(function(message){
    messages.innerHTML +=  `
    <li><span class="usuario">${message.username}</span> [<span class="mensaje">${message.time}</span>]:  ${message.message}</li>
    `
    window.scrollTo(0, document.body.scrollHeight);
  })
})




