function showCart() {
    shopCart.classList.toggle(`showCart`)
}

function addStorage(id) {
    let productItems = JSON.parse(localStorage.getItem(`productList`))
    let cartProducts

    if(localStorage.getItem(`cartProducts`)) {
        cartProducts = JSON.parse(localStorage.getItem(`cartProducts`))
    }
    else {
        cartProducts = []
    }
    
    let product
    
    if(cartProducts.find(cartProduct => cartProduct.id == id)) {
        product = cartProducts.find(cartProduct => cartProduct.id == id)
    }
    else {
        product = productItems.find(cartProduct => cartProduct.id == id)
    }
    
    product.productCount = product.productCount ? ++product.productCount : 1 
    product.cartPrice = product.productCount * product.price

    cartProducts.some(cartItem => cartItem.id == product.id) || cartProducts.push(product)
    removeModal()
    
    localStorage.setItem(`cartProducts` , JSON.stringify(cartProducts))
    cartRefresh()
    shopCart.classList.add(`showCart`)
}

function cartRefresh() {

    let total = 0
    cartItems.innerHTML = ``
    totalBox.innerText = `Cart is empty :(`

    let cartProducts = JSON.parse(localStorage.getItem(`cartProducts`))
    productCountList.innerHTML = cartProducts.length 

    if(cartProducts) {
        cartProducts.forEach(cartProduct => {
            total += cartProduct.cartPrice
            totalBox.innerHTML = `Total : <span class="totalPrice">${total} $</span>`

                cartItems.innerHTML += `
            <div id="cartItem">
                    <i class="fa fa-times" onclick="removeProduct(${cartProduct.id})"></i>
                        <div class="imgInfo">
                            <img src="./Admin/images/${cartProduct.image}">
                        </div>
                        <div class="textInfo">
                            <h3>${cartProduct.category} ${cartProduct.title.slice(0,7)}</h3>
                            <p>${cartProduct.cartPrice} $</p>
                                <div id="countBox">
                                    <span onclick ="changeProductCount(${cartProduct.id})">-</span>
                                    <span>${cartProduct.productCount}</span>
                                    <span onclick ="changeProductCount(${cartProduct.id},true)">+</span>
                                </div>
                        </div>
            </div>  
                `
            })
}
}

function changeProductCount(id , value) {
    let cartProducts = JSON.parse(localStorage.getItem(`cartProducts`))
    let product = cartProducts.find(cartProduct => cartProduct.id == id)

    value ? ++product.productCount : --product.productCount
    product.cartPrice = product.price * product.productCount

   localStorage.setItem(`cartProducts` , JSON.stringify(cartProducts))
   cartRefresh()
   if(!product.productCount) removeProduct(id)
}


function removeProduct(id) {
    let cartProducts = JSON.parse(localStorage.getItem(`cartProducts`))
    let i = cartProducts.findIndex(product => product.id == id)
    cartProducts.splice(i,1)
    localStorage.setItem(`cartProducts`,JSON.stringify(cartProducts))

    if(!cartProducts.length)  shopCart.classList.remove(`showCart`) 

    cartRefresh()
}
cartRefresh()