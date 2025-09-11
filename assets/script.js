const sidenav = document.querySelector(".sidenav-js")
const openBtn = document.getElementById("openBtn")
const closeBtn = document.getElementById("closeBtn")
const closeLinks = document.querySelectorAll(".closeLink")

openBtn.addEventListener('click', () => {
        openNav()
    })

closeBtn.addEventListener('click', () => {
        closeNav()
    })

closeLinks.forEach((closeLink) => {
    closeLink.addEventListener('click', () => {
        closeNav()
    })
})

function openNav (){
    sidenav.classList.add("active")
}

function closeNav (){
    sidenav.classList.remove("active")
}