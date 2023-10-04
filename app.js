// DOM Nodes
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");

//make sure the user only has 25 clicks
let userClicks = 0;
const maxClicks = 25;

const products = [];

// keep each product in an object in a constructor
function Product(name, views, clicks) {
  this.name = name;
  this.src = `./images/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;

  //take new object that is created, and put it into the array
  products.push(this)
}

// make the products
//if there is nothing in local storage, instantiate/create default/zero clicks products
//BUT if there is something in local storage, get that, and turn into my products

if (localStorage.getItem('products') === null) {
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
  const productsLS = JSON.parse(localStorage.getItem("products"))
  //LS is local storage
  //for each item in the productsLS array, make a new product
  for (let i = 0; i < productsLS.length; i++){
    //create a new product for each item in the array (ad the Product function automatically adds it to the array)
    //instantiate - get the first item name/views/clicks from local storage then 2nd etc...
    new Product(productsLS[i].name, productsLS[i].views, productsLS[i].clicks);

  }
}



// function to choose a random index
function getRandomIndex() {
  return Math.floor(Math.random() * products.length)
}

// function to render 3 random products on the page (using the 3 img tags)
function renderProducts() {
  // get 2 random indexes from our products array
  let chosenProductIndex = [],

  // prevent the three images being the same product and in the next attempt after each click
  function getUniqueRandomIndex() {
    let randomIndex = getRandomIndex(),

    while (chosenProductIndex.includes(randomIndex)) {
      randomIndex = getUniqueRandomIndex();
    }
    return randomIndex;
  }
  //next set of products are different from the previous set
  for (let i = 0; i < 3; i++) {
    chosenProductIndex[i] = getUniqueRandomIndex();
  }
  console.log(getUniqueRandomIndex)


  
  // change the src of our 3 images
  image1.src = products[chosenProductIndex[0]].src,
  image2.src = products[chosenProductIndex[1]].src,
  image3.src = products[chosenProductIndex[2]].src,
  image1.alt = products[chosenProductIndex[0]].name,
  image2.alt = products[chosenProductIndex[1]].name,
  image3.alt = products[chosenProductIndex[2]].name,

  // increase the product views
  products[chosenProductIndex[0]].views++;
  products[chosenProductIndex[1]].views++;
  products[chosenProductIndex[2]].views++;
}

// handle what happens when the img is being clicked
function handleImgClick(event) {
  //render 3 more images
  // check if the clicks has run out
  if (userClicks >= maxClicks) {
    alert("you have run out of votes");
    renderChart();
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
  
}

image1.addEventListener("click", handleImgClick),
image2.addEventListener("click", handleImgClick),
image3.addEventListener("click", handleImgClick),

// make button view results
const viewResults = document.getElementById("view-results")
viewResults.addEventListener("click", showResults);

renderProducts();

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
  renderChart();
}

function renderChart() {
  const ctx = document.getElementById("myChart"),

  const labels = [];
  const views = [];
  const clicks = [];

  for (let i = 0; i < products.length; i++) {
    labels.push(products[i].name);
    views.push(products[i].views);
    clicks.push(products[i].clicks);
  }

  // run the Chart function (that does the chart making)
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of views",
          data: views,
          borderWidth: 1,
        },
        {
          label: "# of clicks",
          data: clicks,
          borderWidth: 1,
        },
      ],
    },
  });
}

renderProducts();
