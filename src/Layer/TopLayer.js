
var TopLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        /*
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.setAnchorPoint(0,0);
        this.addChild(this.sprite);
        */

        this.rectBase = cc.LayerColor.create(cc.color(0,255,0),320,480);
        this.rectBase.setPosition(0,0);
        this.addChild(this.rectBase);

        this.startButton = new ButtonSprite("Start Game",15,cc.color(255,255,0),this.goToStageLayer,this);
        this.startButton.setAnchorPoint(0,0);
        this.startButton.setPosition(100,100);
        this.addChild(this.startButton);

        return true;
    },

    goToStageLayer:function () {
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new cc.TransitionFade(1.2,new StageLayerScene()));
        }, this);
    }
});

var TopLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TopLayer();
        this.addChild(layer);
    }
});

