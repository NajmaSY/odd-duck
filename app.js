// DOM Nodes
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");

//make sure the user only has 25 clicks
let userClicks = 0;
let maxClicks = 25;

// keep each product in an object in a constructor
function Product(name) {
  this.name = name;
  this.src = `./images/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
}

// make the products
const products = [
  new Product("bag"),
  new Product("banana"),
  new Product("boots"),
  new Product("breakfast"),
  new Product("bubblegum"),
  new Product("cthulhu"),
  new Product("dog-duck"),
  new Product("sweep"),
  new Product("tauntaun"),
];

// function to choose a random index
function getRandomIndex() {
  return Math.floor(Math.random() * products.length);
}

// function to render 3 random products on the page (using the 3 img tags)
function renderProducts() {
  // get 2 random indexes from our products array
  let product1Index = getRandomIndex();
  let product2Index = getRandomIndex();
  let product3Index = getRandomIndex();

  // prevent the three images being the same product
  while (
    product1Index === product2Index ||
    product2Index === product3Index ||
    product1Index === product3Index
  ) {
    product2Index = getRandomIndex();
    product3Index = getRandomIndex();
  }

  // change the src of our 3 images
  image1.src = products[product1Index].src;
  image2.src = products[product2Index].src;
  image3.src = products[product3Index].src;
  image1.alt = products[product1Index].name;
  image2.alt = products[product2Index].name;
  image3.alt = products[product3Index].name;

  // increase the product views
  products[product1Index].views++;
  products[product2Index].views++;
  products[product3Index].views++;
}

// handle what happens when the img is being clicked
function handleImgClick(event) {
  //render 3 more images
  // check if the clicks has run out
  if (userClicks >= maxClicks) {
    alert("you have run out of votes");
    return;
  }
  //increase number of time the user has clicked
  userClicks++;

  // get the name of the product we just clicked
  let clickedProduct = event.target.alt;
  //increase the clicks of the product
  for (let i = 0; i < products.length; i++) {
    // check if the name of the product in the array, matches the alt tag of our image
    if (clickedProduct === products[i].name) {
      // increase the number of clicks
      products[i].clicks++;
      // stop the for loop because we found the product
      break;
    }
  }
  renderProducts();
}

image1.addEventListener("click", handleImgClick);
image2.addEventListener("click", handleImgClick);
image3.addEventListener("click", handleImgClick);

//show results
function showResults() {
  // render the results
  // when the user clicks the view results button
  // render a ul full of li's that tell the user how many times each product has been clicked
  const results = document.getElementById("results");
  //put lis into a ul
  //loop products
  for (let i = 0; i < products.length; i++) {
    const li = document.createElement("li");
    const product = products[i];
    li.textContent = `${product.name} was viewed ${product.views} times, and clicked ${product.clicks} times`;
    results.appendChild(li);
  }
}
// make button view results
const viewResults = document.getElementById("view-results");
viewResults.addEventListener("click", showResults);

renderProducts();
