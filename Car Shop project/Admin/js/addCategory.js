if (!sessionStorage.getItem(`admin`)) 
    location.href = `login.html`

let category = document.querySelector(`#categoryInput`)

window.addEventListener(`keydown`, function (e) {
    if (e.key == `Enter`) {
        e.preventDefault()
        addCategory()
    }
})

function addCategory() {
    let id
    let categoryList
    const regex = /^[A-Z]+(\s+[A-Z]+)*$/;

    if (!category.value || regex.test(category.value) != true) {
        alert(
            `Invalid category name. Your category must contain only letters with UPPERCASE and SPACE!!`
        )
        return
    }

    if (localStorage.getItem(`categoryID`)) {
        id = localStorage.getItem(`categoryID`)
        id++
    } else {
        id = 1
    }

    localStorage.setItem(`categoryID`, id)

    if (localStorage.getItem(`categoryList`)) {

        categoryList = JSON.parse(localStorage.getItem(`categoryList`))

        if (categoryList.some(e => e.title === category.value)) {
            alert(`This category is already created. Add another category!!`)
            id--
            localStorage.setItem(`categoryID`, id)
            return
        }
    } else {
        categoryList = []
    }

    let myCategory = {
        id: id,
        title: category.value
    }
    categoryList.push(myCategory)
    localStorage.setItem(`categoryList`, JSON.stringify(categoryList))

    location.href = `admin.html`
}
