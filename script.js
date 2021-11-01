let products = [];
let cards = [];
let cardContainer = document.querySelector("#card-container");
let categoryMenu = document.querySelector("#dropdown-menu");
let updateCategoryItens = () => document
    .querySelectorAll(".dropdown-item")
    .forEach((categoryMenu) => {
        categoryMenu.addEventListener("click", async function () {
            categoryMenu == "ALL"
                ? await updateCards(getAllProducts())
                : await updateCards(
                      getProductsInCategory(
                          categoryMenu.innerText.toLowerCase()
                      )
                  );
        });
    });

document.addEventListener("DOMContentLoaded", async function () {
    await updateCards(getAllProducts());
    await updateCategoryMenu();
    updateCategoryItens();
    addToCart();
});
// Function to talk to the server and return a bunch of products
async function updateCards(productList) {
    cards = [];
    let products = await productList;
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
                                <div id="prodID_${productID}" class="card-footer btnAdd2Cart text-white bg-primary">
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
    cardContainer.innerHTML = cards.join("");
}

// Function to talk to the server and return a bunch of products
async function updateCategoryMenu() {
    let categories = await getAllCategories();
    let lstCategories = [
        '<li><a class="dropdown-item text-dark" onclick="updateCards(getAllProducts());">ALL</a></li>',
    ];
    if (categories.length > 0 && lstCategories.length < 2) {
        for (category of categories) {
            let dropdown = `
                 <li>
                    <a class="dropdown-item text-dark">${category.toUpperCase()}</a>
                </li>
            `;
            lstCategories.push(dropdown);
        }
    } else if (categories.length < 1 && lstCategories.length < 1) {
        lstCategories.push(errorMessage);
    }
    categoryMenu.innerHTML = lstCategories.join("");
}



const addToCart = () => {
    if (cards.length > 0) {
        document.querySelectorAll(".btnAdd2Cart").forEach((btn) => {
            btn.addEventListener("click", async function () {
                console.log(btn);
            });
        });
    }
};

// var myModal = document.getElementById("myModal");
// var myInput = document.getElementById("myInput");

// myModal.addEventListener("shown.bs.modal", function () {
//     myInput.focus();
// });
