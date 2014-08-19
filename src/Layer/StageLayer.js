
var StageLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        /*
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.setAnchorPoint(0,0);
        this.addChild(this.sprite);
        */

        this.rectBase = cc.LayerColor.create(cc.color(0,0,255),320,480);
        this.rectBase.setPosition(0,0);
        this.addChild(this.rectBase);

        this.stage001Button = new ButtonSprite("Stage001",15,cc.color(255,255,0),this.goToGameLayer,this);
        this.stage001Button.setAnchorPoint(0,0);
        this.stage001Button.setPosition(100,300-50*0);
        this.addChild(this.stage001Button);

        this.stage002Button = new ButtonSprite("Stage002",15,cc.color(255,255,0),this.goToGameLayer,this);
        this.stage002Button.setAnchorPoint(0,0);
        this.stage002Button.setPosition(100,300-50*1);
        this.addChild(this.stage002Button);

        this.stage003Button = new ButtonSprite("Stage003",15,cc.color(255,255,0),this.goToGameLayer,this);
        this.stage003Button.setAnchorPoint(0,0);
        this.stage003Button.setPosition(100,300-50*2);
        this.addChild(this.stage003Button);

        this.stage004Button = new ButtonSprite("Stage004",15,cc.color(255,255,0),this.goToGameLayer,this);
        this.stage004Button.setAnchorPoint(0,0);
        this.stage004Button.setPosition(100,300-50*3);
        this.addChild(this.stage004Button);

        this.stage005Button = new ButtonSprite("Stage005",15,cc.color(255,255,0),this.goToGameLayer,this);
        this.stage005Button.setAnchorPoint(0,0);
        this.stage005Button.setPosition(100,300-50*4);
        this.addChild(this.stage005Button);

        return true;
    },

    goToGameLayer:function () {
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new cc.TransitionFade(1.2,new GameLayerScene()));
        }, this);
    }
});

var StageLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StageLayer();
        this.addChild(layer);
    }
});

