if(!sessionStorage.getItem(`admin`)) location.href = `login.html`

let productList = JSON.parse(localStorage.getItem(`productList`))
let id = (location.href.split(`#`))[1]
let select = document.querySelector(`select`)
product = productList.find(e => e.id == id)

productTitleInput.value = product.title
productPriceInput.value = product.price
productDescriptionInput.value = product.description
img.src = `./images/${product.image}`


window.addEventListener(`keydown` , function(e) {
    if(e.key == `Enter`) {
        e.preventDefault()
        editProduct()
    }
})

function setCategories() {
    select.innerHTML = ``
    myCategoryList = JSON.parse(localStorage.getItem(`categoryList`))
    myCategoryList.forEach(category => {
        select.innerHTML +=`
        <option>${category.title}</option>`
    })
    select.value = product.category
    
}

function editProduct() {

    if(!Number(id)) {
        alert(`Invalid product to change. Directing you to main page`)
        location.href = `admin.html`
        return
    }

    product.title = productTitleInput.value 
    product.price = productPriceInput.value
    product.description = productDescriptionInput.value 
    product.category = select.value 
   
    if(productImageInput.files.length > 0){
        product.image = productImageInput.files[0]['name']
    }

    if(Object.entries(product).some( e => e[1] == false)) {
        alert(`Fill all the areas to add your product!`)
        return
    }

    localStorage.setItem(`productList` , JSON.stringify(productList))
    location.href = `admin.html`
}

setCategories()