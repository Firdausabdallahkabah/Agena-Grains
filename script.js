document.querySelector('form').addEventListener('submit',(e) =>{
    e.preventDefault();
    alert('Thank you for reaching out! We will contact you soon.');
});
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click',() =>{
    nav.classList.toggle('visible');
});

document.querySelectorAll('order-btn').forEach(button =>{
    button.addEventListener('click',() =>{
        alert('Thank you for order! We will contact you soon.');
    });
});

let cart = [];
document.querySelectorAll('add-to-cart').forEach(button =>{
    button.addEventListener('click',(e) =>{
        const product = e.target.parentElement;
        const productId = product.getAttribute('data-id');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('price').textContent;


        
        const cartItem = {id: productId,name: productName, price: productPrice };
        cart.push(cartItem);

        alert('${productName} added to cart.');
        updateCartDisplay();
    });
});

function updateCartDisplay(){
    const cartContainer = document.querySelector('#cart-summary');
    cartContainer = innerHTML = '';

    if (cart.length === 0){
        cartContainer.textContent = 'Your cart is empty';
    } else {
        cart.forEach(item =>{
            const cartItem = document.createElement('div');
            cartItem.textContent = '${item.name} - ${item.price}';
            cartContainer.appendChild(cartItem);
        });
        const total = cart.reduce((sum,item) => sum + parseFloat(item.price.replace('$','')),0);
        const totalDisplay = document.createElement('div');
        totalDisplay.textContent = 'Total: $${total.toFixed(2)}';
        cartContainer.appendChild(totalDisplay);
    }
}


document.getElementById('category').addEventListener('change',(e) =>{
    const selectedCategory = e.target.value;
    const items = document.querySelectorAll('catalog-item');

    items.forEach(item =>{
        if (selectedCategory === 'all' || item.querySelector('h3').textContent.toLowerCase() === selectedCategory){
            item.computedStyleMap.display = 'block'
        } else{
            item.computedStyleMap.display = 'none';
        }
    
    });
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.x/firebase-database.js";

const firebaseConfig = {
    apikey:"AIzaSyC578SfbSHKgzXSc-sfkX7MqGzD9b-YyH4",
    authDomain: "agena-grains.firebaseapp.com",
    databaseURL: "https://agena-grains.firebaseio.com",
    projectId: "agena-grains",
    storageBucket: "agena-grains.firebasestorage.app",
    messagingSenderId: "985560975161",
    appId: "1:985560975161:web:3a254c5068627400274ae8",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function saveOrder(order) {
    const ordersRef = ref(db,'orders');
    push(ordersRef,order);
}

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.x/firebase-auth.js";

const auth = getAuth();
document.getElementById('login-form').addEventListener('submit',(e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential =>{
        alert('login successful');
    })
    .catch(error =>{
        alert('Error:' + error.message);
    });
});