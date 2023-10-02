// DOM Nodes
let productsContainer = document.querySelector(".container");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img:nth-child(3)");

// keep each product in an object
function Products(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

// function to choose a random product
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// function to render 2 random products
function renderGoats() {
  // get 2 random indexes from our products array
  let product1Index = getRandomIndex();
  let product2Index = getRandomIndex();
  let product3Index = getRandomIndex();

  // prevent the two images being the same product
  while (
    product1Index === product2Index ||
    product2Index === product3Index ||
    product1Index === product3Index
  ) {
    product2Index = getRandomIndex();
    product3Index = getRandomIndex();
  }

  // change the src of our 3 images
  image1.src = allProducts[product1Index].src;
  image2.src = allProducts[product2Index].src;
  image3.src = allProducts[product3Index].src;
  image1.alt = allProducts[product1Index].name;
  image2.alt = allProducts[product2Index].name;
  image3.alt = allProducts[product3Index].name;

  // increase the product views
  allProducts[product1Index].views++;
  allProducts[product2Index].views++;
  allProducts[product3Index].views++;
}

// handle the product being clicked
function handleProductClick(event) {
  // get the name of the product we just clicked
  let clickedProduct = event.target.alt;

  // check if the click is on an image
  if (event.target === productsContainer) {
    alert("Please click on an image");
  } else {
    // render more products
    renderProducts();
  }

  // increase the clicks of the product
  // loop through allProducts
  for (let i = 0; i < allProducts.length; i++) {
    // check if the name of the product in the array, matches the alt tag of our image
    if (clickedProduct === allProducts[i].name) {
      // increase the number of clicks
      allProducts[i].clicks++;
      // stop the for loop because we found the product
      break;
    }
  }
}

// make the products
const allProducts = [
  new Product("Bag", "./images/bag.jpg"),
  new Product("Banana", "./images/banana.jpg"),
  new Product("Boots", "./images/boots.jpg"),
  new Product("Breakfast", "./images/brakfast.jpg"),
  new Product("Bubblegum", "./images/bubblegum.jpg"),
  new Product("Cthulhu", "./images/cthulhu.jpg"),
  new Product("Dog Duck", "./images/dog-duck.jpg"),
  new Product("Sweep", "./images/sweep.png"),
  new Product("Tauntaun", "./images/tauntaun.jpg"),
];

// render the results
// when the user clicks the view results button
// render a ul full of li's that tell the user how many times each product has been clicked

// add the event listener to the product
productsContainer.addEventListener("click", handleProductClick);

renderProducts();
