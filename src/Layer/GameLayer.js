
var GameLayer = cc.Layer.extend({
    sprite:null,

    ctor:function (stageNum) {
cc.log(stageNum);
this.stageNum = stageNum;
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

        //Safe_png
        this.safeSprite = new cc.Sprite(res.Safe_png);
        this.safeSprite.setAnchorPoint(0,0);
        this.mapNode.addChild(this.safeSprite);

        this.safeMarker001Sprite = new cc.Sprite(res.Marker_png);
        this.mapNode.addChild(this.safeMarker001Sprite);

        this.safeMarker002Sprite = new cc.Sprite(res.Marker_png);
        this.mapNode.addChild(this.safeMarker002Sprite);

        this.safeMarker003Sprite = new cc.Sprite(res.Marker_png);
        this.mapNode.addChild(this.safeMarker003Sprite);

        this.safeMarker004Sprite = new cc.Sprite(res.Marker_png);
        this.mapNode.addChild(this.safeMarker004Sprite);



        this._label = cc.LabelTTF.create("aaaaaaaaa","Arial",20);
        this._label.setPosition(100,400);
        this.addChild(this._label);
        //_label.setFontFillColor(cc.c4b(255,255,255,255));  
        //_label.setAnchorPoint(0.5,0);
        //_label.enableStroke(cc.c4b(0,0,0,255),1,false);

        this.scheduleUpdate();
        return true;
    },

    addEnemyByPos : function(posX,posY){
        this.enemy = new Enemy(this);
        this.enemy.setPos(posX,posY);
        this.mapNode.addChild(this.enemy);
        this.enemies.push(this.enemy);
    },

    isCameraRange:function(posX,posY){
        //2面はビューポートクリッピングがOFFだから常にtrueを返して、スプライトの表示を行う
        if(this.stageNum == 2) return true;

        if(this.cameraX * -1  < posX && posX < this.cameraX * -1 + 320
            && this.cameraY * -1  < posY && posY < this.cameraY * -1 + 480
        ){
            return true;
        }
        /*
        if(this.cameraX * -1 + 60 < posX && posX < this.cameraX * -1 + 260
            && this.cameraY * -1 + 90 < posY && posY < this.cameraY * -1 + 390
        ){
            return true;
        }*/
        return false;
    },

    update:function(dt){

        this._label.setString("enemy×" + this.enemies.length + "");

        this.safeSprite.setPosition(this.cameraX * -1,this.cameraY * -1);
        //左上
        this.safeMarker001Sprite.setPosition(this.cameraX * -1 + 60, this.cameraY * -1 + 390);
        //右上
        this.safeMarker002Sprite.setPosition(this.cameraX * -1 + 260,this.cameraY * -1 + 390);
        //左下
        this.safeMarker003Sprite.setPosition(this.cameraX * -1 + 60, this.cameraY * -1 + 90);
        //右下
        this.safeMarker004Sprite.setPosition(this.cameraX * -1 + 260,this.cameraY * -1 + 90);

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
//cc.log(this.cameraX + "|" + this.cameraY);
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

var GameLayerScene001 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer(1);
        this.addChild(layer);
    }
});

var GameLayerScene002 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer(2);
        this.addChild(layer);
    }
});


