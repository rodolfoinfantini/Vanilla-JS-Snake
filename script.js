const board = document.querySelector("div.container .board")
var boardSize = 30
var head = {x: 12, y: 12}
var fruit
var direction = "stop"
var isMovingTo = "stop"
var tail = []
var wait = false
var tailStartLenght = 1
var counter = 0
var gameOver = false
var score = 0

generateFruit()

renderBoard()

function renderBoard(){
    var html = "<table>"
    for(let i = 0; i < boardSize; i++){
        html += "<tr>"
        for(let j = 0; j < boardSize; j++){
            if(i == head.y && j == head.x){
                html += `<td class="head"></td>`
            }else if(i == fruit.y && j == fruit.x){
                html += `<td class="fruit"></td>`
            }else{
                var canContinue = true
                for(let k = 0; k < tail.length; k++){
                    if(tail[k].x == j && tail[k].y == i){
                        html += `<td class="tail"></td>`
                        canContinue = false
                        break
                    }
                }
                if(canContinue){
                    html += `<td></td>`
                }
            }
        }
        html += "</tr>"
    }
    html += "</table>"
    board.innerHTML = html
}

function generateFruit(){
    var x
    var y
    do{
        var loop = false
        x = Math.floor(Math.random() * boardSize)
        y = Math.floor(Math.random() * boardSize)
        if(head.x == x && head.y == y){
            loop = true
        }else{
            for(let i = 0; i < tail.length; i++){
                if(tail[i].x == x && tail[i].y == y){
                    loop = true
                    break
                }
            }
        }
    }while(loop)
    
    fruit = {x: x, y: y}
}

setInterval(function(){
    if(direction == "stop") return
    var x = head.x
    var y = head.y
    if(isMovingTo == "up" && direction == "down" || isMovingTo == "down" && direction == "up" || isMovingTo == "left" && direction == "right" || isMovingTo == "right" && direction == "left"){
        direction = isMovingTo
    }else{
        isMovingTo = direction
    }
    switch(direction){
        case 'up':
            y--
            break
        case 'down':
            y++
            break
        case 'left':
            x--
            break
        case 'right':
            x++
            break
        case 'stop':
            break
    }
    if(head.x < 0){
        x = boardSize - 1
    }else if(head.x >= boardSize){
        x = 0
    }else if(head.y < 0){
        y = boardSize - 1
    }else if(head.y >= boardSize){
        y = 0
    }
    if(counter < tailStartLenght){
        wait = true
        counter++
    }
    if(wait){
        wait = false
    }else{
        tail.shift()
    }
    if(tailStartLenght == 0){
        if(score != 0){
            tail.push(head)
        }
    }else{
        tail.push(head)
    }
    head = {x: x, y: y}
    for(let i = 0; i < tail.length; i++){
        if(tail[i].x == head.x && tail[i].y == head.y){
            direction = "stop"
            gameOver = true
        }
    }
    if(fruit.x == head.x && fruit.y == head.y){
        wait = true
        score++
        document.querySelector(".score").innerText = score
        generateFruit()
    }
    renderBoard()
}, 100)

document.addEventListener('keydown', e => {
    if(gameOver) return
    var oldDirection = direction
    switch(e.keyCode){
        case 39:
            direction = "right"
            break
        case 40:
            direction = "down"
            break
        case 38:
            direction = "up"
            break
        case 37:
            direction = "left"
            break
        case 87:
            direction = "up"
            break
        case 83:
            direction = "down"
            break
        case 65:
            direction = "left"
            break
        case 68:
            direction = "right"
            break
    }
    /* if(oldDirection == "up" && direction == "down" || oldDirection == "down" && direction == "up" || oldDirection == "left" && direction == "right" || oldDirection == "right" && direction == "left"){
        direction = oldDirection
    } */
})