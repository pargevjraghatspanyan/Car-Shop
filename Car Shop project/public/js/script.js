let categoryDiv = document.querySelector(`.categoryDiv`)
let productDiv = document.querySelector(`.cardList`)

let productList = JSON.parse(localStorage.getItem(`productList`))
let categoryList = JSON.parse(localStorage.getItem(`categoryList`))

let section = document.querySelector(`.sectionProducts`)

function setCategories() {
    categoryList.forEach(category => {
        categoryDiv.innerHTML += `
            <li onclick ="filterCategories('${category.title}')"><a href="#">${category.title}</a></li>
        `
    })
}

function filterCategories(title) {

    myModal.style.top = `0px`

    productDiv.innerHTML = ``

    let newProductList = title ? productList.filter(product => product.category == title) : productList

    newProductList.forEach(product => {
        productDiv.innerHTML += `
            <div data-aos="zoom-in" data-aos-duration="1200" class="card" onclick="modal(${product.id})">
                <h2>${product.category}</h2>
                <img src="./Admin/images/${product.image}">
                <p>${product.price} $</p>
                <div class="information">
                    <a href="##" class="add" onclick ="addStorage(${product.id})">Add to Cart</a>
                    <a href="##" class="viewMore">View more</a>
                </div>
            </div>
        `
    })

    let addBtns = document.querySelectorAll('.add')

    addBtns.forEach(item => {
        item.addEventListener(`click`, function (e) {
            e.stopPropagation()
        })
    })

    
}

function modal(id) {

    let product = productList.find(e => e.id == id)

    bg.setAttribute(`style` , `
        backdrop-filter: blur(3px);
        opacity: 1;
        visibility: visible;
        z-index: 19;
    `)

    myModal.setAttribute(`style` , `
    opacity:1;
    visibility:visible ;
    animation-name: blowUpModal;
    animation-duration: 1s; 
    top:${Math.round(scrollY) + 45}px;
    `)
    
    myModal.innerHTML = `
            <a href="##" class="xmark" onclick="removeModal()"><i class="fa-solid fa-xmark"></i></a>
            <h2>${product.category} ${product.title}</h2>
            <img  src="./Admin/images/${product.image}">
            <p>${product.description}</p>
            <p class="price">${product.price} $</p>
            <div class="button">
                <a href="##" class="addToCart" onclick="addStorage(${product.id})">Add to Cart</a>
            </div>
  `

}

function removeModal() {

    bg.removeAttribute(`style`)
    myModal.setAttribute(`style` , `
        animation-name: backModal !important;
        animation-duration: 1s !important;
        transition: 1s;
        top:${Math.round(scrollY) + 45}px;
    `)
}

setCategories()
filterCategories()