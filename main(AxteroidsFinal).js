var game = new Phaser.Game(800,600,Phaser.CANVAS,'gameDiv');

var spacefield;

var player;

var cursors;

var restartkey;

var bullets;
var bulletTime = 0;
var fireButton;

var asteroids1;
var asteroids2;
var asteroids3;
var asteroids4;
var asteroids5;
var asteroids6;
var asteroids7;

var score = 0;
var scoreText;
var winText;
var restartText;

var mainState = {

// load things before game runs
	preload:function(){
	
	game.load.image('background' , "images/stars.png");
    game.load.image('player', "images/spaceship1.png");
    game.load.image('bullet', "images/bullet2.png");
    game.load.image('asteroidBig', "images/asteroid-big.png");
    game.load.image('asteroidMedium', "images/asteroid-medium.png");
    game.load.image('asteroidSmall', "images/asteroid-small.png");
    
	},

// create things to add
	create:function(){

	spacefield = game.add.tileSprite(0,0,800,600,'background');
	player = game.add.sprite(game.world.centerX,game.world.centerY + 150 , 'player');
        
    game.physics.enable(player, Phaser.Physics.ARCADE);
        
    cursors = game.input.keyboard.createCursorKeys();
        
// Properties for bullet and shooting
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
        
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    restartkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER); 
        
// Properties for asteroids1    
    asteroids1 = game.add.group();
    asteroids1.enableBody = true;
    asteroids1.physicsBodyType = Phaser.Physics.ARCADE;
   
// Properties for asteroids2
    asteroids2 = game.add.group();
    asteroids2.enableBody = true;
    asteroids2.physicsBodyType = Phaser.Physics.ARCADE;  
        
// Properties for asteroids3
    asteroids3 = game.add.group();
    asteroids3.enableBody = true;
    asteroids3.physicsBodyType = Phaser.Physics.ARCADE;  
        
// Properties for asteroids4
    asteroids4 = game.add.group();
    asteroids4.enableBody = true;
    asteroids4.physicsBodyType = Phaser.Physics.ARCADE;  
        
// Properties for asteroids5
    asteroids5 = game.add.group();
    asteroids5.enableBody = true;
    asteroids5.physicsBodyType = Phaser.Physics.ARCADE;  
        
// Properties for asteroids6
    asteroids6 = game.add.group();
    asteroids6.enableBody = true;
    asteroids6.physicsBodyType = Phaser.Physics.ARCADE;  
        
// Properties for asteroids7
    asteroids7 = game.add.group();
    asteroids7.enableBody = true;
    asteroids7.physicsBodyType = Phaser.Physics.ARCADE;  
        
// Create all asteroids
    createAsteroids();
    
// Create score and win text   
    scoreText = game.add.text(5,550,'Score:',{font: '32px Arial',fill: '#fff'});
    winText = game.add.text(235,240,'Mission Accomplished!',{font: '32px Arial',fill: '#fcfc4b'});
    winText.visible = false;
    restartText = game.add.text(215, 300,'Click on ENTER button to restart',{font:'25px Arial', fill:"#fff"});
    restartText.visible = false;
},

// update based on changes (e.g.movement)
	update:function(){
	
       // collision 
       game.physics.arcade.overlap(bullets,asteroids1,collisionHandler1, null, this);
       game.physics.arcade.overlap(bullets,asteroids2,collisionHandler2, null, this); 
       game.physics.arcade.overlap(bullets,asteroids3,collisionHandler3, null, this); 
       game.physics.arcade.overlap(bullets,asteroids4,collisionHandler4, null, this);
       game.physics.arcade.overlap(bullets,asteroids5,collisionHandler5, null, this);
       game.physics.arcade.overlap(bullets,asteroids6,collisionHandler6, null, this);
       game.physics.arcade.overlap(bullets,asteroids7,collisionHandler7, null, this);
       
       
        
       spacefield.tilePosition.x += 0.5;
       
       // player
       player.body.velocity.x = 0;
       player.body.velocity.y = 0;
        
       if(cursors.left.isDown)  
        {
            player.body.velocity.x = -200;
        }
       if(cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }
       if(cursors.up.isDown)
        {
            player.body.velocity.y = -200;
        }
       if(cursors.down.isDown)
        {
            player.body.velocity.y = 200;
        }

       // shooting
       if(fireButton.isDown)
        {
            fireBullet();
        }
        
       movingAsteroids();   
    
      // score
       scoreText.text = 'Score:' + score;  
        
       if(score == 4000){
           
          winText.visible = true;
          restartText.visible = true;
          scoreText.visible = false;
          
           if (restartkey.isDown){
               restartgame();
           }
        } 
        
    
        
       
},
    
}



/* --- define functions --- */

// firing function
function fireBullet(){
    if(game.time.now > bulletTime){
        bullet = bullets.getFirstExists(false);
    
        if(bullet){
            bullet.reset(player.x + 30, player.y);
            bullet.body.velocity.y = -250;
            bulletTime = game.time.now + 200;
        }    
        
    }
}

// creating asteroids function
function createAsteroids(){
    
    // 3 asteroids a row
    for (var y = 0; y< 1; y++){
          for(var x = 0; x< 3; x++){
          var asteroid1 = asteroids1.create(x*120, y*60, 'asteroidBig');    //asteroids1
          var asteroid2 = asteroids2.create(x*80, y*20, 'asteroidMedium');   //asteroids2
          var asteroid3 = asteroids3.create(x*50, y*20, 'asteroidSmall');    //asteroids3 
    
          
          //asteroids1
          asteroids1.x = 10;
          asteroids1.y = 20;
          asteroids1.speedX = 1.5;
          asteroids1.speedY = 1.5;  
         
          //asteroids2
          asteroids2.x = 10;
          asteroids2.y = 400;
          asteroids2.speedX = 3;
          asteroids2.speedY = -1;  
          
          //asteroids3
          asteroids3.x = 300;
          asteroids3.y = 150;
          asteroids3.speedX = 2;
          asteroids3.speedY = 1;     
              
        }
    }   
    
    // 2 asteroids a row
    for (var y = 0; y< 1; y++){
          for(var x = 0; x< 2; x++){
          
          var asteroid4 = asteroids4.create(x*120, y*60, 'asteroidBig');    //asteroids4 
          var asteroid5 = asteroids5.create(x*80, y*20, 'asteroidMedium');    //asteroids5 
          var asteroid6 = asteroids6.create(x*50, y*20, 'asteroidSmall');    //asteroids6 
          var asteroid7 = asteroids7.create(x*80, y*20, 'asteroidMedium');    //asteroids7
          
          //asteroids4
          asteroids4.x = 400;
          asteroids4.y = 500;
          asteroids4.speedX = -2;
          asteroids4.speedY = -2;  
              
          //asteroids5
          asteroids5.x = 200;
          asteroids5.y = 20;
          asteroids5.speedX = -2;
          asteroids5.speedY = 1;  
              
         //asteroids6
          asteroids6.x = 500;
          asteroids6.y = 200;
          asteroids6.speedX = -2;
          asteroids6.speedY = 1; 
              
         //asteroids7
          asteroids7.x = 200;
          asteroids7.y = 20;
          asteroids7.speedX = 3;
          asteroids7.speedY = -3;  
        }
    }   
}

// make asteroids move functions
function movingAsteroids(){
    //asteroids1
    asteroids1.x += asteroids1.speedX ;
    asteroids1.y += asteroids1.speedY;
    if(asteroids1.x > 480){
        asteroids1.speedX = -1;
    }
    
    if(asteroids1.x < -5){
        asteroids1.speedX = 1;
    }
    
    if(asteroids1.y > 510){
        asteroids1.speedY = -1;
    }
    
    if(asteroids1.y < -5){
        asteroids1.speedY = 1;
    }
    
    //asteroids2
    asteroids2.x += asteroids2.speedX ;
    asteroids2.y += asteroids2.speedY;
    if(asteroids2.x > 600){
        asteroids2.speedX = -2;
    }
    
    if(asteroids2.x < -5){
        asteroids2.speedX = 2;
    }
    
    if(asteroids2.y > 556){
        asteroids2.speedY = -1;
    }
    
    if(asteroids2.y < -5){
        asteroids2.speedY = 1;
    }
    
    //asteroids3
    asteroids3.x += asteroids3.speedX ;
    asteroids3.y += asteroids3.speedY;
    if(asteroids3.x > 680){
        asteroids3.speedX = -2;
    }
    
    if(asteroids3.x < 0){
        asteroids3.speedX = 2;
    }
    
    if(asteroids3.y > 580){
        asteroids3.speedY = -1;
    }
    
    if(asteroids3.y < 0){
        asteroids3.speedY = 1;
    }
    
    //asteroids4
    asteroids4.x += asteroids4.speedX ;
    asteroids4.y += asteroids4.speedY;
    if(asteroids4.x > 595){
        asteroids4.speedX = -2;
    }
    
    if(asteroids4.x < -8){
        asteroids4.speedX = 2;
    }
    
    if(asteroids4.y > 510){
        asteroids4.speedY = -2;
    }
    
    if(asteroids4.y < -8){
        asteroids4.speedY = 2;
    }
    
    //asteroids5
    asteroids5.x += asteroids5.speedX ;
    asteroids5.y += asteroids5.speedY;
    if(asteroids5.x > 680){
        asteroids5.speedX = -2;
    }
    
    if(asteroids5.x < -5){
        asteroids5.speedX = 2;
    }
    
    if(asteroids5.y > 556){
        asteroids5.speedY = -1;
    }
    
    if(asteroids5.y < -5){
        asteroids5.speedY = 1;
    }
    
    //asteroids6
    asteroids6.x += asteroids6.speedX ;
    asteroids6.y += asteroids6.speedY;
    if(asteroids6.x > 730){
        asteroids6.speedX = -2;
    }
    
    if(asteroids6.x < 0){
        asteroids6.speedX = 2;
    }
    
    if(asteroids6.y > 580){
        asteroids6.speedY = -1;
    }
    
    if(asteroids6.y < 0){
        asteroids6.speedY = 1;
    }
    
    //asteroids7
    asteroids7.x += asteroids7.speedX ;
    asteroids7.y += asteroids7.speedY;
    if(asteroids7.x > 680){
        asteroids7.speedX = -3;
    }
    
    if(asteroids7.x < -5){
        asteroids7.speedX = 3;
    }
    
    if(asteroids7.y > 556){
        asteroids7.speedY = -3;
    }
    
    if(asteroids7.y < -5){
        asteroids7.speedY = 3;
    }
}


// sensing collision function

//asteroids1
function collisionHandler1(bullet,asteroids1){
    bullet.kill();
    asteroids1.kill();
    
    score = score + 200;
    
}

//asteroids2
function collisionHandler2(bullet,asteroids2){
    bullet.kill();
    asteroids2.kill();
    
    score = score + 200;
    
}

//asteroids3
function collisionHandler3(bullet,asteroids3){
    bullet.kill();
    asteroids3.kill();
    
    score = score + 300;
    
}

//asteroids4
function collisionHandler4(bullet,asteroids4){
    bullet.kill();
    asteroids4.kill();
    
    score = score + 200;
    
}

//asteroids5
function collisionHandler5(bullet,asteroids5){
    bullet.kill();
    asteroids5.kill();
    
    score = score + 200;
    
}

//asteroids6
function collisionHandler6(bullet,asteroids6){
    bullet.kill();
    asteroids6.kill();
    
    score = score + 300;
    
}

//asteroids7
function collisionHandler7(bullet,asteroids7){
    bullet.kill();
    asteroids7.kill();
    
    score = score + 250;
}

function restartgame(){
    
    createAsteroids();
    movingAsteroids();
    
    scoreText.visible = true;
    winText.visible = false;
    restartText.visible = false;
    score = 0;
    
}




game.state.add('mainState', mainState);

game.state.start('mainState');



