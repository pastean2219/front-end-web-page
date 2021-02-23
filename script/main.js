var commonService = new CommonService();
var httpService = new HttpService();

function register() {
    var name = $("#registerNameId").val();
    var email = $("#registerEmailId").val();
    var pass = $("#registerPassId").val();

    httpService.register(new User(name, email, pass));
}

function login() {
    var email = $("#loginEmailId").val();
    var pass = $("#loginPassId").val();

    if (email && pass) {
        httpService.login(new User("", email, pass));
    } else {
        commonService.showError("you need to fill in credential");
    }
}

function logOut() {
    commonService.logOut();
}

function getProducts() {
    var products = httpService.getProducts();
    if (products) {
        var html = commonService.getFormmatedProducts(products);
        $("#productList").html(html);
        var totalSum = 0;
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            totalSum += Number(product.price);
        }
        var tva = totalSum * 0.2;
        $('#totalSum').text(totalSum);
        $('#tva').text(tva);
    } else {
        commonService.showError("No products exist");
    }
}

function addProduct() {
    var name = $("#productNameId").val();
    var description = $("#productDescriptionId").val();
    var price = $("#productPriceId").val();
    var productImg = $("#productImgId").val();

    httpService.addProduct(new Product(name, description, price, productImg));
    commonService.redirect("products.html");
}

function removeProduct(id) {
    httpService.removeProduct(id);
    getProducts();
}

function changePassword() {
    var newPass = $("#changePasswordId").val();

    httpService.changePassword(newPass);
}

function changeTheName(newName) {
    var newName = $('#changeNameId').val();
    httpService.changeName(newName);
}

function removeTheAccount() {
    var response = confirm("Are you sure ?");
    if (response) {
        httpService.removeAccount();
    }
}

function showProduct(productId) {
    var product = httpService.getProductById(productId);
    var productDetailHtml = commonService.getFormmatedProduct(product);
    commonService.setToStorage("productId", productDetailHtml);

    commonService.redirect("productDetails.html");
}

function setProductDetails() {
    var productDetailHtml = commonService.getFromStorage("productId");
    $("#productDetailsId").html(productDetailHtml);
}

function addReview(productId) {
    var title = $('#reviewTitleId').val();
    var description = $('#reviewDescriptionId').val();

    var review = new Review(title, description);
    httpService.addReview(productId, review);
}

function AddProductToFavorites(id) {
    var product = httpService.getProductById(id);

    var favoriteProductsJson = commonService.getFromStorage("favorites");
    var favoriteProducts = commonService.Deserialize(favoriteProductsJson);
    if (!favoriteProducts) {
        favoriteProducts = [];
    }
    favoriteProducts.push(product);
    var productListJson = commonService.Serialize(favoriteProducts);
    commonService.setToStorage("favorites", productListJson);
}

function AddProductToCart(id) {
    var product = httpService.getProductById(id);

    var cartProductsJson = commonService.getFromStorage("cart");
    var cartProducts = commonService.Deserialize(cartProductsJson);
    if (!cartProducts) {
        cartProducts = [];
    }
    cartProducts.push(product);
    var productListJson = commonService.Serialize(cartProducts);
    commonService.setToStorage("cart", productListJson);
}

function showCart() {
    var productJson = commonService.getFromStorage("cart");
    var productList = commonService.Deserialize(productJson);
    if (productList) {
        var html = commonService.getFormmatedProductsfromCart(productList);
        $('#cartProductsId').html(html);

        var totalSum = 0;
        for (let index = 0; index < productList.length; index++) {
            const product = productList[index];
            totalSum += Number(product.price);
        }
        var tva = totalSum * 0.2;
        $('#totalSum').text(totalSum);
        $('#tva').text(tva);
    } else {
        commonService.showError('no product exist');
    }
}

function removeProductfromFavorites(id) {
    var productJson = commonService.getFromStorage("favorites");
    var productList = commonService.Deserialize(productJson);
    
    if (productList) {
        var cartProduct = commonService.getFormmatedProductsfromFavorites(productList)
        cartProduct = commonService.removeKey("favorites");
        location.reload();
    } else {
        commonService.showError('no product exist');
    }
}

function removeProductfromCart(id) {
    var productJson = commonService.getFromStorage("cart");
    var productList = commonService.Deserialize(productJson);

    if (productList) {
        var cartProduct = commonService.getFormmatedProductsfromCart(productList)
        cartProduct = commonService.removeKey("cart");
        location.reload();
    } else {
        commonService.showError('no product exist');
    }
}

function buyProducts() {
    commonService.showMessage('thanks for your purchase');
    alert("thanks for your purchase");
    commonService.removeKey('cart');
    commonService.redirect("cart.html");
}

function showFavorites() {
    var productJson = commonService.getFromStorage("favorites");
    var productList = commonService.Deserialize(productJson);
    if (productList) {
        var html = commonService.getFormmatedProductsfromFavorites(productList);
        $("#favoriteProductsId").html(html);
    } else {
        commonService.showError("no product exist");
    }
}

function sendMessage() {
    var name = $("#contactPageNameId").val();
    var message = $("#contactMessageNameId").val();

    var message = new Message(name, message);
    httpService.sendMessage(message);
}

function AddRating(productId, rating) {
    var product = httpService.getProductById(productId);
    httpService.addRating(product, rating);
}

function getBlogPosts() {
    var blogs = httpService.getBlogPosts();
    var blogsHtml = commonService.getFormmatedBlogs(blogs);
    $("#blogPostsId").html(blogsHtml);
}

function isAuthenticated() {
    var token = this.commonService.getFromStorage('token');
    if (token) {
        $('#authenticatedUser').show();
        $('#notAuthenticatedUser').hide();
    } else {
        $('#authenticatedUser').hide();
        $('#notAuthenticatedUser').show();
    }
}

function cookieConsent() {
    let accepted = commonService.getFromStorage('cookieConsent');
    if (accepted) {
        $('#cookieConsent').hide();
    } else {
        $('#cookieConsent').show();
    }
}
function cookieAccepted() {
    $("#cookieConsent").fadeOut(1000);
    commonService.setToStorage('cookieConsent', true)
}

function setCurrentDate() {
    var currentDate = new Date().toLocaleString();
    $('#currentDateId').text(currentDate);
}
function subscribeEmail() {
    var email = $('#subscribeEmailid').val();
    var emailListJson = commonService.getFromStorage('emailSubscribe');
    if (emailListJson) {
        var emailList = commonService.Deserialize(emailListJson);
        emailList.push(email);
        var emailListUpdatedJson = commonService.Serialize(emailList);
        commonService.setToStorage('emailSubscribe', emailListUpdatedJson);
    } else {
        var emptyEmailList = [];
        emptyEmailList.push(email);
        var emailListUpdatedJson = commonService.Serialize(emptyEmailList);
        commonService.setToStorage('emailSubscribe', emailListUpdatedJson);
    }
    location.reload();
}

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}


