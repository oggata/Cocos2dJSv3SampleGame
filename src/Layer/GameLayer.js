
var GameLayer = cc.Layer.extend({
    sprite:null,

    ctor:function () {
        this._super();
        this.mapNode = cc.Node.create();
        this.addChild(this.mapNode);

        this.gameTime = 0;

        var fieldSprite = new cc.Sprite("res/ui/field.jpg");
        fieldSprite.setAnchorPoint(0,0);
        this.mapNode.addChild(fieldSprite);

        this.targetMarker = new cc.Sprite("res/sprite/targetMarker.png");
        this.mapNode.addChild(this.targetMarker);

        this.player = new Player(this);
        this.mapNode.addChild(this.player);

        this.enemies          = [];

        //initialize camera
        this.cameraX = Math.floor(320/2 - this.player.getPosition().x);
        this.cameraY = Math.floor(480/2 - this.player.getPosition().y);
        this.playerCameraX = 320/2;
        this.playerCameraY = 420/2;
        this.mapNode.setPosition(
            this.cameraX,
            this.cameraY
        );

        //if( 'touches' in cc.sys.capabilities )
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan : function(touches, event){
                    event.getCurrentTarget().targetMarker.setPosition(
                        touches[0].getLocation().x - event.getCurrentTarget().cameraX,
                        touches[0].getLocation().y - event.getCurrentTarget().cameraY
                    );
                },
                onTouchesMoved : function(touches, event){},
                onTouchesEnded:function (touches, event) {
                    if (touches.length <= 0)
                        return;
                }
            }), this);
        //else if ('mouse' in cc.sys.capabilities )
        /*
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    //event.getCurrentTarget().moveSprite(event.getLocation());
                }
            }, this);
        */
        this.scheduleUpdate();
        return true;
    },

    addEnemyByPos : function(posX,posY){
        this.enemy = new Enemy(this);
        this.enemy.setPosition(posX,posY);
        this.mapNode.addChild(this.enemy);
        this.enemies.push(this.enemy);
    },

    update:function(dt){
        this.gameTime++;
        if(this.gameTime>=30){
            this.gameTime = 0;
            this.addEnemyByPos(
                getRandNumberFromRange(0,1000),
                getRandNumberFromRange(0,1000)
            );
        }

        for(var i=0;i<this.enemies.length;i++){
            this.enemies[i].update();
         }

        this.player.moveToTargetMarker(this.targetMarker);
        this.player.setDirection(this.targetMarker);
        this.moveCamera();
    },

    moveCamera:function(){
        //カメラ位置はプレイヤーを追いかける
        this.playerCameraX = this.player.getPosition().x + this.cameraX;
        this.playerCameraY = this.player.getPosition().y + this.cameraY;
        //xの中心は320/2=16 +- 20
        if(this.playerCameraX >= 320/2 + 20){
            this.cameraX -= this.player.walkSpeed;
        }
        if(this.playerCameraX <= 320/2 - 20){
            this.cameraX += this.player.walkSpeed;
        }
        //yの中心は420/2=210 +- 20
        if(this.playerCameraY >= 420/2 - 20){
            this.cameraY -= this.player.walkSpeed;
        }
        if(this.playerCameraY <= 420/2 + 20){
            this.cameraY += this.player.walkSpeed;
        }
        if(this.cameraX < -1000) this.cameraX = -1000;
        if(this.cameraX > -160)  this.cameraX = -160;
        if(this.cameraY < -230)  this.cameraY = -230;
        if(this.cameraY > 80)    this.cameraY = 80;
        this.mapNode.setPosition(
            this.cameraX,
            this.cameraY
        );
    },
});

var getRandNumberFromRange = function (min,max) {
    var rand = min + Math.floor( Math.random() * (max - min));
    return rand;
};

var GameLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


