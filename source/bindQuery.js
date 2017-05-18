var GlobalObject = (function(){
    try { return window; }
    catch(e) {
         throw new Error("bindQuery is a strictly browser based implementation and does not work with node.");
    }
})();

(function(_bind){
    
    function queryObjects(_nodes){       
        this.each = function each(func){
            for(var x = 0; x < _nodes.length; ++x)
                func.apply(_nodes[x], Array.prototype.slice.call(arguments,1));
        }
        this.first = function(){
            return new _bind.queryObject(_nodes[0]);
        }
        this.data = function(dataAttrName){
            return _bind.queryObject.data.call(_nodes[0]); 
        }
        this.style = function(style, value){
            if(value === undefined)
                return _nodes[0].style[style];
            for(var x = 0; x < _nodes.length; ++x)
                _nodes[x].style[style] = value;
        }
    };

    _bind.queryObject = function(element){
        this.element = element;
        this.data = function(dataAttrName){
            return element.dataset[dataAttrName];
        }
        this.style = function(style, value){
            if(value === undefined)
                return element.style[style];                
            else
                element.style[style] = value;
        }
    }

    GlobalObject.m = _bind.query = function(selector){
        if(typeof(selector) == 'string')
            return new queryObjects(
                document.querySelectorAll(selector)
            );
        if(typeof(selector) == 'object')
            return new _bind.queryObject(
                selector
            );
        if(selector instanceof 'NodeList')
            return new queryObjects(
                selector
            );
    };

    (function(){
        if(_bind.Animate)
            _bind.Animate.applyCreateGenericMultiAnimator(_bind.queryObject);
    })(); 

})(GlobalObject.bind = (GlobalObject.bind || {}));