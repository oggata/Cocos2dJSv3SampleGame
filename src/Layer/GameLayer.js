
var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        this.mapNode = cc.Node.create();
        this.addChild(this.mapNode);

        var fieldSprite = new cc.Sprite("res/ui/field.jpg");
        fieldSprite.setAnchorPoint(0,0);
        this.mapNode.addChild(fieldSprite);

        this.targetMarker = new cc.Sprite("res/sprite/targetMarker.png");
        this.mapNode.addChild(this.targetMarker);

        this.player = new Player(this);
        this.mapNode.addChild(this.player);

        //initialize camera
        self.touchStartPoint = {x:0,y:0}
        this.playerCameraX = 320/2;
        this.playerCameraY = 420/2;
        this.cameraX = this.playerCameraX - this.player.getPosition().x;
        this.cameraY = this.playerCameraY - this.player.getPosition().y;
        this.mapNode.setPosition(
            this.cameraX,
            this.cameraY
        );

        //if( 'touches' in cc.sys.capabilities )
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan : function(touches, event){
                    cc.log("xxxx");
                    var touch = touches[0];
                    var loc = touch.getLocation();
                    self.touchStartPoint = {
                        x:loc.x,
                        y:loc.y
                    }
                    //event.targetMarker.setPosition(tPosX,tPosY);
                    //this.targetMarker.setPosition(cc.p(tPosX,tPosY));
                },
                onTouchesMoved : function(touches, event){},
                onTouchesEnded:function (touches, event) {
                    if (touches.length <= 0)
                        return;
                    //event.getCurrentTarget().moveSprite(touches[0].getLocation());
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

    update:function(dt){
        if(self.touchStartPoint){
            cc.log(self.touchStartPoint.x);
            var tPosX = (self.touchStartPoint.x - this.cameraX);
            var tPosY = (self.touchStartPoint.y - this.cameraY);
            this.targetMarker.setPosition(cc.p(tPosX,tPosY));
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

var GameLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


