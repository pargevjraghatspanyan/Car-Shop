if(!sessionStorage.getItem(`admin`)) location.href = `login.html`

let id = (location.href.split(`#`))[1]
let categoryList = JSON.parse(localStorage.getItem(`categoryList`))
let category = categoryList.find(e => e.id == id)
let oldCategory = category.title
categoryInput.value = category.title



window.addEventListener(`keydown`, function(e) {
    if(e.key == `Enter`) {
        e.preventDefault()
        editCategory()
    }
})

function editCategory() {

    const regex = /^[A-Z]+(\s+[A-Z]+)*$/;
    
    if(!categoryInput.value || regex.test(categoryInput.value) != true){
        alert(`Invalid category name. Your category must contain only letters with UPPERCASE and SPACE!!`)
        return
    }
    
    if(!Number(id)) {
        alert(`Invalid category to change. Directing you to main page`)
        location.href = `admin.html`
        return
    }
    
    if(categoryList.some(e => e.title == categoryInput.value)){
        alert(`This category is already created. Add another category!!`)
        return
    }

    category.title = categoryInput.value
    
    let productList = JSON.parse(localStorage.getItem(`productList`))
    
    if(!productList.length) {
        productList.forEach(e => {
            if(e.category == oldCategory){
                e.category = category.title
            }
        })
    }
    
    localStorage.setItem(`categoryList` , JSON.stringify(categoryList))
    localStorage.setItem(`productList` , JSON.stringify(productList))
    location.href = `admin.html`
}