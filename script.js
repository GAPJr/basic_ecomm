let products = [];
// Function to talk to the server and return a bunch of products
async function getAllProducts() {
    let cards = [];
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/products", {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (products = data))
        .catch((_) => cards.push(errorMessage));

    if (products.length > 0 && cards.length < 1) {
        for (const index in products) {
            let product = products[index];

            let productID = product.id;
            let productName = product.title;
            let productImageURL = product.image;
            let productPrice = product.price;
            let productDescription = product.description;

            let card = `
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 card-deck">
                    <div class="card my-3 rounded-3 shadow-sm text-center ">
                        <div class="card-title text-white p-2 bg-danger">${productName}</div>    
                        <img
                                class="card-img-center w-auto p-5 mh-100"
                                src="${productImageURL}"
                                alt=""
                            />
                        <div class="card-body product-caption">
                            <div class="card_area">
                                <div class="product_count_area">
                                    <p>$ ${productPrice}</p>
                                </div>
                                <div id="prodID_${productID}" class="card-footer text-white bg-primary">
                                    <span>Add to cart</span>
                                    <i class="fas fa-cart-plus "></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            cards.push(card);
        }
    } else if (products.length < 1 && cards.length < 1) {
        cards.push(errorMessage);
    }
    return cards;
}

// Function to talk to the server and return a bunch of products
async function getAllCategories() {
    let categories = [];
    let cards = [];
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/products/categories", {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (categories = data))
        .catch((_) => cards.push(errorMessage));
    if (categories.length > 0 && cards.length < 1) {
        for (category of categories) {
            let card = `
                 <li>
                    <a class="dropdown-item text-light" href="#">${category.toUpperCase()}</a>
                </li>
            `;
            cards.push(card);
        }
    } else if (categories.length < 1 && cards.length < 1) {
        cards.push(errorMessage);
    }
    return cards;
}

document.addEventListener("DOMContentLoaded", async function () {
    let cards = await getAllProducts();
    document.querySelector("#card-container").innerHTML = cards.join("");
    let catMenu = await getAllCategories();
    document.querySelector("#dropdown-menu").innerHTML = catMenu.join("");
});

let totalPrice = 0;
const teste = () => {
    if (products.length > 0) {
        const btnAdd2Cart = document.querySelectorAll(".card-footer");
        btnAdd2Cart.forEach((btn) => {
            btn.addEventListener("click", async function () {
                let productID = this.id;
                console.log(productID);
                let productPrice = document.querySelector(productID).innerText;
                totalPrice += parseFloat(productPrice);
                document.querySelector(".totalPrice").innerText = totalPrice;
            });
        });
    }
};

var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", function () {
    myInput.focus();
});
