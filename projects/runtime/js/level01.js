var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 110},
                { "type": "sawblade", "x": 600, "y": groundY - 35},
                { "type": "sawblade", "x": 900, "y": groundY - 110},
                { "type": "sawblade", "x": 1300, "y": groundY - 93},
                { "type": "sawblade", "x": 1700, "y": groundY - 110},
                { "type": "enemy", "x": 2300, "y": groundY  - 30},
                { "type": "spikes", "x": 2500, "y": groundY - 15 },
                { "type": "spikes", "x": 1500, "y": groundY - 15},
                { "type": "carl", "x": 400, "y": groundY - 93},
                { "type": "carl", "x": 3000, "y": groundY - 93},
                { "type": "reward", "x": 1200, "y": groundY - 93},
                { "type": "reward", "x": 1400, "y": groundY - 50},
                { "type": "reward", "x": 2200, "y": groundY - 93},
                { "type": "reward", "x": 700, "y": groundY - 93},
                { "type": "sawblade", "x": 3200, "y": groundY - 93},
                { "type": "reward", "x": 3300, "y": groundY - 93},
                { "type": "sawblade", "x": 3500, "y": groundY - 35},
                { "type": "reward", "x": 3600, "y": groundY - 35},
                { "type": "reward", "x": 700, "y": groundY - 93},
                { "type": "checkpoint", "x": 4000, "y": groundY - 93},
                { "type": "sign", "x": 4000, "y": groundY - 35},
                
                //level 2
                { "type": "sawblade", "x": 4300, "y": groundY - 93},
                { "type": "sawblade", "x": 4500, "y": groundY - 35},
                { "type": "sawblade", "x": 4700, "y": groundY - 93},
                { "type": "reward", "x": 4500, "y": groundY - 93},
                { "type": "enemy", "x": 4900, "y": groundY - 30},
                { "type": "spikes", "x": 5100, "y": groundY - 15},
                { "type": "carl", "x": 5300, "y": groundY - 93},
                { "type": "reward", "x": 5100, "y": groundY - 93},
                { "type": "spikes", "x": 5500, "y": groundY - 15},
                { "type": "reward", "x": 5500, "y": groundY - 93},
                { "type": "enemy", "x": 5700, "y": groundY - 30},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "sawblade", "x": 5900, "y": groundY - 93},
                { "type": "reward", "x": 5900, "y": groundY - 50},
                { "type": "sawblade", "x": 6100, "y": groundY - 50},
                { "type": "reward", "x": 6300, "y": groundY - 50},
                { "type": "sawblade", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                { "type": "", "x": 4000, "y": groundY - 93},
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
       
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            
            sawBladeHitZone.rotationalVelocity = 8
            game.addGameItem(sawBladeHitZone); 
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
         function createEnemy(x,y) {
                var enemy =  game.createGameItem('enemy', 40);
                var stormTrooper = draw.bitmap('img/SkullTrooper.png.png');
                stormTrooper.x = -60;
                stormTrooper.y = -80;
                stormTrooper.scaleX = .7;
                stormTrooper.scaleY = .7;
                enemy.addChild(stormTrooper);
                
                enemy.x = x;
                enemy.y = y;
                
                game.addGameItem(enemy);
                
               enemy.velocityX = - 2;
               
               enemy.onPlayerCollision = function (){
                   game.changeIntegrity(-30);
                   enemy.fadeOut();
               };
                enemy.onProjectileCollision = function() {
                        game.increaseScore(50);
                        enemy.fadeOut();
                };
            }  
     function createSpike(x, y){
            var hitZoneSize = 20;
            var damageFromObstacle = 15;
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            spikeHitZone.x = x;
            spikeHitZone.y = y;
            game.addGameItem(spikeHitZone);
        
            var obstacleImage = draw.bitmap('img/spikes.png');        
            spikeHitZone.addChild(obstacleImage);
            obstacleImage.x = -85;
            obstacleImage.y = -100;
        
        }
        function createEnemy2(x, y) {
            var hitZoneSize = 50;
            var carlImage = draw.bitmap('img/carl.png')
            var carl = game.createGameItem('carl', 50);
            carl.x = x;
            carl.y = y;
            carl.scaleX = .2
            carl.scaleY = .2
            carl.velocityX = -2;
            game.addGameItem(carl);
            carl.addChild(carlImage);
            carlImage.x = -40;
            carlImage.y = -40;
            
            carl.onPlayerCollision = function (){
                   game.changeIntegrity(-25);
                   carl.fadeOut();
               };
                carl.onProjectileCollision = function() {
                        game.increaseScore(25);
                        carl.fadeOut();
                };
        }
        function createReward(x, y) {
            var hitZoneSize = 25;
            var rewardImage = draw.bitmap('img/reward.png')
            var reward = game.createGameItem('reward', 25);
            reward.x = x;
            reward.y = y;
            reward.scaleX = 2;
            reward.sclaeY = 1;
            reward.velocityX = -2;
            game.addGameItem(reward);
            reward.addChild(rewardImage);
            rewardImage.x = -35;
            rewardImage.y = -20;
            
            reward.onPlayerCollision = function (){
                   game.changeIntegrity(25);
                   reward.fadeOut();
               };
                reward.onProjectileCollision = function() {
                        game.increaseScore(25);
                        reward.fadeOut();
                };
        }
        
        function nextLevelCheckpoint(x, y) {
            var hitZoneSize = 100;
            var checkpointImage = draw.bitmap('img/plumbus.png')
            var checkpoint = game.createGameItem('checkpoint', 50);
            checkpoint.x = x;
            checkpoint.y = y;
            checkpoint.velocityX = -2;
            game.addGameItem(checkpoint);
            checkpoint.addChild(checkpointImage);
            checkpointImage.x = -45;
            checkpointImage.y = -200;
            
            checkpoint.onPlayerCollision = function (){
                   game.changeIntegrity(100);
                   game.increaseScore(50);
                   checkpoint.fadeOut();
               };
                checkpoint.onProjectileCollision = function() {
                        game.increaseScore(50);
                        game.changeIntegrity(100);
                        checkpoint.fadeOut();
                };
        }
         function nextLevelSign(x, y) {
 
            var signImage = draw.bitmap('img/nextlevel.png');
            var sign = game.createGameItem('sign', 50);
            sign.x = x;
            sign.y = y;
            sign.scaleX = .3;
            sign.scaleY = .3;
            sign.velocityX = -2;
            game.addGameItem(sign);
            sign.addChild(signImage);
            signImage.x = -45;
            signImage.y = -25;
        }
        
        

        
        for (var key = 0; key < levelData.gameItems.length; key++){
             var gameItemObject = levelData.gameItems[key];
                if (gameItemObject.type === 'sawblade'){
                    createSawBlade(gameItemObject.x, gameItemObject.y);
                }

                if (gameItemObject.type === 'enemy'){
                    createEnemy(gameItemObject.x, gameItemObject.y);
                }
                if (gameItemObject.type === 'spikes'){
                    createSpike(gameItemObject.x, gameItemObject.y)
                }
                if (gameItemObject.type === 'carl'){
                    createEnemy2(gameItemObject.x, gameItemObject.y)
                }
                if (gameItemObject.type === 'reward'){
                    createReward(gameItemObject.x, gameItemObject.y)
                }
                
                if (gameItemObject.type === 'checkpoint'){
                    nextLevelCheckpoint(gameItemObject.x, gameItemObject.y)
                }
                if (gameItemObject.type === 'sign'){
                    nextLevelSign(gameItemObject.x, gameItemObject.y)
                }
        }
    
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
