if(!sessionStorage.getItem(`admin`)) location.href = `login.html`

let tBodyCategory = document.querySelector(`.tBodyCategory`)
let tBodyProduct = document.querySelector(`.tBodyProduct`)

function updateCategoriesList() {
    tBodyCategory.innerHTML = ``
    let categoryList = JSON.parse(localStorage.getItem(`categoryList`))

    if (categoryList) {
        categoryList.forEach(category => {
            tBodyCategory.innerHTML += `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.title}</td>
                    <td style="display: flex; align-items:center; justify-content: center;">
                    <a id="editAction" style=" margin: 0px 7px; color:blue; text-decoration: none" href="editCategory.html#${category.id}"> <i style="font-size: 25px;" class="fa-sharp fa-solid fa-pen-to-square"></i></a>
                    <div style="width: 3px; height: 25px; background-color: rgb(255, 255, 255);"></div>
                    <a onclick ="removeCategory(${category.id})" id="deleteAction" style=" margin: 0px 7px; color:red; text-decoration: none" href="##"><i style="font-size: 25px;" class="fa-solid fa-trash-can"></i></a>
                    </td>
                </tr>
            `
        })
    }
}

function updateProductsList() {

    tBodyProduct.innerHTML = ``
    let productList = JSON.parse(localStorage.getItem(`productList`))

    if (productList) {
        productList.forEach(product => {
            tBodyProduct.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.category}</td>
                    <td>${product.title}</td>
                    <td>${product.price} $</td>
                    <td>${product.description}</td>
                    <td><img style="width:175px;" src="./images/${product.image}"></td>
                    <td>
                    <a id="editAction" style=" margin: 0px 7px; color:blue; text-decoration: none" href="editProduct.html#${product.id}"> <i style="font-size: 25px;" class="fa-sharp fa-solid fa-pen-to-square"></i></a>
                    <div style="width:100px; height: 5px; background-color: rgb(255, 255, 255); margin:10px 0 ;"></div>
                    <a onclick ="removeProduct(${product.id})" id="deleteAction" style=" margin: 0px 7px; color:red; text-decoration: none" href="##"><i style="font-size: 25px;" class="fa-solid fa-trash-can"></i></a>
                    </td>
                </tr>
            `
        })
    }
}

function removeCategory(id) {
    let categoryList = JSON.parse(localStorage.getItem(`categoryList`))
    let i = categoryList.findIndex(e => e.id == id)
    categoryList.splice(i, 1)
    if(categoryList.length == 0) localStorage.removeItem(`categoryID`)
    localStorage.setItem(`categoryList`, JSON.stringify(categoryList))
    updateCategoriesList()
}

function removeProduct(id) {
    let productList = JSON.parse(localStorage.getItem(`productList`))
    let i = productList.findIndex(e => e.id == id)
    productList.splice(i, 1)
    if(productList.length == 0) localStorage.removeItem(`productID`)
    localStorage.setItem(`productList`, JSON.stringify(productList))
    updateProductsList()
}

updateCategoriesList()
updateProductsList()