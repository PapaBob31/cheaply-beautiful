let navLeftBtn = document.getElementById("nav-left")
let navRightBtn = document.getElementById("nav-right")
let slideShow  = document.getElementById("slideshow")
let mobile_menu = document.getElementById('mobile-menu')
let menu_options = document.getElementById('menu-options')
let menu_container = document.getElementById('content-cover')
let closeMenuBtn = document.getElementById('close-menu')
let vel = 0

function moveMenuOnscreen() {
	menu_container.style.left = '0';
}

function returnMenuOffScreen() {
	menu_container.style.left = '-100%';
}

closeMenuBtn.addEventListener('click', returnMenuOffScreen)
mobile_menu.addEventListener('click', moveMenuOnscreen)
menu_container.addEventListener('click', returnMenuOffScreen)
menu_options.addEventListener('click', function (e) {e.stopPropagation()})

let lines = document.querySelectorAll(".underline") //lines under the links
lines = Array.from(lines)
let index = 0 //keeps track of the element currently underlined
let width_l = 99.99 //the width of the element that will be decreased if left btn is clicked
let width_r = 0 //the width of the element that will be decreased if right btn is clicked
let currentlyVisibleLines = [lines[0]]//the first line is visible by default
let mobile_index = 0

function increase_right() { //function for moving the line under a link to the link to it's right
	if (window.innerWidth > 450) {//for larger screens
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

	}else { //for smaller screens like phones
		mobile_index += 1
		if ((mobile_index % 3) == 0){ //if 3 images has left the screen to the left direction
			pos = mobile_index / 3
			lines[pos].style.width = '99.99%' //increase the next line to the right
			lines[pos-1].style.width = '0' //decrease the current line
		}
	}
}

function increase_left() {//function for moving the line under a link to the link to it's left
	if (window.innerWidth > 450) {
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
	}else {
		if ((mobile_index % 3) == 0){//if 3 images has left the screen to the right position
			pos = mobile_index / 3
			lines[pos-1].style.width = '99.99%'//increase the next line to the left
			lines[pos].style.width = '0' //decrease the current line
		}
		mobile_index -= 1
	}	
}

function moveLeft() { //moves the slideshow left
	let limit = undefined
	if (window.innerWidth > 450) {//keeps the slideshow pictures within the left edge of the container
		limit = -900
	}else {
		limit = -1100
	}
	if (vel != limit) { //keeps the slideshow pictures within the right edge of the container
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
	if (vel == limit) {navLeftBtn.style.display = 'none'}  
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

navLeftBtn.addEventListener("click", moveLeft)
navRightBtn.addEventListener("click", moveRight)

function resetSlideshow() {
	vel = 0
	mobile_index = 0
	index = 0
	lines[0].style.width = '99.99%'
	currentlyVisibleLines = [lines[0]]
	images = slideShow.querySelectorAll("img")
	for (let i=0; i<images.length; i++) {
		images[i].style.transform = `translateX(${vel}%)`
	}
	for (let i=0; i<lines.length; i++) {
		if (i != 0) {
			lines[i].style.width = '0'
		}
	}
}

window.addEventListener('resize', ()=> {returnMenuOffScreen(); resetSlideshow()})
