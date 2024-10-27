let cart = JSON.parse(localStorage.getItem('cart')) || [];
const totalPriceElement = document.getElementById('total-price');
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutButton = document.getElementById('checkout-button');

function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear current cart items
    let total = 0;

    cart.forEach(game => {
        total += game.price; // Accumulate total price

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${game.imgUrl}" alt="${game.title}">
            <span>${game.title} - $${game.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    totalPriceElement.innerText = total.toFixed(2);
    emptyCartMessage.style.display = cart.length === 0 ? 'block' : 'none';
    checkoutButton.disabled = cart.length === 0;
}

// Call updateCart to display items when the page loads
updateCart();
