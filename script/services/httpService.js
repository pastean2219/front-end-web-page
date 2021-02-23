class HttpService{
    apiUrl = "https://ilbahtraining.azurewebsites.net/api/";
    authUrl = "https://ilbahtraining.azurewebsites.net/";
    commonService = new CommonService();

    register(user){
        $.ajax({
            url: this.authUrl + "register", //https://backendapiilbah.azurewebsites.net/api/register
            type:'POST',
            data: JSON.stringify(user),
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            success:function(response){
                commonService.showMessage("Registered");
                commonService.setToStorage("token", response);
                commonService.redirect("login.html");
            },
            error:function(response){
               commonService.showError(response.statusText);
            }
        });
    }

    login(user){
        $.ajax({
            url: this.authUrl + "login", //https://backendapiilbah.azurewebsites.net/api/login
            type:'POST',
            data: JSON.stringify(user),
            dataType: 'text',
            async: false,
            contentType: "application/json; charset=utf-8",
            success:function(response){
                commonService.showMessage("Logged in");
                commonService.setToStorage("token", response);
                commonService.redirect("home.html");
            },
            error:function(response){
               commonService.showError(response.statusText);
            }
        });
    }
    getProducts(){
        var token = this.tryGetToken();
        if(token){
            var res;
            $.ajax({
                url: this.apiUrl + "/Product",
                type:'GET',
                dataType: 'json',
                async: false,  
                headers: {
                    'token':token,
                },
                contentType: "application/json; charset=utf-8",
                success:function(response){
                    if(response){
                        res = response;
                    }else{
                       commonService.showError("no product exists");
                    }
                },
                error:function(res){
                   commonService.showError(res.statusText);
                }
            });
            return res;
        }
    }

    addProduct(product){
        var token = this.tryGetToken();
            if(token){
                $.ajax({
                    url: this.apiUrl + "/Product",
                    type:'POST',
                    data: JSON.stringify(product),
                    dataType: 'text',
                    async: false,
                    headers: {
                        'token':token,
                    },
                    contentType: "application/json; charset=utf-8",
                    success:function(response){
                       commonService.showMessage(response);
                    },
                    error:function(response){
                       commonService.showError(response.statusText);
                    }
                });
            }
    }

    removeProduct(id){
        var token = this.tryGetToken();
            if(token){
                $.ajax({
                    url: this.apiUrl + "/Product/"+ id,
                    type:'POST',
                    dataType: 'text',
                    contentType: "application/json; charset=utf-8",
                    success:function(res){
                       commonService.showMessage(res);
                    },
                    error:function(res){
                       commonService.showError(res.statusText);
                    }
                });
            }
    }

    tryGetToken(){
        var token = this.commonService.getFromStorage('token');
        if(token){
            return token;
        } else{
            commonService.redirect("login.html")
        }
    }

    changePassword(){
        //when I wrote this only me and god knew, now only god knows
        var token = this.tryGetToken();
        if(token){
            $.ajax({
                url: this.apiUrl + "changepassword",
                type:'POST',
                data: JSON.stringify(newPass),
                dataType: 'text',
                headers: {
                    'token':token,
                },
                contentType: "application/json; charset=utf-8",
                success:function(response){
                    commonService.showMessage(response);
                },
                error:function(response){
                    commonService.showError(response.statusText);
                }
            });
        }
        // console.log("password changed");
        // commonService.redirect("login.html");
    }
    changeName(){
        console.log("name changed");
        commonService.redirect("home.html");
    }
    removeAccount(){
        console.log("account removed");
        setTimeout(function(){
            commonService.redirect("register.html");
        }, 2000);//3sec
    }
    getProductById(id){
        var product ;
        var token = this.tryGetToken();
            if(token){
                $.ajax({
                    url: this.apiUrl + "Product/"+ id,
                    type:'GET',
                    dataType: 'text',
                    async: false,
                    headers: {
                        'token':token,
                    },
                    contentType: "application/json; charset=utf-8",
                    success:function(res){
                        if(res){
                            product = commonService.Deserialize(res);
                        }
                    },
                    error:function(res){
                       commonService.showError(res.statusText);
                    }
                });
            return product;
            }
    }
    addReview(productId, review){
        var token = this.tryGetToken();
        if(token){
            $.ajax({
                url: this.apiUrl + "Review?id=" + productId,//https://backendapiilbah.azurewebsites.net/api/Review?id=3
                type:'POST',
                data: JSON.stringify(review),
                dataType: 'text',
                async: false,
                headers: {
                    'token':token,
                },
                contentType: "application/json; charset=utf-8",
                success:function(response){
                   commonService.showMessage('Review was added');
                },
                error:function(response){
                   commonService.showError(response.statusText);
                }
            });
        }
    }
    sendMessage(message) {
        console.log(message);
    }
    addRating(product, rating){
        var token = this.tryGetToken();
        if(token){
            $.ajax({
                url: this.apiUrl + "Rating?productId=" + product.id+"&rating="+rating,//https://backendapiilbah.azurewebsites.net/api/Review?id=3
                type:'POST',
                dataType: 'text',
                async: false,
                headers: {
                    'token':token,
                },
                contentType: "application/json; charset=utf-8",
                success:function(response){
                   commonService.showMessage('Rating was added');
                },
                error:function(response){
                   commonService.showError(response.statusText);
                }
            });
        }
    }
    getBlogPosts(){
        var blogs;
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type:'GET',
            dataType: 'json',
            async: false,
            contentType: "application/json; charset=utf-8",
            success:function(response){
                blogs = response;
            },
            error:function(response){
                commonService.showError(response.statusText);
            }
        });
        return blogs;
    }
}

