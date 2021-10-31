async function getAllUsers() {
    let users;
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/users", {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (users = data))
        .catch((_) => console.log(errorMessage));
    return users;
}

async function getAllProducts() {
    let products;
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/products", {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (products = data))
        .catch((_) => console.log(errorMessage));
    return products;
}

async function getProduct(productID) {
    let product;
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/products/" + productID, {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (product = data))
        .catch((_) => console.log(errorMessage));
    return product;
}

async function getAllCategories() {
    let categories;
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/products/categories", {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (categories = data))
        .catch((_) => console.log(errorMessage));
    return categories;
}

async function getProductsInCategory(category) {
    let productsInCategory;
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/products/category/" + category, {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (productsInCategory = data))
        .catch((_) => console.log(errorMessage));
    return productsInCategory;
}

async function getAllCarts() {
    let carts;
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/carts", {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (carts = data))
        .catch((_) => console.log(errorMessage));
    return carts;
}

async function getSingleCart(cartID) {
    let singleCart;
    const errorMessage =
        "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";

    await fetch("https://fakestoreapi.com/carts/" + cartID, {
        method: "GET",
        mode: "cors",
    })
        .then((response) => response.json())
        .then((data) => (singleCart = data))
        .catch((_) => console.log(errorMessage));
    return singleCart;
}

console.log(getAllUsers());
console.log(getAllProducts());
console.log(getProduct(1));
console.log(getAllCategories());
console.log(getProductsInCategory("electronics"));
console.log(getAllCarts());
console.log(getSingleCart(1)); 