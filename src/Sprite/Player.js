//
//  Player.js
//  Territory
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

var Player = cc.Node.extend({

    ctor:function (game) {
        this._super();
        this.game             = game;

        //status
        this.lv               = 1;
        this.hp               = 100;
        this.maxHp            = 100;
        this.attack           = 10;
        this.defence          = 10;
        this.walkSpeed        = 5;

        //image
        this.charactorCode     = 1;
        this.image             = "res/sprite/chara007.png";
        this.imgWidth          = 60/3; 
        this.imgHeight         = 112/4;

        //init
        this.battleInterval    = 0;
        this.direction         = "front";
        this.bulletSpeed       = 5;
        this.targetEnemy       = null;
        this.targetChip        = null;
        this.initializeWalkAnimation();
        this.alpha = 0;
        this.update();
    },
    
    init:function () {
    },

    update:function() {
    },

    remove:function() {
        this.removeChild(this.sprite);
    },
    
    damage:function(damagePoint) {
        playSE(s_se_attack);
        this.hp = this.hp - damagePoint;
        if(this.hp < 0){
            this.hp = 0;
        }
    },

    getDirection:function(){
        return this.direction;
    },

    initializeWalkAnimation:function(){        
        //足下の陰
        this.shadow = cc.Sprite.create("res/sprite/shadow.png");
        this.shadow.setPosition(0,-8);
        this.shadow.setOpacity(255*0.4);
        this.addChild(this.shadow);

        var frameSeq = [];
        for (var i = 0; i < 3; i++) {
            var frame = cc.SpriteFrame.create(this.image,cc.rect(this.imgWidth*i,this.imgHeight*0,this.imgWidth,this.imgHeight));
            frameSeq.push(frame);
        }
        this.wa = cc.Animation.create(frameSeq,0.2);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image,cc.rect(0,0,this.imgWidth,this.imgHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);

        this.sprite.setAnchorPoint(0.5,0.25);
        this.sprite.setScale(1.4,1.4);
        /*
        //デバッグ
        if(CONFIG.DEBUG_FLAG==1){
            this.sigh = cc.LayerColor.create(cc.c4b(255,0,0,255),3,3);
            this.sigh.setPosition(0,0);
            this.addChild(this.sigh);
        }*/
    },

    moveToTargetMarker:function(targetSprite) {
        if(targetSprite == null) return;
        if(this.getPosition().x < targetSprite.getPosition().x){
            if(Math.abs(this.getPosition().x - targetSprite.getPosition().x) > this.walkSpeed){
                this.setPosition(
                    this.getPosition().x + this.walkSpeed,
                    this.getPosition().y
                );
            }else{
                this.setPosition(
                    targetSprite.getPosition().x,
                    this.getPosition().y
                );
            }
        }
        if(this.getPosition().x > targetSprite.getPosition().x){
            if(Math.abs(this.getPosition().x - targetSprite.getPosition().x) > this.walkSpeed){
                this.setPosition(
                    this.getPosition().x - this.walkSpeed,
                    this.getPosition().y
                );
            }else{
                this.setPosition(
                    targetSprite.getPosition().x,
                    this.getPosition().y
                );
            }
        }
        if(this.getPosition().y < targetSprite.getPosition().y){
            if(Math.abs(this.getPosition().y - targetSprite.getPosition().y) > this.walkSpeed){
                this.setPosition(
                    this.getPosition().x,
                    this.getPosition().y + this.walkSpeed
                );
            }else{
                this.setPosition(
                    this.getPosition().x,
                    targetSprite.getPosition().y
                );
            }
        }
        if(this.getPosition().y > targetSprite.getPosition().y){
            if(Math.abs(this.getPosition().y - targetSprite.getPosition().y) > this.walkSpeed){
                this.setPosition(
                    this.getPosition().x,
                    this.getPosition().y - this.walkSpeed
                );
            }else{
                this.setPosition(
                    this.getPosition().x,
                    targetSprite.getPosition().y
                );
            }
        }
    },

    setDirection:function(targetSprite){
        var diffX = Math.floor(targetSprite.getPosition().x - this.getPosition().x);
        var diffY = Math.floor(targetSprite.getPosition().y - this.getPosition().y);
        if(diffX > 0 && diffY > 0){
            this.walkRightUp();
        }
        if(diffX > 0 && diffY < 0){
            this.walkRightDown();
        }
        if(diffX < 0 && diffY > 0){
            this.walkLeftUp();
        }
        if(diffX < 0 && diffY < 0){
            this.walkLeftDown();
        }
    },

    walkLeftDown:function(){
        if(this.direction != "front"){
            this.direction = "front";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image,cc.rect(this.imgWidth*i,this.imgHeight*0,this.imgWidth,this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq,0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkRightDown:function(){
        if(this.direction != "left"){
            this.direction = "left";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image,cc.rect(this.imgWidth*i,this.imgHeight*1,this.imgWidth,this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq,0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkLeftUp:function(){
        if(this.direction != "right"){
            this.direction = "right";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image,cc.rect(this.imgWidth*i,this.imgHeight*2,this.imgWidth,this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq,0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkRightUp:function(){
        if(this.direction != "back"){
            this.direction = "back";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image,cc.rect(this.imgWidth*i,this.imgHeight*3,this.imgWidth,this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq,0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },


});