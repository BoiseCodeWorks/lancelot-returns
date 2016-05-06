angular.module('lancelot', [])
    .controller('GameController', function($timeout){
        var gc = this;
        
        gc.lancelot = {
            image: 'knight.png',
            walkSequnce: {
                1: '-2px -47px',
                2: '-39px -47px',
                3: '-77px -47px',
                4: '-114px -47px'                  
            },
            modifiers:{
              moveSpeed: 3
            }, 
            position: {
                top: 50,
                left: 20
            }
        }
        
        gc.powerUps = [
            {
                position: {
                    top: 80,
                    left: 80
                },
                type: 'speed'
            }
        ]
        
        gc.enemies = [
            {
                position: {
                    top: 400,
                    left: 80
                },
                type: 'speed'
            }
        ]
        
        
        gc.movePlayer = function(e){
         if(!gc.lancelot){
            return 
         }
         console.log(e.code,":", e.keyCode)
            var directions = {
                40: 'down',
                38: 'up',
                37: 'left',
                39: 'right'
            }
            var direction = directions[e.keyCode]
            
            var moveSpeed = gc.lancelot.modifiers.moveSpeed;
            if(direction == 'up'){
                gc.lancelot.position.top -= moveSpeed;                
            }
            if(direction == 'down'){
                gc.lancelot.position.top += moveSpeed;
            }
            if(direction == 'left'){
                runWalk()
                gc.lancelot.position.left -= moveSpeed;
            }
            if(direction == 'right'){
                runWalk()
                gc.lancelot.position.left += moveSpeed;
            }
            checkPosition()
        }
        
        gc.p = gc.lancelot.walkSequnce[1];
        
        var currentPosition = 1;
        function runWalk(){
            $timeout(function(){
                gc.p = gc.lancelot.walkSequnce[currentPosition]
                currentPosition++;
                if(currentPosition > 4){
                    currentPosition = 1;
                }
            }, 300)
        }
        
        function collectPowerUp(powerUp){
            if(powerUp.type == 'speed'){
                gc.lancelot.modifiers.moveSpeed += 15;
            }
            gc.powerUps.splice(gc.powerUps.indexOf(powerUp), 1)
        }
        
        function checkPosition(){
            gc.powerUps.forEach(function(p){
                if(p.position.top >= gc.lancelot.position.top && p.position.top <= gc.lancelot.position.top +10 && p.position.left >= gc.lancelot.position.left && p.position.left <= gc.lancelot.position.left +10){
                    collectPowerUp(p);
                }
            })
            
            gc.enemies.forEach(function(e){
                if(e.position.top >= gc.lancelot.position.top && e.position.top <= gc.lancelot.position.top +20 && e.position.left >= gc.lancelot.position.left && e.position.left <= gc.lancelot.position.left +20){
                    killLancelot()
                }
            })
            
        }
        
        function killLancelot(){
            gc.lancelot = null
        }
        
        document.getElementById('gameboard').focus()
        
        function update(){
            
        }
        
    })