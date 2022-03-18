






let leftButton = document.getElementById("nav-left")
let rightButton = document.getElementById("nav-right")
let slideShow  = document.getElementById("slideshow")

let vel = 0

function moveLeft() { //moves the slideshow left
	if (vel != -900) { //keeps the slideshow pictures within the right edge of the container
		increase_right()
		vel -= 100
		images = slideShow.querySelectorAll("img")
		for (let i=0; i<images.length; i++) {
			images[i].style.transform = `translateX(${vel}%)`
		}
	}   
}

function moveRight() { //moves the slideshow right
	if (vel != 0) { //keeps the slideshow pictures within the left edge of the container
		increase_left()
		vel += 100
		images = slideShow.querySelectorAll("img")
		for (let i=0; i<images.length; i++) {
			images[i].style.transform = `translateX(${vel}%)`
		}
	}
}

leftButton.addEventListener("click", moveLeft)
rightButton.addEventListener("click", moveRight)

let lines = document.querySelectorAll(".underline")
lines = Array.from(lines)
let index = 0
let width_l = 99.99 //the width of the element that will be decreased if left btn is clicked
let width_r = 0 //the width of the element that will be decreased if right btn is clicked
let cvl = [lines[0]]
let active_left = true
let active_right = false

function increase_right() {
	if (width_l > 0) {
		width_l -= 33.33 
		width_r = 99.99-width_l
	}
	if (cvl.length == 1) {
		cvl[0].style.width = `${width_l}%`
		cvl.push(lines[index + 1])
		cvl[1].style.width = `${width_r}%`
	}else if (cvl.length > 1) {
		cvl[0].style.width = `${width_l}%`
		cvl[1].style.width = `${width_r}%`
	}
	if (width_l == 0) {
		if (lines.indexOf(cvl[0]) == index) {
			index += 1
		}
		cvl.shift()
		width_l = 99.99
		width_r = 99.99
	}
	console.log(cvl, index)
}

function increase_left() {
	if (width_r > 0) {
		width_r -= 33.33 
		width_l = 99.99-width_r
	}
	if (cvl.length == 1) {
		cvl[0].style.width = `${width_r}%`
		cvl.unshift(lines[index - 1])
		cvl[0].style.width = `${width_l}%`
	}else if (cvl.length > 1) {
		cvl[1].style.width = `${width_r}%`
		cvl[0].style.width = `${width_l}%`
	}
	if (width_r == 0) {
		if (lines.indexOf(cvl[1]) == index) {
			index -= 1
		}
		cvl.splice(1, 1)
		width_r = 99.99
		width_l = 99.99
	}console.log(cvl, index)
}
