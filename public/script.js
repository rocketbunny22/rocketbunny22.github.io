const navToggle = document.querySelector(".site-nav__toggle")
const navList = document.querySelector(".site-nav__list")
const navLinks = document.querySelectorAll(".site-nav__link")

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true"

    navToggle.setAttribute("aria-expanded", String(!isOpen))
    navList.classList.toggle("site-nav__list--open")
  })
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false")
    navList?.classList.remove("site-nav__list--open")
  })
})
