// Sample product data - you can expand this with more products
const products = [
    {
        id: 1,
        name: "Dog Trash Bag",
        description: "Convenient and eco-friendly trash bags for easy pet waste disposal.",
        price: "₹550",
        image: "assets/products-1.jpg"
    },
    {
        id: 2,
        name: "Pet Accessories",
        description: "Explore our range of stylish and functional accessories for your furry friends.",
        price: "₹950",
        image: "assets/products-2.AVIF"
    },
    {
        id: 3,
        name: "Dog Food",
        description: "Nutritious and delicious dog food to keep your pet healthy and happy.",
        price: "₹790",
        image: "assets/products-3.png"
    },
    {
        id: 4,
        name: "Cat Food",
        description: "Premium quality cat food with all essential nutrients.",
        price: "₹650",
        image: "assets/products-4.jpg"
    },
    {
        id: 5,
        name: "Pet Bed",
        description: "Comfortable and cozy bed for your pet to rest.",
        price: "₹1200",
        image: "assets/products-5.jpg"
    },
    {
        id: 6,
        name: "Pet Leash",
        description: "Durable and stylish leash for safe walks with your pet.",
        price: "₹450",
        image: "assets/products-6.webp"
    },
    {
        id: 7,
        name: "Pet Toy Set",
        description: "Fun toys to keep your pet entertained and active.",
        price: "₹350",
        image: "assets/products-7.jpg"
    },
    {
        id: 8,
        name: "Pet Grooming Kit",
        description: "Complete grooming kit for maintaining your pet's hygiene.",
        price: "₹850",
        image: "assets/products-8.webp"
    }
];

// Function to render products
function renderProducts() {
    const productsGrid = document.querySelector('.products__grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product__card';
       // Update the product card HTML in renderProducts()
       productCard.innerHTML = `
       <img src="${product.image}" alt="${product.name}">
       <h4>${product.name}</h4>
       <p>${product.description}</p>
       <h3>${product.price}</h3>
       <button class="add-to-cart" data-id="${product.id}">
         Add to Cart <i class="ri-shopping-cart-line"></i>
       </button>
     `;

        productsGrid.appendChild(productCard);
    });

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Function to handle adding to cart
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Get current cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderProducts);