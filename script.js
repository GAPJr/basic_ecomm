let products = [];
let categories = [];
let cards = [];
let cart = [];

const cardContainer = document.querySelector("#card-container");
const categoryMenu = document.querySelector(".navbar-nav");
const categoryNavItem = document.querySelectorAll(".nav-item");
const removeBtnClass = () =>
    document
        .querySelectorAll(".nav-item")
        .forEach((test) => test.children[0].classList.remove("btn-danger"));

document.addEventListener("DOMContentLoaded", async function () {
    if (buscaDadosDoStorage("products")) {
        products = buscaDadosDoStorage("products");
    } else {
        products = await getAllProducts();
    }
    cards = await updateCards(products);
    salvarDadosNoStorage("products", products);

    if (buscaDadosDoStorage("categories")) {
        categories = buscaDadosDoStorage("categories");
    } else {
        categories = await getAllCategories();
    }
    salvarDadosNoStorage("categories", categories);
    await updateCategoryMenu(categories);

    updateCardsBasedOnCategoryItem();
});

const updateCards = async (productList) => {
    cards = [];
    let products = await productList;
    if (products.length > 0) {
        for (let product of products) {
            // let productID = product.id;
            // let productDescription = product.description;

            let card = `
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card my-3 rounded-3 shadow-sm text-center ">
                        <div className="card-header">
                            <h5 class="card-title">${product.title}</h5>
                        </div>
                        <div class="card-body h-50">
                            <img
                                    class="card-img-top w-50 h-50"
                                    src="${product.image}"
                                    alt=""
                                />
                            <p>$ ${product.price}</p>
                            <div id="product_${product.id}" class="btnAddRemoveCart">
                                <p class="card-footer text-white bg-primary">
                                    <span>Add to cart</span>
                                    <i class="fas fa-cart-plus "></i>
                                </p>
                                <div class="card-footer text-white bg-secondary d-none">
                                    <span>Remove from cart</span>
                                    <i class="fas fa-trash-alt"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            cards.push(card);
        }
    } else {
        cards.push(errorMessage);
    }
    salvarDadosNoStorage("products", products);
    cardContainer.innerHTML = cards.join("");
    btnAddRemoveToCart();
    return cards;
};

const updateCategoryMenu = async (categories) => {
    let lstCategories = [
        '<li class="nav-item"><a class="btn btn-secondary text-light p-2 m-1 nav-link">ALL</a></li>',
    ];
    if (categories.length > 0 && lstCategories.length < 2) {
        for (category of categories) {
            let dropdown = `
                 <li class="nav-item">
                    <a class="btn btn-secondary text-light p-2 m-1 nav-link">${category.toUpperCase()}</a>
                </li>
            `;
            lstCategories.push(dropdown);
        }
    } else if (categories.length < 1 && lstCategories.length < 1) {
        lstCategories.push(errorMessage);
    }
    categoryMenu.innerHTML = lstCategories.join("");
    return categories;
};

const updateCardsBasedOnCategoryItem = () =>
    document.querySelectorAll(".nav-item").forEach((categoryMenu) => {
        categoryMenu.addEventListener("click", async function () {
            removeBtnClass();
            categoryMenu.children[0].textContent == "ALL"
                ? await updateCards(getAllProducts())
                : await updateCards(
                      getProductsInCategory(
                          categoryMenu.innerText.toLowerCase()
                      )
                  );
            this.children[0].classList.add("btn-danger");
        });
    });
let test;
const btnAddRemoveToCart = () => {
    document.querySelectorAll(".btnAddRemoveCart").forEach((btn) => {
        btn.addEventListener("click", async function () {
            if (
                cart.length == 0 ||
                cart.filter(
                    (product) => product.id == this.id.split("_")[1]
                ).length == 0
            ) {
                let product = products.filter(
                    (product) => product.id == this.id.split("_")[1]
                )[0];
                cart.push(product);
                salvarDadosNoStorage("cart", cart);
                updateCartTable(cart);
                this.children[0].classList.add("d-none");
                this.children[1].classList.remove("d-none");
            } else if ( cart.length != 0 &&
                cart.filter(
                    (product) => product.id == this.id.split("_")[1]
                ).length != 0) {
                let product = products.filter(
                    (product) => product.id == this.id.split("_")[1]
                )[0];
                cart.length == 1 ? cart.splice(cart.indexOf(product),1) : cart.pop();
                salvarDadosNoStorage("cart", cart);
                updateCartTable(cart);
                this.children[0].classList.remove("d-none");
                this.children[1].classList.add("d-none");
            }
        });
    });
};

const updateCartTable = (productsOnCart) => {
    let cartTable = [];
    if (productsOnCart.length > 0) {
        for (let product of productsOnCart) {
            let cartItem = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>$ ${product.price}</td>
                    <td>
                        <input class="form-control productQtdOnCart" type="number" min="0" value='1'>
                    </td>
                    <td>$ ${product.price}</td>
                </tr>
            `;
            cartTable.push(cartItem);
        }
    } else {
        cartTable.push(errorMessage);
    }
    document.querySelector(".cart-table").innerHTML = cartTable.join("");
    productQtdOnCart();
    document.querySelector(".qtdProductsOnCart").innerHTML =
        productsOnCart.length;
};

const productQtdOnCart = () => {
    document
        .querySelectorAll(".productQtdOnCart")
        .forEach((productQtdOnCart) => {
            productQtdOnCart.addEventListener("change", function () {
                console.log(this.value);
                let price =
                    productQtdOnCart.parentElement.parentElement.children[2]
                        .textContent;
                let total = Number(this.value) * Number(price.split(" ")[1]);
                productQtdOnCart.parentElement.parentElement.children[4].textContent =
                    "$ " + total;
            });
        });
};
