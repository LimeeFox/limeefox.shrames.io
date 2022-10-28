"use strict"
            
    var KissPercent = 0;
    var isKissing = false;
    
    var reactionTime = 3000;
    var turnAround;
    
    var ctx,canvas;
    var width,height;
    
    
    function $(id) {
        return document.getElementById(id);
    }
    
    function initialiser_canvas() {
        
        canvas= document.getElementById('canvasID');
        ctx = canvas.getContext('2d');
        width = parseInt(canvas.width);
        height = parseInt(canvas.height);
        
    }
    
    function effacer(){
        
        ctx.clearRect(0,0,width,height);
        
    }

    function startGame() {

        $('button').innerHTML = '<h2>Shrek x James Charles</h2> <p>Press the button below to start kissing. Donkey must not see you!</p> <p>As the kiss goes on, a circle will be drawing itself below the button to show progress.</p> <button onmousedown="kissTrigger()" onmouseup="unkiss()">';

        randomizer();

    }
    
    //=================================
    //=============Canvas==============
    //=================================
    
    function dessinerCercle(r) {
        
        ctx.beginPath();
        ctx.arc(0,0,50,0,r*2*Math.PI/100,false)
        ctx.arc
        ctx.closePath();
        ctx.fillStyle="red";
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.stroke();
        
        
    }
    
    function dessin(r) {
        
        effacer();
        
        ctx.save();
        ctx.translate(400,250);
        dessinerCercle(r);
        ctx.restore();
    }
    
    function dessinerPartCercle(){
        ctx.beginPath();
        ctx.arc(100,100,40,0,Math.PI*(3/2),false);
        ctx.lineTo(340,220);
        ctx.closePath();
        ctx.fillStyle='blue';
        ctx.fill();
    }
    
    
    //=================================
    //============The Kiss=============
    //=================================
    
    
    function changeShrek() {
        
        if (isKissing) {
            
            $('shrek').innerHTML = "";
            
        } else {
            
            $('shrek').innerHTML = "<img src='images/shrek.png'>";
        }
        
    }
    
    function changeJames() {
        
        if (isKissing) {
            
            $('james').innerHTML = "";
            
        } else {
            
            $('james').innerHTML = "<img src='images/james charles.jpg'>";
            
        }
        
    }
    
    function kissTrigger() {
        
        KissInterval = setInterval(kiss,100);
        
    }
    
    function kiss() {
        
        isKissing=true;
        
        changeShrek();
        changeJames();
        
        $('KissingScene').innerHTML = "<img src='images/the_kiss.jpg'>";
        
        KissPercent+=0.1;
        dessin(KissPercent);
        
        console.log(KissPercent);
        
        status();
    }
    
    function unkiss() {
        
        isKissing = false;
        
        clearInterval(KissInterval);
        
        $('KissingScene').innerHTML = "";
        
        changeShrek();
        changeJames();
        
    }
    
    //=================================
    //=======Exposing the kissers======
    //=================================
    
    function warning() {
        
        $("donkey").innerHTML = "<img src='images/donkey_back.jpg' >";
        $("warningSign").innerHTML = "<img src='images/warning.png' id='warningSign'>";
    }
    
    function unobserve() {
        
        observed = false;
        
        $("donkey").innerHTML = "<img src='images/donkey_back.jpg'>"
        
        
    }
    
    function observation() {
        
        var time_1 = Math.floor(Math.random()*2000)+1001;
        
        observed = true;
        
        $("donkey").innerHTML = "<img src='images/donkey_front.jpg'>";
        $("warningSign").innerHTML = "";
        
        setTimeout(unobserve,time_1);
        
    }
    
    function turnAround() {
        
        warning();
        setTimeout(observation,reactionTime);
        reactionTime = Math.floor(Math.random()*7000)+3001;
        
        
    }
    
    function randomizer() {
        
        var x = Math.floor(Math.random()*5000)+5001;
        turnAround = setInterval(turnAround,x);
        
    }
    
    //=================================
    //=========BUSTED OMG NO===========
    //=================================
    
    
    function status() {
        
        if (isKissing && observed) {
            
            alert("YOU LOSE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            $("button").innerHTML = '<p>Reload the page to play again<p>';
            
            clearInterval(KissInterval);
            clearInterval(turnAround);
            
            var yeet = Math.floor(Math.random()*4)+1;
            
            switch (yeet) {
                
                case 1:
                    $("Tyler1").play();
                    break;
                    case 2:
                        $("Tyler2").play();
                        break;
                        case 3:
                            $("Tyler3").play();
                            break;
                            case 4:
                                $("Tyler4").play();
                                break;
                            }
                            
                        }
                        
                        if (KissPercent >= 100) {
                            
                            alert("You Win!");
                            $("america").play();
                            $("button").innerHTML = "<p>YOU WON WOO HOOO. Reload the page to play again<p>"
                            
                            clearInterval(KissInterval);
                            clearInterval(turnAround);
                        }
                    }
                    var observed = false;
                    var KissInterval;