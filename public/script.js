const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });
  
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };
  
  ScrollReveal().reveal(".header__content h4", {
    ...scrollRevealOption,
  });
  ScrollReveal().reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 500,
  });

  ScrollReveal().reveal(".header__content h2", {
    ...scrollRevealOption,
    delay: 1000,
  });
  ScrollReveal().reveal(".header__content p", {
    ...scrollRevealOption,
    delay: 1500,
  });
  ScrollReveal().reveal(".header__btn", {
    ...scrollRevealOption,
    delay: 2000,
  });
  
  ScrollReveal().reveal(".intro__card", {
    ...scrollRevealOption,
    interval: 500,
  });

  ScrollReveal().reveal(
    ".about__row:nth-child(3) .about__image img, .about__row:nth-child(5) .about__image img",
    {
      ...scrollRevealOption,
      origin: "left",
    }
  );
  ScrollReveal().reveal(".about__row:nth-child(4) .about__image img", {
    ...scrollRevealOption,
    origin: "right",
  });
  ScrollReveal().reveal(".about__content span", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".about__content h4", {
    ...scrollRevealOption,
    delay: 1000,
  });
  ScrollReveal().reveal(".about__content p", {
    ...scrollRevealOption,
    delay: 1500,
  });
  ScrollReveal().reveal(".product__card", {
    ...scrollRevealOption,
    interval: 500,
  });
  
  ScrollReveal().reveal(".service__card", {
    duration: 1000,
    interval: 500,
  });

  const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });

  
// Update auth link based on login status
const authLink = document.getElementById('authLink');
if (authLink) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        authLink.innerHTML = `<a href="#" id="logoutBtn">Logout (${currentUser.name})</a>`;
    } else {
        authLink.innerHTML = '<a href="signin.html">Sign In</a>';
    }
}
  // ... (keep all existing code above the auth link section)

// Update auth link based on login status
function updateAuthLink() {
  const authLink = document.getElementById('authLink');
  if (authLink) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
          authLink.innerHTML = `<a href="#" id="logoutBtn">Logout (${currentUser.name})</a>`;
          // Add event listener to the new logout button
          document.getElementById('logoutBtn').addEventListener('click', function(e) {
              e.preventDefault();
              localStorage.removeItem('currentUser');
              window.location.href = 'signin.html';
          });
      } else {
          authLink.innerHTML = '<a href="signin.html">Sign In <i class="ri-login-circle-line"></i></a>';
      }
  }
}

// Call this function when the page loads
updateAuthLink();

// Also update the auth link when the mobile menu is toggled
navLinks.addEventListener('click', (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
  updateAuthLink(); // Update auth link state after menu interaction
});

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        }
    });
}

document.querySelectorAll('a[href="#"]').forEach(link => {
  if (link.textContent.trim() === 'Read More') {
      link.href = 'no-info.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product__card');
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
          
            const existing = cart.find(item => item.name === name);
if (existing) {
    existing.quantity += 1;
} else {
    cart.push({ name, price, quantity: 1 });
}

            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    // Update cart count on page load
    updateCartCount();
});

// Function to update the cart icon count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
const countSpan = document.getElementById('cart-count');
if (countSpan) {
    countSpan.textContent = totalQuantity;
}

}
