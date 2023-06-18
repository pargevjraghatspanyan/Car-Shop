let username = document.querySelector(`#usernameInput`)
let password = document.querySelector(`#passwordInput`)
let p = document.querySelector(`.wrongLogin`)

window.addEventListener(`keydown` , function(e) {
  if(e.key == `Enter`) checkLogin()
})

function checkLogin() {
usernameValue = username.value
passwordValue = password.value

if(usernameValue == `admin` && passwordValue == `4642`) {
  sessionStorage.setItem(`admin` , `logined`)
  password.classList.remove(`redBorder`)
  username.classList.remove(`redBorder`)
  p.classList.remove(`active`)
  location.href = `admin.html`
}
else {
  password.classList.add(`redBorder`)
  password.classList.add(`shakeBorderAnimation`)
  username.classList.add(`shakeBorderAnimation`)
  username.classList.add(`redBorder`)
  p.classList.add(`active`)
    setTimeout(() => {
      password.classList.remove(`shakeBorderAnimation`)
      username.classList.remove(`shakeBorderAnimation`)
    }, 1200);
}
}