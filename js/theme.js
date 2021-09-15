const link = document.querySelector('head link')
const darkMode = document.querySelector('.dark')
const lightMode = document.querySelector('.light')
const checkedTheme = document.querySelector('.checked-theme')

if (localStorage.getItem('mode') == 'true') {
    link.setAttribute('href', 'css/style.css')
    lightMode.innerHTML = '<p>Light</p>' + '<i class="fas fa-check"></i>'
    checkedTheme.innerText = 'Light'
    
} else {
    link.setAttribute('href', 'css/dark.css')
    darkMode.innerHTML = '<p>Dark</p>' + '<i class="fas fa-check"></i>'
    checkedTheme.innerText = 'Dark'
}

darkMode.addEventListener('click', () => {
    link.setAttribute('href', 'css/dark.css')
    localStorage.setItem('mode', 'false')
    lightMode.innerHTML = '<p>Light</p>'
    darkMode.innerHTML = '<p>Dark</p>' + '<i class="fas fa-check"></i>'
    checkedTheme.innerText = 'Dark'
})

lightMode.addEventListener('click', () => {
    link.setAttribute('href', 'css/style.css')
    localStorage.setItem('mode', 'true')
    darkMode.innerHTML = '<p>Dark</p>'
    lightMode.innerHTML = '<p>Light</p>' + '<i class="fas fa-check"></i>'
    checkedTheme.innerText = 'Light'
})