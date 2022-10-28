
var test_x = false;
var test_y = "potato y";

var coor_x1 = 0;
var coor_y1 = 0;

var coor_x2 = 0;
var coor_y2 = 0;

function testing() {
    announce();
    setTimeout(machin,2000);
    setTimeout(announce,7000);
}


function collision(x1,x2,bool1) {

    if ((x1-x2)<=50 && (x1-x2)>=-50) {
        return true;
    } else {
        return false;
    }

    console.log(bool1);

}

function machin() {
    test_x = collision(coor_x1,coor_x2,test_x);
    console.log(test_x);
}

function announce() {
    console.log("test_x: "+test_x);
    console.log("test_y: "+test_y);
}

testing();