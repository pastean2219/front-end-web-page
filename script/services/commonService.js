class CommonService {
    getFormmatedProducts(products){
        var concatenatedProducts ='';
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            concatenatedProducts += 
            `<div class="responsive col-4">
                <div class="gallery">
                    <img src="${this.getRandomUrl(product.name)}" alt=".." onclick="showProduct(${product.id})" width="300" height="300">
                    <div class="desc">
                        <h2 onclick="showProduct(${product.id})">${product.name}</h2>
                        <p>${product.description}</p>
                        <p><span>Price : <span>${product.price}<span> $ <span></p>
                        <input class="button" type="button" onclick="removeProduct(${product.id})" value="Remove product"/>
                        <input class="button" type="button" onclick="AddProductToFavorites(${product.id})" value="Add to favorites"/>
                        <input class="button" type="button" onclick="AddProductToCart(${product.id})" value="Add to cart"/>                
                    </div>
                </div>
            </div>
            `
        }
        return concatenatedProducts;
    }

    getFormmatedProductsfromFavorites(products){
        var concatenatedProducts ='';
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            concatenatedProducts += 
            `<div class="responsive col-4">
                <div class="gallery">
                    <img src="${this.getRandomUrl(product.name)}" alt=".." onclick="showProduct(${product.id})" width="300" height="300">
                    <div class="desc">
                        <h2 onclick="showProduct(${product.id})">${product.name}</h2>
                        <p>${product.description}</p>
                        <p><span>Price : <span>${product.price}<span> $ <span></p>
                        <input class="button" type="button" onclick="removeProductfromFavorites(${product.id})" value="Remove product"/>
                        <input class="button" type="button" onclick="AddProductToCart(${product.id})" value="Add to cart"/>                
                    </div>
                </div>
            </div>
            `
        }
        return concatenatedProducts;
    }

    getFormmatedProductsfromCart(products){
        var concatenatedProducts ='';
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            concatenatedProducts += 
            `<div class="responsive col-4">
                <div class="gallery">
                    <img src="${this.getRandomUrl(product.name)}" alt=".." onclick="showProduct(${product.id})" width="300" height="300">
                    <div class="desc">
                        <h2 onclick="showProduct(${product.id})">${product.name}</h2>
                        <p>${product.description}</p>
                        <p><span>Price : <span>${product.price}<span> $ <span></p>
                        <input class="button" type="button" onclick="removeProductfromCart(${product.id})" value="Remove product"/>
                        <input class="button" type="button" onclick="AddProductToFavorites(${product.id})" value="Add to favorites"/>   
                        <p>${this.getProductRating(product)}</p>                      
                    </div>
                </div>
            </div>
            `
        }
        return concatenatedProducts;
    }
    getProductRating(product){
        var rating = Math.floor(product.avgRating);
        var concatenatedRating='';
        for (let index = 0; index < rating; index++) {
            concatenatedRating+= "x";

        }
        return concatenatedRating;
    }

    getFormmatedProduct(product){
        return `<div class="responsive col-4">
                    <div class="gallery">
                        <a target="_blank" href="${this.getRandomUrl(product.name)}">
                            <img src="${this.getRandomUrl(product.name)}" alt=".." width="400" height="300">
                        </a>                         
                        <div class="desc">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            </p>
                            <p><span>Price : <span>${product.price}<span> $ <span></p>
                            <p>Rating is ${product.rating.avgRating.toFixed(2)} out of 5</p>
                            <div class="rating">
                            <input type="radio" name="star" id="star5" onclick="AddRating(${product.id}, 5)" value="Rating 5"><label for="star5">   
                            </label>
                            <input type="radio" name="star" id="star4" onclick="AddRating(${product.id}, 4)" value="Rating 4"><label for="star4">   
                            </label>
                            <input type="radio" name="star" id="star3" onclick="AddRating(${product.id}, 3)" value="Rating 3"><label for="star3">   
                            </label>
                            <input type="radio" name="star" id="star2" onclick="AddRating(${product.id}, 2)" value="Rating 2"><label for="star2">   
                            </label>
                            <input type="radio" name="star" id="star1" onclick="AddRating(${product.id}, 1)" value="Rating 1"><label for="star1">   
                            </label>
                        </div>
                            ${this.getReviewHtml(product.id)}
                            ${this.getReviewsHtml(product)}
                        </div>
                    </div>
                </div>`;
    }

    getReviewsHtml(product){
        var reviews = product.reviews;
        var concatenatedReviews = '';
        for (let index = 0; index < reviews.length; index++) {
            concatenatedReviews+= 
            `
            <h4>${reviews[index].title}</h4>
            <p>${reviews[index].description}</p>
            `
        }
        return concatenatedReviews;
    }

    getReviewHtml(productId){
        return `
            <form>
                <div class="form">
                    <div class="name-form">
                        <input type="text" id="reviewTitleId"  />
                        <label for="reviewTitleId" class="label-name">
                            <span class="content-name">Title</span>
                        </label>
                    </div>
                </div>
                <div class="form">
                    <div class="name-form">
                        <input type="text" id="reviewDescriptionId"/>
                        <label for="reviewDescriptionId" class="label-name">
                            <span class="content-name">Description</span>
                        </label>
                    </div>
                </div>
                <input type="button" onclick="addReview(${productId})" id="ReviewButton" value="Add Review">  
            </form>
        ` 
    }

    getFormmatedBlogs(blogs){
        var concatenatedBlogs ='';
        for (let index = 0; index < 10; index++) {
            const blog = blogs[index];
            concatenatedBlogs+= 
            `
            <div class="clearfix">
                <img src="${this.randomImage()}" alt=".." width="500" height="300">
                <h1><a href="blogpost.html" class="blogh1">${blog.title}<a/></h1>
                <p>${blog.body}</p>
            </div>
            `
        } 
        return concatenatedBlogs; 
    }

    showMessage(message){
        $("#messagePanel").addClass("successMessage");
        $("#messagePanel").removeClass("errorMessage");
        $("#messagePanel").html(message);
    }
    showError(error){
        $("#messagePanel").addClass("errorMessage");
        $("#messagePanel").removeClass("successMessage");
        $("#messagePanel").html(error);
    }
    setToStorage(key, value){
        window.localStorage.setItem(key, value);
    }
    getFromStorage(key){
        return window.localStorage.getItem(key);
    }


    removeKey(key,value) {
        window.localStorage.removeItem(key,value);
    }


    redirect(path){
        window.location.href = path;
    }
    logOut(){
        window.localStorage.removeItem("token");
        this.redirect("login.html");
    }
    Serialize(object) {
        return JSON.stringify(object);
    }
    Deserialize(json) {
        return JSON.parse(json);
    }


    getRandomUrl(name) {
        var urlList = [];
        if (name.includes ("Lanseta")) {
            urlList = [
                "../img/lanseta 1.jpg",
                "../img/lanseta 2.jpg",
                "../img/lanseta 3.jpg",
                "../img/lanseta 4.jpg",
                "../img/lanseta 5.jpg", 
            ];
        } else if (name.includes ("Mulineta")) {
            urlList = [
                "../img/mulineta 1.jpg",
                "../img/mulineta 2.jpg",
                "../img/mulineta 3.jpg",
                "../img/mulineta 4.jpg",
                "../img/mulineta 5.jpg",
                "../img/mulineta 6.jpg",
            ];
        } else if (name.includes ("Senzori")) {
            urlList = [
                "../img/senzori 1.jpg",
                "../img/senzori 2.jpg",
                "../img/senzori 3.jpg",
                "../img/senzori 4.jpg",
            ];    
        } else if (name.includes ("Carlige")) {
            urlList = [
                "../img/carlige 1.jpg",
                "../img/carlige 2.jpg",
                "../img/carlige 3.jpg",
                "../img/carlige 4.jpg",
            ];    
        } else {
            urlList = [
                "../img/cutie accesorii 1.jpg",
                "../img/cutie accesorii 2.jpg",
                "../img/cutie accesorii 3.jpg",
                "../img/cutie accesorii 4.jpg",
                "../img/cutie accesorii 5.jpg", 
            ]
        }
        var random = Math.floor(Math.random() * urlList.length);
        return urlList[random];
    }
    randomImage() {
        var imageList = [
           "../img/mulineta 1.jpg",
           "../img/mulineta 2.jpg",
           "../img/mulineta 3.jpg",
           "../img/mulineta 4.jpg",
           "../img/lanseta 1.jpg",
           "../img/lanseta 2.jpg",
           "../img/lanseta 3.jpg",
           "../img/lanseta 4.jpg",
           "../img/carlige 1.jpg",
           "../img/carlige 2.jpg",
           "../img/carlige 3.jpg",
           "../img/carlige 4.jpg",
           "../img/cutie accesorii 1.jpg"
        ]
   
        var randomimg = Math.floor(Math.random() * 13);
         return imageList[randomimg];
       }
}