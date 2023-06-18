let select = document.querySelector(`select`)

if(!sessionStorage.getItem(`admin`)) location.href = `login.html`


window.addEventListener(`keydown` , function(e) {
    if(e.key == `Enter`) {
        e.preventDefault()
        addProduct()
    }
})

function setCategories() {
    select.innerHTML = ``
    myCategoryList = JSON.parse(localStorage.getItem(`categoryList`))
    myCategoryList.forEach(category => {
        select.innerHTML +=`
        <option>${category.title}</option>`
    })

}

function addProduct() {

    let productList
   
    if(localStorage.getItem(`productID`)) {
        id = localStorage.getItem(`productID`)
        id++
    }
    else {
        id = 1
    }
   
    localStorage.setItem(`productID` , id)
     
    localStorage.getItem(`productList`) ? productList = JSON.parse(localStorage.getItem(`productList`)) : productList = []

    let myProduct = {
        id:id,
        category:select.value,
        title:productTitleInput.value,
        price:productPriceInput.value,
        description:productDescriptionInput.value,
        image:productImageInput.files[0]['name']
    }
    if(Object.entries(myProduct).some( e => e[1] == false)) {
        id--
        localStorage.setItem(`productID` , id)
        alert(`Fill all the areas to add your product!`)
        return
    }

    productList.push(myProduct)
    localStorage.setItem(`productList`, JSON.stringify(productList))

    location.href = `admin.html`
}

setCategories()