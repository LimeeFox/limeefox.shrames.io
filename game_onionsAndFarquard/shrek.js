"use strict"

    var shrek_pos_x = 50;
    var shrek_pos_y = 50;

    var onion_pos_x = 100;
    var onion_pos_y = 100;

    var armour_pos_x;
    var armour_pos_y;

    var fq_pos_x = 900;
    var fq_pos_y = 380;
    var fq_temp_x = 0;
    var fq_temp_y = 0;

    var collide_x = false;
    var collide_y = false;
    var fq_collide_x = false;
    var fq_collide_y = false;
    var ar_collide_x = false;
    var ar_collide_y = false;
    
    var keyPressed = {};
    var onions = [];
    var upCounter = 0;
    var speedCounter = 0;
    var s_speed = 4;
    var f_speed = 3;
    var touching = false;

    var small = true;
    var hasArmour = false;

    var persuit;
    var randomArmour;

    var armourisPlaced = false;

    //=================================
    //============Utility==============
    //=================================

    function $(id) {
        return document.getElementById(id);
    }

    window.addEventListener('keydown', (event) => { 
        keyPressed[event.key] = true;
        posShrek(); 
    });

    document.addEventListener('keyup', (event) => {
        delete this.keyPressed[event.key];
     });

    function startSong() {
        var song = $('allstar');
        song.volume = 0.1;
        song.play();
    }

    function startGame() {
        var song = $('allstar');
        startSong();
        placeOnion();
        persuit = setInterval("moveFarquard()",100);
        randomArmour = setInterval(armourPlacement,15000);

        song.ontimeupdate = function() {timeRemaining(song)};

        setTimeout(endGame,202570);

    }



    function timeRemaining(song) {

        var rn = ((song.currentTime*100)/song.duration).toPrecision(2);

        document.getElementById("button").innerHTML = "<p>You currently posess "+onions.length+" onions. Time elapsed: "+rn+"%</p>";
    }

    function endGame() {
        clearInterval(persuit);
        clearInterval(randomArmour);
        document.removeEventListener('keydown', (event) => { 
            keyPressed[event.key] = true;
            posShrek(); 
        });
        document.removeEventListener('keyup', (event) => {
            delete this.keyPressed[event.key];
         });

        alert("You have won the game! Onions collected: "+onions.length);
    }

    //=================================
    //============Movement=============
    //=================================



    function movement(x,y) {

        if (keyPressed["ArrowLeft"]) {
            if (x > 20) {
                shrek_pos_x -= s_speed;
            }
        }
        if (keyPressed["ArrowUp"]) {
            if (y >20) {
                shrek_pos_y -=s_speed;
            }
        }
        if (keyPressed["ArrowRight"]) {
            if (x < 1000) {
                shrek_pos_x += s_speed;
            }
        }
        if (keyPressed["ArrowDown"]) {
            if (y < 540) {
                shrek_pos_y +=s_speed;
            }
        }
        
    }

    function posShrek() {

        movement(shrek_pos_x,shrek_pos_y);

        $('shrek_onion').style.left=shrek_pos_x +'px';
        $('shrek_onion').style.top=shrek_pos_y +'px';

        //collecting onions

        var onion_temp_pos_y = onion_pos_y+50;
        collide_x = collision(shrek_pos_x,onion_pos_x);
        collide_y = collision(shrek_pos_y,onion_temp_pos_y);

        if (verifyCollision(collide_x,collide_y)) {
            collect()
        }
        
        if (touching) {
            console.log("HELP");
        }

        //collecting armour

        var ar_temp_pos_x = armour_pos_x;
        var ar_temp_pos_y = armour_pos_y+100;
        ar_collide_x = collision(shrek_pos_x,ar_temp_pos_x);
        ar_collide_y = collision(shrek_pos_y,ar_temp_pos_y);

        if (verifyCollision(ar_collide_x,ar_collide_y)) {
            equip();
        }
    }

    function posFarquard() {

        fq_temp_x = fq_pos_x;
        fq_temp_y = fq_pos_y;

        if (fq_pos_x < shrek_pos_x) {
            fq_pos_x+=f_speed;
        }

        if (fq_pos_x > shrek_pos_x) {
            fq_pos_x-=f_speed;
        }

        if (fq_pos_y+100 < shrek_pos_y) {
            fq_pos_y+=f_speed;
        }

        if (fq_pos_y+100 > shrek_pos_y) {
            fq_pos_y-=f_speed;
        }
    
    }

    function moveFarquard() {
        posFarquard();
        console.log("X axis: "+armour_pos_x+" and the Y axis: "+armour_pos_y);
        console.log('SHREEEEK the X is: '+shrek_pos_x+' and the Y is '+shrek_pos_y);
        console.log("x: "+ar_collide_x+" y: "+ar_collide_y);
        $('farquard').style.left = fq_pos_x+"px";
        $('farquard').style.top = fq_pos_y+"px";

        if (verifyCollision(fq_collide_x,fq_collide_y)) {
            hit();
        }

        var fq_temp_pos_y = fq_pos_y+150;
        fq_collide_x = collision(shrek_pos_x,fq_pos_x);
        fq_collide_y = collision(shrek_pos_y,fq_temp_pos_y);
    }

    //=================================
    //============Collision============
    //=================================

    function collision(x1,x2) {

        if ((x1-x2)<=50 && (x1-x2)>=-50) {
            return true;
        } else {
            return false;
        }

    }

    function verifyCollision(c1,c2) {
        if (c1 && c2) {
            return true;
        }
    }



    //=================================
    //============Onions===============
    //=================================
    
    function placeOnion() {

        onion_pos_x = Math.floor(Math.random()*1000)+20;
        onion_pos_y = Math.floor(Math.random()*500)+20;

        $('onion').style.left=onion_pos_x+'px';
        $('onion').style.top=onion_pos_y+'px';
        $('onion').style.visibility='visible';

        console.log("This is the onion "+ onion_pos_x+ " ; " +onion_pos_y);

    }

    //=================================
    //============PowerUp==============
    //=================================

    function collect() {

        //collect AND grow

        $('pop').play();
        onions.push(1);
        upCounter++;
        
        switch (Math.floor(Math.random()*5)+1) {
            case 1:
                $('s_onion_pickup').play();
                break;
            case 2:
                $('s_celebration').play();
                break;
        }

        if (small && upCounter == 3) {
            small = false;
            upCounter = 0;
            if (hasArmour) {
                $('shrek_onion').src = 'media/shrek_armoured.png';
            } else if (!hasArmour) {
                $('shrek_onion').src = 'media/shrek laughs.gif';
            }
            
            $('1up').play();
        }

        //f (speedCounter%3==0) {
        //    s_speed++;
        //}

        placeOnion();

    }

    function hit() {
        fq_pos_x = 900;
        fq_pos_y = 380;

        if (small) {
            if (hasArmour) {
                hasArmour = false;
                armourisPlaced = false;
                $('shrek_onion').src = "media/shrek_outrage.gif";
                $('1down').play();
                setTimeout(shrek_smallify,1500);
            } else {
                clearInterval(persuit);
                alert("Game over. You lost. Reload the page to try again.");
            }
        } else {
            if (hasArmour) {
                hasArmour = false;
                armourisPlaced = false;
                $('1down').play();
                $('shrek_onion').src= "media/shrek laughs.gif";
            } else {
                small = true;
                $('shrek_onion').src = 'media/shrek_outrage.gif';
                $('1down').play();
                setTimeout(shrek_smallify,1500);
                onions.pop();
                onions.pop();
            }
        }

        $('what').play();

    }

    function shrek_smallify() {
        $("shrek_onion").src = "media/shrek_baby_idle2.gif";

    }

    function armourPlacement() {

        if (!hasArmour && !armourisPlaced) {

            armour_pos_x = Math.floor(Math.random()*1000)+20;
            armour_pos_y = Math.floor(Math.random()*480)+20;

            armourisPlaced = true;

            $('armour').style.left=armour_pos_x+'px';
            $('armour').style.top=armour_pos_y+'px';
            $('armour').style.visibility='visible';

        }

    }

    function equip() {

        if (small) {
            $('shrek_onion').src = "media/shrek_baby_armoured.jpeg";
            hasArmour = true;
            $('armour').style.visibility = 'hidden';
        } else {
            $('shrek_onion').src = "media/shrek_armoured.png";
            hasArmour = true;
            $('armour').style.visibility = 'hidden';
        }

        $('armour_equip').play();
        
    }

