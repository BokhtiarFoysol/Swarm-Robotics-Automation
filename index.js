
function removeFromArray(arr, elt){
    for(var  i = arr.length - 1; i >= 0; i--){
        if(arr[i] == elt){
        arr.splice(i, 1);
        }
    }
}
function distance(a, b, c, d){
    return sqrt(pow((a - c), 2) + pow((b - d), 2));
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRndIntegerExcept(min, max, except) {
    var ans = Math.floor(Math.random() * (max - min) ) + min;
    if(ans == except){
        ans = getRndIntegerExcept(min, max, except);
    }
    return ans;
}

function getRndXExcludingArray(min, max, arr) {
    ans = Math.floor(Math.random() * (max - min) ) + min;
    for(var i = 0; i < arr.length; i++){
        if(ans == arr[i].x){
            getRndXExcludingArray(min, max, arr);
        }
    }
    return ans;
}
var agerta = [];
var chowra, lomba;
var currentta ;
var cols = 30;
var rows = 30;
var w,h;
var hehe = 0;
var boundaries = [];
var Q = [];
var mapped = [];
var current;
var start, end;
var starts = [];
var puri = [];
var raasta;
var raastaUltimate = [];
var speed; 
var way = [];
var numbots = 4;
var bots = [];
var currents = [];
var check;
var botreached = 0;
var temporary;
var ulta = new Array(numbots);
var techno = [];

var maxhehe = 0;
var tempBoundaries = [];
var traversed = [];
var index = 0;
var obstacles ;


var stop = setInterval(move, 1000);
 
    function move(){
        for(var i = 0; i < numbots; i++){
            //index = 0;
            if(bots[i].mapping.length > 0){
                temporary = bots[i].mapping.shift();
                //bots[i].trackPath.push(temporary);
                var temp = new Spot();
                temp.x = temporary.x;
                temp.y = temporary.y;
                traversed[index] = temp;
                bots[i].x = temporary.x;
                bots[i].y = temporary.y;
                
                index ++;
                // if(bots[i].x == treasure.x && bots[i].y == treasure.y){
                //     botreached ++;
                //     console.log('done' + i);
                // }
                
                
                if(bots[i].mapping.length == 0){
                    botreached ++;
                    //console.log('done' + i);
                }

                for(var j = 0; j < temporary.wallNeighbor.length; j++){
                    //if(temporary.neighbors[j] != undefined){
                        if(temporary.wallNeighbor[j].wall == true){
                            
                            tempBoundaries.push(temporary.wallNeighbor[j]);
                            //console.log('kire');
                            //temporary.neighbors[j].showWalls3D();
                        }
                        //console.log(temporary.neighbors[j]);
                    //}
                    
                }
            }
            
        }
        if(botreached == numbots){
            clearInterval(stop);
        }
        
        //console.log('deno');
        
    }




var treasure = new treasureComp()

function treasureComp(){
    this.x = getRndInteger(1, cols - 2);
    this.y = getRndInteger(1, rows - 2);
    this.showTreasure = function(){
        stroke(1);
        fill(255,255,0);
        
        
        //rect(this.x * w * 4, this.y * h * 4, w * 4 - 1, h * 4 - 1);
        translate(0, 0, 0.7);
        circle(this.x * w +  w /2, this.y * h + h / 2, w);
        translate(0, 0, - 0.7);
    }
    this.showTreasure3D = function(){
        //specularMaterial(255,255, 0);
        //ambientMaterial(255,255, 0);
        //fill(255, 255, 0);
        // drawingContext.shadowOffsetX = 5;
        // drawingContext.shadowOffsetY = -5;
        // drawingContext.shadowBlur = 10;
        // drawingContext.shadowColor = 'red';
        ambientMaterial(255, 255, 0);
        noStroke();
        translate(this.x * w +  w / 2, this.y * h + h / 2, w * 1.5 );
        sphere(w * 1.1);
        translate(- this.x * w - w / 2, - this.y * h - h / 2, - w * 1.5);
    }
}

function botComp(i){
    this.x = getRndXExcludingArray(1, cols - 2, bots);    
    this.y = getRndInteger(1, rows - 2);
    this.colorR = getRndInteger(1, 255);
    this.colorG = getRndInteger(1, 255);
    this.colorB = getRndInteger(1, 255);
    this.revColor = ((this.colorR + this.colorG + this.colorB) / 3);
    if(this.revColor <= 128){
        this.revColor = 255;
    }
    else if(this.revColor > 128){
        this.revColor = 0;
    }
    this.showBot = function(){
        strokeWeight(1);
            stroke(51);
            
            fill(this.colorR,this.colorG,this.colorB);
            //translate(0, 0, 0);
            //fill(255, 0, 0);
            translate(0, 0, 0.65);
            //rect(this.x * w, this.y * h , w , h);
            circle(this.x * w + w / 2, this.y * h + h / 2, w * 0.75);
            translate(0, 0 , -0.65);
            //rect(0, 0, w * 4 , h * 4  );
            //translate(this.x , this.y, w / 2);
            
            
            //fill(this.revColor);
            
            //text(i, this.x * w * 4 + w * 1.1,  this.y * h * 4 + h * 3.2);
        
    }
    this.showBot3D = function(i){
        strokeWeight(0.5);
        stroke(0);
        translate(this.x * w + w / 2, this.y * h + h / 2, h * 1.5 );
        //fill(this.colorR,this.colorG,this.colorB);
        ambientMaterial(this.colorR,this.colorG,this.colorB);
        //specularMaterial(this.colorR,this.colorG,this.colorB);
        box(w);
        translate(- this.x * w - w / 2, - this.y * h - h / 2, -h * 1.5);
    }
    
    this.stack = new Array();
    this.mapping = new Array();
    this.path = new Array();
    this.raasta = new Array();
    this.reached = new Array();
    this.trackPath = new Array();
}

for(var i = 0; i < numbots; i++){
    bots[i] = new botComp(i);
    
}

function Spot(i,j){
    this.searched = false;
    this.parent = null;
    this.previous = undefined;
    this.x = i;
    this.y = j;
    this.neighbors = [];
    this.wall = false;
    this.wallNeighbor = new Array();
    this.occupied = false;
    this.show = function(){
        noStroke();
        fill(100, 170 , 17);
        ambientMaterial(100, 170 , 17);
        //texture(grass);
        //model(grass3D);
        rect(this.x * w , this.y * h, w , h );
    }
    this.showBoundaries = function(){
        noStroke();
        fill(110);
        translate(0, 0 , 0.75);
        rect(this.x * w, this.y * h, w - 0.3, h - 0.3 );
        translate(0, 0 , -0.75);
    }
    this.showBoundaries3D = function(){
        translate(this.x * w + w / 2, this.y * h + h / 2, w / 2);
        //fill(60);
        ambientMaterial(70, 200);
        noStroke();
        box(w , w , w * 0.9);
        
        translate( - this.x * w - w / 2, - this.y * h - h / 2, - w / 2);
    }
    this.showWalls3D = function(){
        translate(this.x * w + w / 2, this.y * h + h / 2, w / 2 - 3);
        //fill(60);
        ambientMaterial(70);
        noStroke();
        box(w, w, w * 0.3);
        
        translate( - this.x * w - w / 2, - this.y * h - h / 2, - w / 2 + 3);
    }
    this.showStarts = function(){
        noStroke();
        fill(200, 0, 100, 200);
        translate(0, 0, 0.6);
        rect(this.x * w , this.y * h , w  , h  );
        translate(0, 0, -0.6);
    }
    this.showWalls = function(){
        noStroke();
        fill(60, 100);
        rect(this.x * w , this.y * h , w , h );
    }
    this.showTraversed = function(){
        noStroke();
        //fill(135,206,250);
        fill(255,255,255);
        //specularMaterial(135,206,250);
        translate(0, 0, 0.5);
        //texture(road);
        rect(this.x * w, this.y * h, w, h);
        translate(0, 0, -0.5);
    }

    this.addNeighbors = function(i, j){
        if(i > 0){
            grid[i - 1][j].checkBoundaries();
            if(grid[i - 1][j].wall == true){
                grid[i][j].wallNeighbor.push(grid[i - 1][j]);
            }
            if(grid[i - 1][j].wall == false && !grid[i][j].neighbors.includes(grid[i - 1][j])){
                this.neighbors.push(grid[i - 1][j]);
            }
            
            
        }
        if(i < cols - 1){
            grid[i + 1][j].checkBoundaries();
            if(grid[i + 1][j].wall == true){
                grid[i][j].wallNeighbor.push(grid[i + 1][j]);
            }
            if(grid[i + 1][j].wall == false && !grid[i][j].neighbors.includes(grid[i + 1][j])){
                this.neighbors.push(grid[i + 1][j]);
            }
            
        }
        if(j > 0){
            grid[i][j - 1].checkBoundaries();
            if(grid[i][j - 1].wall == true){
                grid[i][j].wallNeighbor.push(grid[i][j - 1]);
            }
            if(grid[i][j - 1].wall == false && !grid[i][j].neighbors.includes(grid[i][j - 1])){
                this.neighbors.push(grid[i][j - 1]);
            }
            
        }
        if(j < rows - 1){
            grid[i][j + 1].checkBoundaries();
            if(grid[i][j + 1].wall == true){
                grid[i][j].wallNeighbor.push(grid[i][j + 1]);
            }
            if(grid[i][j + 1].wall == false && !grid[i][j].neighbors.includes(grid[i][j + 1])){
                this.neighbors.push(grid[i][j + 1]);
            }
            
        }
    }
    this.checkBoundaries = function(){
        if(boundaries.includes(grid[i][j])){
            grid[i][j].wall = true;
        }
    }
}

var grid = new Array(cols);

for( var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
}

for( var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
        grid[i][j] = new Spot(i,j);
    }
}


for(var i = 0; i < numbots; i++){
    ulta[i] = new Array(bots[i].raasta.length);
}





function setup(){
    
    //speed = w / 1000;

    createCanvas(1230, 600, WEBGL);
    chowra = 600; 
    lomba = 600;
    w = chowra / cols ;
    h = lomba / rows;

    
    for(var i = 0; i < numbots; i++){
        bots[i].reached = false;
    }
    
    for(var i = 0; i < cols ; i++){
        for(var j = 0; j < rows ; j++){
            if(i == 0 || i == (cols - 1)){
                if(!boundaries.includes(grid[i][j])){
                    boundaries.push(grid[i][j]);   
                }
            }
            if(j == 0 || j == (rows - 1)){
                if(!boundaries.includes(grid[i][j])){
                    boundaries.push(grid[i][j]);   
                }
            }
        }
            
    }

    for(var i = 0; i < cols ; i++){
        for(var j = 0; j < rows ; j++){
            if (random(1) < 0.1) {
                if(i != treasure.x && j != treasure.y){
                    for(var k = 0; k < numbots; k++){
                        if(i != bots[k].x && j != bots[k].y){
                            //grid[i][j].wall = true;
                            if(!boundaries.includes(grid[i][j])){
                                boundaries.push(grid[i][j]);
                            }
                            
                        }
                    }
                    
                }
                
            }
            
        }
    }
    // for(var i = 0; i < cols; i++){
    //     for(var j = 0; j < rows; j++){
    //         boundaries.push(grid[0][0]); 
    //         boundaries.push(grid[0][1]);
    //         boundaries.push(grid[0][2]); 
    //         boundaries.push(grid[0][3]); 
    //         boundaries.push(grid[0][4]);
    //         boundaries.push(grid[0][5]);
    //         boundaries.push(grid[0][6]);
    //         boundaries.push(grid[0][7]);
    //         boundaries.push(grid[0][8]);
    //         boundaries.push(grid[0][9]);
    //         boundaries.push(grid[0][10]);
    //         boundaries.push(grid[0][11]);
    //         boundaries.push(grid[0][12]); 
    //         boundaries.push(grid[0][13]); 
    //         boundaries.push(grid[0][14]); 
    //         boundaries.push(grid[0][15]);
    //         boundaries.push(grid[0][16]);
    //         boundaries.push(grid[0][17]); 
    //         boundaries.push(grid[0][18]); 
    //         boundaries.push(grid[0][19]); 
    //         boundaries.push(grid[0][20]); 
    //         boundaries.push(grid[0][21]); 
    //         boundaries.push(grid[0][22]); 
    //         boundaries.push(grid[0][23]); 
    //         boundaries.push(grid[0][24]); 
    //         boundaries.push(grid[0][25]); 
    //         boundaries.push(grid[0][26]); 
    //         boundaries.push(grid[0][27]); boundaries.push(grid[0][28]); boundaries.push(grid[0][29]); boundaries.push(grid[1][0]); boundaries.push(grid[1][29]); boundaries.push(grid[2][0]); boundaries.push(grid[2][29]); boundaries.push(grid[3][0]); boundaries.push(grid[3][29]); boundaries.push(grid[4][0]); boundaries.push(grid[4][29]); boundaries.push(grid[5][0]); boundaries.push(grid[5][29]); boundaries.push(grid[6][0]); boundaries.push(grid[6][29]); boundaries.push(grid[7][0]); boundaries.push(grid[7][29]); boundaries.push(grid[8][0]); boundaries.push(grid[8][29]); boundaries.push(grid[9][0]); boundaries.push(grid[9][29]); boundaries.push(grid[10][0]); boundaries.push(grid[10][29]); boundaries.push(grid[11][0]); boundaries.push(grid[11][29]); boundaries.push(grid[12][0]); boundaries.push(grid[12][29]); boundaries.push(grid[13][0]); boundaries.push(grid[13][29]); boundaries.push(grid[14][0]); boundaries.push(grid[14][29]); boundaries.push(grid[15][0]); boundaries.push(grid[15][29]); boundaries.push(grid[16][0]); boundaries.push(grid[16][29]); boundaries.push(grid[17][0]); boundaries.push(grid[17][29]); boundaries.push(grid[18][0]); boundaries.push(grid[18][29]); boundaries.push(grid[19][0]); boundaries.push(grid[19][29]); boundaries.push(grid[20][0]); boundaries.push(grid[20][29]); boundaries.push(grid[21][0]); boundaries.push(grid[21][29]); boundaries.push(grid[22][0]); boundaries.push(grid[22][29]); boundaries.push(grid[23][0]); boundaries.push(grid[23][29]); boundaries.push(grid[24][0]); boundaries.push(grid[24][29]); boundaries.push(grid[25][0]); boundaries.push(grid[25][29]); boundaries.push(grid[26][0]); boundaries.push(grid[26][29]); boundaries.push(grid[27][0]); boundaries.push(grid[27][29]); boundaries.push(grid[28][0]); boundaries.push(grid[28][29]); boundaries.push(grid[29][0]); boundaries.push(grid[29][1]); boundaries.push(grid[29][2]); boundaries.push(grid[29][3]); boundaries.push(grid[29][4]); boundaries.push(grid[29][5]); boundaries.push(grid[29][6]); boundaries.push(grid[29][7]); boundaries.push(grid[29][8]); boundaries.push(grid[29][9]); boundaries.push(grid[29][10]); boundaries.push(grid[29][11]); boundaries.push(grid[29][12]); boundaries.push(grid[29][13]); boundaries.push(grid[29][14]); boundaries.push(grid[29][15]); boundaries.push(grid[29][16]); boundaries.push(grid[29][17]); boundaries.push(grid[29][18]); boundaries.push(grid[29][19]); boundaries.push(grid[29][20]); boundaries.push(grid[29][21]); boundaries.push(grid[29][22]); boundaries.push(grid[29][23]); boundaries.push(grid[29][24]); boundaries.push(grid[29][25]); boundaries.push(grid[29][26]); boundaries.push(grid[29][27]); boundaries.push(grid[29][28]); boundaries.push(grid[29][29]); boundaries.push(grid[1][2]); boundaries.push(grid[1][13]); boundaries.push(grid[1][27]); boundaries.push(grid[2][4]); boundaries.push(grid[2][27]); boundaries.push(grid[3][15]); boundaries.push(grid[3][22]); boundaries.push(grid[3][25]); boundaries.push(grid[3][27]); boundaries.push(grid[4][12]); boundaries.push(grid[5][1]); boundaries.push(grid[5][10]); boundaries.push(grid[5][15]); boundaries.push(grid[6][4]); boundaries.push(grid[6][19]); boundaries.push(grid[6][23]); boundaries.push(grid[7][2]); boundaries.push(grid[8][3]); boundaries.push(grid[8][4]); boundaries.push(grid[8][10]); boundaries.push(grid[8][19]); boundaries.push(grid[8][24]); boundaries.push(grid[9][5]); boundaries.push(grid[9][12]); boundaries.push(grid[9][28]); boundaries.push(grid[10][6]); boundaries.push(grid[10][23]); boundaries.push(grid[11][12]); boundaries.push(grid[11][27]); boundaries.push(grid[12][18]); boundaries.push(grid[12][25]); boundaries.push(grid[13][23]); boundaries.push(grid[13][26]); boundaries.push(grid[14][3]); boundaries.push(grid[14][5]); boundaries.push(grid[14][9]); boundaries.push(grid[14][20]); boundaries.push(grid[15][8]); boundaries.push(grid[16][18]); boundaries.push(grid[16][22]); boundaries.push(grid[16][24]); boundaries.push(grid[17][7]); boundaries.push(grid[17][10]); boundaries.push(grid[17][15]); boundaries.push(grid[17][21]); boundaries.push(grid[18][4]); boundaries.push(grid[18][8]); boundaries.push(grid[18][22]); boundaries.push(grid[18][25]); boundaries.push(grid[20][2]); boundaries.push(grid[20][4]); boundaries.push(grid[21][2]); boundaries.push(grid[21][8]); boundaries.push(grid[21][23]); boundaries.push(grid[21][24]); boundaries.push(grid[21][25]); boundaries.push(grid[22][13]); boundaries.push(grid[23][4]); boundaries.push(grid[23][7]); boundaries.push(grid[23][12]); boundaries.push(grid[23][28]); boundaries.push(grid[24][20]); boundaries.push(grid[25][5]); boundaries.push(grid[25][10]); boundaries.push(grid[25][13]); boundaries.push(grid[25][17]); boundaries.push(grid[25][21]); boundaries.push(grid[25][25]); boundaries.push(grid[26][16]); boundaries.push(grid[26][26]); boundaries.push(grid[27][9]); boundaries.push(grid[27][13]); boundaries.push(grid[27][15]); 
    //         boundaries.push(grid[28][23]);
    //     }
    // }


    for(var i = 0; i < bots.length; i++){
        starts[i] = grid[bots[i].x][bots[i].y];
        bots[i].stack.push(starts[i]);
    }


    for(var i = 0; i < boundaries.length; i++){
        for(var j = 0; j < numbots; j++){
            
            if(boundaries[i].x == starts[j].x && boundaries[i].y == starts[j].y){
                
                removeFromArray(boundaries, boundaries[i]);
            }
            
        }
        
    }



    

    end = grid[treasure.x][treasure.y];
    function dfs(){
        loop1:
        while(1){
            loop2:
            for(var i = 0; i < bots.length; i++){

                if(bots[i].stack.length == 0){
                    //console.log(i +' stack length is zero');
                    break loop2;
                }
                currents[i] = bots[i].stack.pop();
                currentta = currents[i];
                currents[i].addNeighbors(currents[i].x, currents[i].y);
                
                
                
                if(currents[i].searched != true){
                    currents[i].searched = true;


                    if(agerta[i] != undefined){
                    
                        if(distance(agerta[i].x , agerta[i].y, currents[i].x, currents[i].y) > 1){
                            //console.log('haha ' + i + ' ' + agerta[i].x + ' ' + agerta[i].y + ' ' + currents[i].x + ' ' + currents[i].y);
                            //bots[i].trackPath.pop();

                            loop3:
                            while(1){
                                
                                
                                techno[i] = bots[i].trackPath.pop();

                                bots[i].mapping.push(techno[i]);
                                if(techno[i] == undefined){
                                    //console.log(i + ' techno is undefined ');
                                }
                                //console.log('traced back to ' + techno.x + ' ' + techno.y);
                                for(var j = 0; j < techno[i].neighbors.length; j++){
                                    if(techno[i].neighbors[j].x == currents[i].x && techno[i].neighbors[j].y == currents[i].y){
                                        //console.log('me( ' + techno[i].x + ' ' + techno[i].y + ' ) and my neighbor is '+ currents[i].x + ' ' + currents[i].y);
                                        bots[i].trackPath.push(techno[i]);
                                        break loop3;
                                    }
                                }
                                if(techno[i] == starts[i]){
                                    //console.log(i + ' techno is start');
                                    break;
                                }
                            }




                            //bots[i].mapping.push(bfs(agerta[i], currents[i]));
                        }
                                               
                    }
                    
                    bots[i].mapping.push(currents[i]);
                    bots[i].trackPath.push(currents[i]);
                    
                    agerta[i] = bots[i].mapping[bots[i].mapping.length - 1];
                   

                    for(var j = 0; j < currents[i].neighbors.length; j++){
                        if(currents[i].neighbors[j] == end){
                            bots[i].stack.push(currents[i].neighbors[j]);
                            continue loop1;
                        }
                    }

                    if(currents[i] == end){
                        check = i;
                        return 0;
                    }
    
                }
            }
            var neighbors = [];
            for(var i = 0; i < bots.length; i++){
               
                
                neighbors[i] = currents[i].neighbors;
                for(var j = 0; j < neighbors[i].length; j++){
                    if(neighbors[i][j].searched != true){
                        //neighbors[i][j].parent = currents[i];
                        bots[i].stack.push(neighbors[i][j]);
                    }                    
                }
            }
            
        }
    }
    dfs();
    
    for(var i = 0; i < numbots; i++){
        for(var j = 0; j < bots[i].mapping.length; j++){
            if(bots[i].mapping[j - 1] != undefined){
                if(distance(bots[i].mapping[j].x, bots[i].mapping[j].y, bots[i].mapping[j - 1].x, bots[i].mapping[j - 1].y) > 1){
                    //console.log('nooo ' + i + ' ' + bots[i].mapping[j].x +' ' + bots[i].mapping[j].y + ' ' +  bots[i].mapping[j - 1].x + ' ' +  bots[i].mapping[j - 1].y);
                }
            }
        }
    }



    for(var i = 0; i < numbots; i++){
        if(check != i){
            while(1){
                var techno2;
                techno2 = bots[i].trackPath.pop();
               
                if(techno2 == undefined){
                    break;
                }
                bots[i].mapping.push(techno2);
                // if(techno2.x == starts[i].x && techno2.y == starts[i].y){
                //     break;
                // }
            }
        }
        
        
    }

   
    // function haha(){
    //     for(var i = 0; i < numbots; i++){
    //         for(var j = 0; j < numbots; j++){
    //             if(i != j){
    //                 for(var k = 0; k < Math.max(bots[i].raasta.length, bots[j].raasta.length); k++){
    //                     if(bots[i].raasta[k] == bots[j].raasta[k]){
                            
    //                         if(bots[i].raasta.length >= bots[j].raasta.length){
    //                             bots[i].raasta.splice(k - 1, 0, bots[i].raasta[k - 1]);
    //                             console.log('once' + i + j);
    //                         }
    //                         else{
    //                             bots[j].raasta.splice(k - 1, 0, bots[j].raasta[k - 1]);
    //                             console.log('once' + j + i);
    //                         }
    //                         maxhehe ++;
    //                         if(maxhehe >= (rows - 1) * (cols - 1)){
    //                             return 0;
    //                         }
                            
    //                         haha();                           
    //                     }
    //                     else if(bots[i].raasta[k] == bots[j].raasta[k + 1] && bots[i].raasta[k + 1] == bots[j].raasta[k]){
    //                         bots[i].raasta.splice(k, 0, bots[i].raasta[k]);
    //                         bots[i].raasta[k].occupied = true;
    //                         var arr = [];
    //                         arr = bfs(bots[j].raasta[k],bots[j].raasta[k + 2]);
    //                         bots[j].raasta.splice(k + 1, 1);
    //                         for(var m = arr.length - 1; m >= 0; m --){
    //                             bots[j].raasta.splice(k + 1, 0, arr[m]);
    //                         }
    //                         console.log('exchange' + i + j);
    //                         bots[i].raasta[k].occupied = true;
    //                     }
                        
    //                 }
    //             }            
    //         }
    //     }
        
    // }
    // haha();
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            if(grid[i][j].neighbors.length > 4){
                //console.log('amar neighbors 4 er beshi ' + i + ' ' + j);
            }
        }
    }
    // console.log('Number of bots: ' + numbots);
    // console.log()
    // for(var i = 0; i < boundaries.length; i++){
    //     obstacles += 'boundaries.push(grid[' + boundaries[i].x + '][' + boundaries[i].y + ']); ';        
    // }
    // console.log(obstacles);
    // obstacles = 'rir';
    // console.log(obstacles);
    // obstacles += 'gi';
    // console.log(obstacles);
    
}
    

function draw(){
    
    let dl1x =  - width * 2, dl1y =   height / 2, dl1z = -width * 2;
    let dl1 = createVector(dl1x, dl1y, dl1z);
    dl1.normalize();

    let dl2x = width / 2, dl2y =   height / 2, dl2z =  - width * 2 ;
    let dl2 = createVector(dl2x, dl2y, dl2z);
    dl2.normalize();
    
    directionalLight(255, 255, 255,  dl1 );
    directionalLight(200, 200, 200,  dl2);      
    
    background(255);
    
    //camera(camX, 0, 0, -width / 2, - height / 2, (height / 2) / (tan(PI) / 6), 0 , 1, 0);
    //camera(bots[0].x,  0, 0, treasure.x * w, treasure.y * w, 0, 1 , 0, 0);
    
    translate(-width / 2 + width / 4 , - height / 2 - height / 10, -width / 5 );
    
    //camera(  mouseX - width / 2 + width / 4 ,   mouseY  - height / 2 - height / 10, (height/2) / tan(PI/6), width / 2, height / 2, 0, -1, 0, );
    //box(40);

    //translate(width / 2  , height / 2, width * 3 );
    
    //translate(mouseX - width , mouseY - height ,0 );  
    rotateX(radians( 30));
    //rotateY(radians(-30));
    //rotateZ(radians(40));
    //rotateX(radians(angleX));
    // rotateZ(0);
    
    
    for(var i = 0; i < boundaries.length; i++){
        boundaries[i].showBoundaries();
    }
    // for(var i = 0; i < boundaries.length; i++){
    //     boundaries[i].showBoundaries3D();
    // }
    
    // for(var i = 0; i < cols ; i++){
    //     for(var j = 0; j < rows; j++){
    //         if(grid[i][j].wall == true){
    //             //grid[i][j].showWalls();
    //         }
    //     }
    // }

    for(var i = 0; i < tempBoundaries.length; i++){
        tempBoundaries[i].showWalls3D();
    }
    





    for(var i = 0; i < traversed.length; i++){
        traversed[i].showTraversed();
    }   


    for(var i = 0; i < numbots; i++){
        starts[i].showStarts();
    }

    for(var i = 0; i < bots.length; i++){
        bots[i].showBot(i);
        bots[i].showBot3D(i);
    }
    treasure.showTreasure3D();
    treasure.showTreasure();

    push();
    translate(width / 4 - w * 0.35, height / 2 , 0);
    noStroke();
    fill(100, 170, 17);
    plane(600, 600);
    pop();

}