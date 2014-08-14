//
//  ButtonSprite.js
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//
var ButtonSprite = cc.Node.extend({
    ctor:function (title,fontSize,fontColor,execute,current,pTag) {
        this._super();
        var tag = pTag || 1;

        this.label = cc.LabelTTF.create(title,"Arial",fontSize);
        this.label.color = fontColor;
        this.button = cc.MenuItemLabel.create(
            this.label,
            execute,
            current
        );
        this.button.setPosition(0,0);
        this.button.setTag(tag);
        var menu = cc.Menu.create(
            this.button
        );
        menu.setPosition(0,0);
        this.addChild(menu);
    },

    setIsVisible:function(isVisible){
        this.button.setVisible(isVisible);
    }
});
