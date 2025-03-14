// main.js

// DOMContentLoaded ensures the script runs after the HTML has been fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeCart();
    loadBannerImage();
    setupCategoryNavigation();
    handleSearchBar();
    checkUserAuthentication();
});

// Function to initialize the navigation bar behavior
function initializeNavbar() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
        });
    }
}

// Function to initialize cart behavior by calling methods from cart.js
function initializeCart() {
    if (typeof Cart !== 'undefined') {
        Cart.updateCartDisplay(); // Assuming this function exists in cart.js to update the cart count
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const gameId = event.target.getAttribute('data-game-id');
            const gameTitle = event.target.getAttribute('data-game-title');
            const gamePrice = event.target.getAttribute('data-game-price');

            // Assuming `Cart.addToCart()` exists in cart.js
            Cart.addToCart({ id: gameId, title: gameTitle, price: gamePrice });
        });
    });
}

// Function to load the banner image dynamically
function loadBannerImage() {
    const bannerImage = document.querySelector('.banner img');
    if (bannerImage) {
        bannerImage.src = '/images/banner1.jpg'; // Assuming banner1.jpg is your banner image
    }
}

// Function to handle category navigation links
function setupCategoryNavigation() {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const category = event.target.getAttribute('data-category');
            loadGamesByCategory(category);
        });
    });
}

// Example: Load games by category (this could fetch data via API or manipulate the DOM)
function loadGamesByCategory(category) {
    // Placeholder function to load games based on category
    console.log(`Loading games for category: ${category}`);

    // Example: You could fetch data from an API or show/hide games in the UI based on the selected category
    // fetch(`/api/games?category=${category}`)
    //     .then(response => response.json())
    //     .then(games => updateGameGrid(games));
}

// Function to handle the search bar
function handleSearchBar() {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value;
            performSearch(searchTerm);
        });
    }
}

// Example search functionality
function performSearch(searchTerm) {
    console.log(`Searching for: ${searchTerm}`);

    // Example: You could fetch data from an API or manipulate the DOM to show search results
    // fetch(`/api/search?query=${searchTerm}`)
    //     .then(response => response.json())
    //     .then(results => updateSearchResults(results));
}

// Function to check if the user is authenticated
function checkUserAuthentication() {
    // This can be a simple check if a user session exists or make an API call to validate
    const userIsAuthenticated = false; // Placeholder, modify based on your authentication logic

    if (userIsAuthenticated) {
        // Example: Update UI to show user's profile or sign-out option
        console.log('User is authenticated');
    } else {
        console.log('User is not authenticated');
    }
}
