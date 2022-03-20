let navLeftBtn = document.getElementById("nav-left")
let navRightBtn = document.getElementById("nav-right")
let slideShow  = document.getElementById("slideshow")
let mobile_menu = document.getElementById('mobile-menu')
let mobile_menu_options = document.getElementById('menu-options')
let closeMenuBtn = document.getElementById('close-menu')
let vel = 0

function moveMenuOnscreen() {
	mobile_menu_options.style.left = '0';
}

function returnMenuOffScreen() {
	mobile_menu_options.style.left = '-100%';
}

window.addEventListener('resize', returnMenuOffScreen)
closeMenuBtn.addEventListener('click', returnMenuOffScreen)

function moveLeft() { //moves the slideshow left
	if (vel != -900) { //keeps the slideshow pictures within the right edge of the container
		if (navRightBtn.style.display == 'none') {
			navRightBtn.style.display = 'inline'
		}
		increase_right()
		vel -= 100
		images = slideShow.querySelectorAll("img")
		for (let i=0; i<images.length; i++) {
			images[i].style.transform = `translateX(${vel}%)`
		}
	}
	if (vel == -900) {navLeftBtn.style.display = 'none'}  
}

function moveRight() { //moves the slideshow right
	if (vel != 0) { //keeps the slideshow pictures within the left edge of the container
		if (navLeftBtn.style.display == 'none') {
			navLeftBtn.style.display = 'inline'
		}
		increase_left()
		vel += 100
		images = slideShow.querySelectorAll("img")
		for (let i=0; i<images.length; i++) {
			images[i].style.transform = `translateX(${vel}%)`
		}
	}if (vel == 0) {navRightBtn.style.display = 'none'}
}

mobile_menu.addEventListener('click', moveMenuOnscreen)
navLeftBtn.addEventListener("click", moveLeft)
navRightBtn.addEventListener("click", moveRight)

let lines = document.querySelectorAll(".underline")
lines = Array.from(lines)
let index = 0
let width_l = 99.99 //the width of the element that will be decreased if left btn is clicked
let width_r = 0 //the width of the element that will be decreased if right btn is clicked
let currentlyVisibleLines = [lines[0]]
let active_left = true
let active_right = false

function increase_right() {
	if (width_l > 0) {
		width_l -= 33.33 
		width_r = 99.99-width_l
	}
	if (currentlyVisibleLines.length == 1) {
		currentlyVisibleLines[0].style.width = `${width_l}%`
		currentlyVisibleLines.push(lines[index + 1])
		currentlyVisibleLines[1].style.width = `${width_r}%`
	}else if (currentlyVisibleLines.length > 1) {
		currentlyVisibleLines[0].style.width = `${width_l}%`
		currentlyVisibleLines[1].style.width = `${width_r}%`
	}
	if (width_l == 0) {
		if (lines.indexOf(currentlyVisibleLines[0]) == index) {
			index += 1
		}
		currentlyVisibleLines.shift()
		width_l = 99.99
		width_r = 99.99
	}
}

function increase_left() {
	if (width_r > 0) {
		width_r -= 33.33 
		width_l = 99.99-width_r
	}
	if (currentlyVisibleLines.length == 1) {
		currentlyVisibleLines[0].style.width = `${width_r}%`
		currentlyVisibleLines.unshift(lines[index - 1])
		currentlyVisibleLines[0].style.width = `${width_l}%`
	}else if (currentlyVisibleLines.length > 1) {
		currentlyVisibleLines[1].style.width = `${width_r}%`
		currentlyVisibleLines[0].style.width = `${width_l}%`
	}
	if (width_r == 0) {
		if (lines.indexOf(currentlyVisibleLines[1]) == index) {
			index -= 1
		}
		currentlyVisibleLines.splice(1, 1)
		width_r = 99.99
		width_l = 99.99
	}
}
