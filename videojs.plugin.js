//sets the ability to scrub to a new point in the video
//and fetch from that timestamp with limelight,
//by appending &ms={timestamp} to the request url.
_V_.options.flash.flashVars = _V_.options.flash.flashVars || {};
_V_.options.flash.flashVars['allowPartial'] = true;

_V_.options.components['logo'] = {}; 
_V_.options.components['replayButton'] = {};
_V_.options.components['socialControlBar'] = {};
_V_.options.components['rotateButton'] = {};


_V_.Logo = _V_.Component.extend({
    init: function (player, options){
        var p = this._super(player, options);
    },
    buildCSSClass: function(){
        return " vjs-logo ";
    },
    createElement: function(type, attrs){
      attrs = _V_.merge({
          className: this.buildCSSClass()//,
          //innerHTML:''
      }, attrs); 
      
      return this._super(type, attrs);
    }
});

_V_.ReplayButton = _V_.Button.extend({
    init: function (player, options){
        var p = this._super(player, options);
        
        this.player.addEvent("ended", this.proxy(this.onEnded));
        
        this.player.addEvent("play", this.proxy(this.onPlayState));
        this.player.addEvent("pause", this.proxy(this.onPlayState));
        this.player.controlBar.addEvent("mouseup", this.proxy(this.onPlayState));
    },
    buildCSSClass: function(){
        //return this._super() + " vjs-social-button ";
        return " vjs-replay-button  vjs-fade-out ";
    },
    createElement: function(type, attrs){
      attrs = _V_.merge({
          className: this.buildCSSClass(),
          innerHTML:'<div class="vjs-replay-icon"></div><div class="vjs-replay-text">%1</div>'.replace('%1', 'replay')
      }, attrs); 
      
      return this._super(type, attrs);
    },
    onEnded: function(){
        this.fadeIn();  
    },
    onPlayState: function(){
        this.fadeOut();
    },
    onClick: function(){
        this.player.pause();
        this.player.currentTime(0);
        this.player.play()
    }
});

_V_.SocialControlBar = _V_.Control.extend({
    options: {
        components: {
            "facebookButton": {},
            "twitterButton": {},
            "pinterestButton": {},
            "gPlusButton": {}
        }
    },
    init: function (player, options){
        var p = this._super(player, options);
        //console.log('init', this, p);
        
        this.player.addEvent("mouseover", this.proxy(this.fadeIn));
        this.player.addEvent("mouseout", this.proxy(this.fadeOut));
    },
    buildCSSClass: function(){
        //return this._super() + " vjs-social-controlBar ";
        return " vjs-social-controlBar ";
    },
    createElement: function(type, attrs){
      attrs = _V_.merge({
          className: this.buildCSSClass(),
          innerHTML:''
      }, attrs); 
      
      return this._super(type, attrs);
    }
});

_V_.SocialButton = _V_.Button.extend({
    init: function (player, options){
        var p = this._super(player, options);
    },
    buildCSSClass: function(){
        //return this._super() + " vjs-social-button ";
        return " vjs-social-button ";
    },
    createElement: function(type, attrs){
      attrs = _V_.merge({
          className: this.buildCSSClass(),
          innerHTML: ''
      }, attrs); 
      
      return this._super(type, attrs);
    }
});

_V_.FacebookButton = _V_.SocialButton.extend({
    init: function (player, options){
        var p = this._super(player, options);
    },
    buildCSSClass: function(){
        return this._super() + " vjs-FB-button ";
    },
    onClick: function(){
        var options = this.player.options || {}, FB = FB || null;
        
        if(!!FB && !!FB.ui){
           FB.ui({ "method": "feed", "link": options.video_url }); return false;
        }
               
        var api = 'https://www.facebook.com/sharer.php?';
        var params = [
            ['u', encodeURIComponent(options.video_url)].join('=')
            //['title', options.video_title].join('=')
        ].join('&');
        
        var wparams = [
            ['resizable','1'].join('='),
            ['location','1'].join('='),
            ['width','550'].join('='),
            ['height','400'].join('=')
        ].join();
        
       //console.log('wparams',wparams, api + params, this, this.options, arguments);
        
        var popup = window.open(api + params, 'facebook', wparams);
        if(popup.focus){popup.focus()}
    }
});

_V_.TwitterButton = _V_.SocialButton.extend({
    init: function (player, options){
        var p = this._super(player, options);
    },
    buildCSSClass: function(){
        return this._super() + " vjs-TW-button ";
    },
    onClick: function(){
        var options = this.player.options || {};
        var api = 'http://twitter.com/share?';
        var params = [
            ['url', encodeURIComponent(options.video_url)].join('='),
            ['counturl', encodeURIComponent(options.video_url)].join('='),
            ['hashtags', options.video_tags].join('='),
            ['text', options.video_message].join('=')
        ].join('&');
        
        var wparams = [
            ['resizable','1'].join('='),
            ['location','1'].join('='),
            ['width','550'].join('='),
            ['height','400'].join('=')
        ].join();
        
       //console.log('wparams',wparams, api + params, this, this.options, arguments);
        var popup = window.open(api + params, 'twitter', wparams);
        if(popup.focus){popup.focus()}
    }
});

_V_.PinterestButton = _V_.SocialButton.extend({
    init: function (player, options){
        var p = this._super(player, options);
    },
    buildCSSClass: function(){
        return this._super() + " vjs-PIN-button ";
    },
    onClick: function(){
        var options = this.player.options || {};
        var api = 'http://pinterest.com/pin/create/button/?';
        var params = [
            ['url', encodeURIComponent(options.video_url)].join('='),
            ['media', options.poster ].join('='),
            ['description', options.video_description ].join('=')
        ].join('&');
        
        var wparams = [
            ['resizable','1'].join('='),
            ['location','1'].join('='),
            ['width','600'].join('='),
            ['height','350'].join('=')
        ].join();
        
       //console.log('wparams',wparams, api + params);
        var popup = window.open(api + params, 'pinterest', wparams);
        if(popup.focus){popup.focus()}
    }
});

_V_.GPlusButton = _V_.SocialButton.extend({
    init: function (player, options){
        var p = this._super(player, options);
    },
    buildCSSClass: function(){
        return this._super() + " vjs-GP-button ";
    },
    onClick: function(){
        var options = this.player.options || {};
        var api = 'https://plusone.google.com/_/+1/confirm?';
        var params = [
            ['hl','en'].join('='),
            ['url',  encodeURIComponent(options.video_url) ].join('=')
        ].join('&');
        
        var wparams = [
            ['resizable','1'].join('='),
            ['location','1'].join('='),
            ['width','550'].join('='),
            ['height','550'].join('=')
        ].join();
       //console.log('wparams',wparams, api + params);
        var popup = window.open(api + params, 'google', wparams);
        if(popup.focus){popup.focus()}
    }
});

_V_.RotateButton = _V_.Button.extend({
    init: function (player, options){
        var p = this._super(player, options);
        
        this.player.addEvent("mouseover", this.proxy(this.fadeIn));
        this.player.addEvent("mouseout", this.proxy(this.fadeOut));
    },
    createElement: function(type, attrs){
        //if(this.player.techName = 'html5'){
        if(this.player.tech.el.localName === 'video'){
                attrs = _V_.merge({
                className: this.buildCSSClass(),
                innerHTML:'Rotate'
            }, attrs); 

            return this._super(type, attrs);
        }
        
        
        //var e = this._super(type, attrs);
        //this.fadeout();
        return document.createElement('span');
      
    },
    buildCSSClass: function(){
        return " vjs-rotate-button ";
    },
    clickCount: 0,
    onClick: function(){
        //console.log('rotate', this.player, this.player.techName, this.player.tech.el.localName, this.player.tech.el);
        
        //if(this.player.techName === "html5" ){
        if(this.player.tech.el.localName === 'video'){
            var tech = this.player.tech.el;
            var poster = this.player.poster.el;
            var deg = ((this.clickCount) + 1) * 90;
            
            this.player.el.style.overflow = 'hidden';
        
            tech.style.webkitTransform = 'rotate('+deg+'deg)';
            tech.style.MozTransform = 'rotate('+deg+'deg)';
            tech.style.msTransform = 'rotate('+deg+'deg)';
            tech.style.OTransform = 'rotate('+deg+'deg)';
            tech.style.transform = 'rotate('+deg+'deg)';

            poster.style.webkitTransform = 'rotate('+deg+'deg)';
            poster.style.MozTransform = 'rotate('+deg+'deg)';
            poster.style.msTransform = 'rotate('+deg+'deg)';
            poster.style.OTransform = 'rotate('+deg+'deg)';
            poster.style.transform = 'rotate('+deg+'deg)';

            this.clickCount += 1;
        }
        
    }
});