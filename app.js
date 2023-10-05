// DOM Nodes
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const resetButton = document.getElementById("reset-button");

//make sure the user only has 25 clicks
let userClicks = 0;
const maxClicks = 25;

const products = [];

// function to choose a random index
function getRandomIndex() {
  return Math.floor(Math.random() * products.length);
}

// keep each product in an object in a constructor
function Product(name, views, clicks) {
  this.name = name;
  this.src = `./images/${name}.jpg`;
  this.views = views;
  this.clicks = clicks;
  //take new object that is created, and put it into the array
  products.push(this);
}

// make the products
//if there is nothing in local storage, instantiate/create default/zero clicks products
//BUT if there is something in local storage, get that, and turn into my products

function getProducts() {
  if (localStorage.getItem("products") === null) {
    new Product("bag", 0, 0);
    new Product("banana", 0, 0);
    new Product("bathroom", 0, 0);
    new Product("boots", 0, 0);
    new Product("breakfast", 0, 0);
    new Product("bubblegum", 0, 0);
    new Product("chair", 0, 0);
    new Product("cthulhu", 0, 0);
    new Product("dog-duck", 0, 0);
    new Product("dragon", 0, 0);
    new Product("pen", 0, 0);
    new Product("pet-sweep", 0, 0);
    new Product("scissors", 0, 0);
    new Product("shark", 0, 0);
    new Product("sweep", 0, 0);
    new Product("tauntaun", 0, 0);
    new Product("unicorn", 0, 0);
    new Product("water-can", 0, 0);
    new Product("wine-glass", 0, 0);
  } else {
    const productsLS = JSON.parse(localStorage.getItem("products"));
    //LS is local storage
    //for each item in the productsLS array, make a new product
    for (let i = 0; i < productsLS.length; i++) {
      //create a new product for each item in the array (ad the Product function automatically adds it to the array)
      //instantiate - get the first item name/views/clicks from local storage then 2nd etc...
      new Product(
        productsLS[i].name,
        productsLS[i].views,
        productsLS[i].clicks
      );
    }
  }
}

function resetData() {
  const clickedReset = prompt("Are you sure you want to start over?");
  if (clickedReset) {
    localStorage.clear();
    userClicks = 0;

    //reset views and clicks for each product
    for (let i = 0; i < products.length; i++) {
      products[i].views = 0;
      products[i].clicks = 0;
    }

    renderProducts();
  }
}

resetButton.addEventListener("click", resetData);

// function to render 3 random products on the page (using the 3 img tags)
function renderProducts() {
  // get 3 random indexes from our products array

  // prevent the three images being the same product and in the next attempt after each click

  // get 3 indexs from our products array
  let prod1 = getRandomIndex();
  let prod2 = getRandomIndex();
  let prod3 = getRandomIndex();

  // make sure they aren't the same
  while (prod1 === prod2 || prod1 === prod3 || prod2 === prod3) {
    prod2 = getRandomIndex();
    prod3 = getRandomIndex();
  }

  // change the src of our 3 images
  (img1.src = products[prod1].src),
    (img2.src = products[prod2].src),
    (img3.src = products[prod3].src),
    (img1.alt = products[prod1].name),
    (img2.alt = products[prod2].name),
    (img3.alt = products[prod3].name),
    // increase the product views
    products[prod1].views++;
  products[prod2].views++;
  products[prod3].views++;
}

// handle what happens when the img is being clicked
function handleImgClick(event) {
  //render 3 more images
  // check if the clicks has run out
  if (userClicks >= maxClicks) {
    alert("you have run out of votes");

    // renderChart();
    //take our array after we have updated the clicks and views, and add to localStorage
    localStorage.setItem("products", JSON.stringify(products));
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

img1.addEventListener("click", handleImgClick);
img2.addEventListener("click", handleImgClick);
img3.addEventListener("click", handleImgClick);

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
  // renderChart();
}

getProducts();
renderProducts();

// make button view results
const viewResults = document.getElementById("view-results");
viewResults.addEventListener("click", showResults);
