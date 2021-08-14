const grid = document.getElementById('grid')
const dispalyScore = document.getElementById('score')
let score = 0
const width = 8
const squares = []
const colors = [
  'red', 'green', 'blue', 'pink', 'orange'
]

const reset = document.getElementById('reset')
const pause = document.getElementById('pause')
const start = document.getElementById('start')
// craete the grid
function createGrid () {
  for (let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    square.setAttribute('draggable', true)
    square.setAttribute('id', i)
    const random = Math.floor(Math.random() * colors.length)
    square.style.backgroundColor = colors[random]
    grid.appendChild(square)
    squares.push(square)
  }
}
createGrid()
/* setInterval(function () {

}, 100) */

let colorBeingDragged
let idBeingDragged
let colorBeingReplaced
let idBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart () {
  colorBeingDragged = this.style.backgroundColor
  idBeingDragged = parseInt(this.id)
  console.log('dragstart' + colorBeingDragged)
}

function dragOver (e) {
  e.preventDefault()
}

function dragEnter (e) {
  e.preventDefault()
}

function dragLeave (e) {
  e.preventDefault()
  // can remove this
  // this.style.backgroundColor = ''
}

/* function dragDrop () {
  colorBeingReplaced = this.style.backgroundColor
  idBeingReplaced = parseInt(this.id)
  this.style.backgroundColor = colorBeingDragged
  squares[idBeingDragged].style.backgroundColor = colorBeingReplaced
}

function dragEnd () {
  let validMoves = [idBeingDragged - 1, idBeingDragged + 1, idBeingDragged + width, idBeingDragged - width]
  let validMove = validMoves.includes(idBeingReplaced)

  if (idBeingReplaced && validMove) {
    idBeingReplaced = null
  } else if (idBeingReplaced && !validMove) {
    squares[idBeingDragged].style.backgroundColor = colorBeingDragged
    squares[idBeingReplaced].style.backgroundColor = colorBeingReplaced
  } else {
    squares[idBeingDragged].style.backgroundColor = colorBeingDragged
  }
}
*/
function dragDrop () {
  colorBeingReplaced = this.style.backgroundColor
  idBeingReplaced = parseInt(this.id)
}

function dragEnd () {
  const validMoves = [idBeingDragged - 1, idBeingDragged + 1, idBeingDragged + width, idBeingDragged - width]
  const validMove = validMoves.includes(idBeingReplaced)

  if (idBeingReplaced && validMove) {
    squares[idBeingDragged].style.backgroundColor = colorBeingReplaced
    squares[idBeingReplaced].style.backgroundColor = colorBeingDragged
  } else if (idBeingReplaced && !validMove) {
    squares[idBeingDragged].style.backgroundColor = colorBeingDragged
    squares[idBeingReplaced].style.backgroundColor = colorBeingReplaced
  } else {
    squares[idBeingDragged].style.backgroundColor = colorBeingDragged
  }
}

function checkRowForThree () {
  for (let i = 0; i <= 61; i++) {
    const win = [i, i + 1, i + 2]
    const decidedColor = squares[i].style.backgroundColor
    const isBlank = squares[i].style.backgroundColor === ''
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
    if (notValid.includes(i)) continue

    if (win.every(value => squares[value].style.backgroundColor === decidedColor && !isBlank)) {
      score += 3
      dispalyScore.innerHTML = score
      win.forEach(value => {
        squares[value].style.backgroundColor = ''
      })
    }
  }
}
checkRowForThree()

function checkColumnForThree () {
  for (let i = 0; i <= 47; i++) {
    const win = [i, i + width, i + width * 2]
    const decidedColor = squares[i].style.backgroundColor
    const isBlank = squares[i].style.backgroundColor === ''

    if (win.every(value => squares[value].style.backgroundColor === decidedColor && !isBlank)) {
      score += 3
      dispalyScore.innerHTML = score
      win.forEach(value => {
        squares[value].style.backgroundColor = ''
      })
    }
  }
}checkColumnForThree()

function moveBelow () {
  for (let i = 0; i < 56; i++) {
    if (squares[i + width].style.backgroundColor === '') {
      squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
      squares[i].style.backgroundColor = ''
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && squares[i].style.backgroundColor === '') {
        const random = Math.floor(Math.random() * colors.length)
        squares[i].style.backgroundColor = colors[random]
      }
    }
  }
}
moveBelow()
/* let timer

timer = setInterval(function () {
  checkColumnForThree()
  checkRowForThree()
  moveBelow()
}, 100)
*/

let timer
start.addEventListener('click', () => {
  timer = setInterval(function () {
    checkColumnForThree()
    checkRowForThree()
    moveBelow()
  }, 100)
})

pause.addEventListener('click', () => clearInterval(timer))

reset.addEventListener('click', () => location.reload())
