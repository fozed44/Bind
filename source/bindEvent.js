GlobalObject = (function(){
    try { return window; }
    catch (e) { return exports; }
})();

(function(_bind){

    _bind.Event = new function(){

        var _events = {};
        
        this.addHandler = function(parentObject, eventName, handler){
            if (parentObject.addEventListener)
                parentObject.addEventListener(eventName, handler)
            else if(parentObject.attachEvent)
                parentObject.attachEvent(eventName, handler);
            else {
                if(typeof parentObject[eventName] == 'function'){
                    current = parentObject[eventName];
                    parentObject[eventName] = function(){
                        current();
                        handler();
                    }
                } else 
                    parentObject[eventName] = handler;                
            }
        };

        this.register = function(eventName, canBubble, cancelable) {
            _events[eventName] = document.createEvent('Event');
            _events[eventName].initEvent(eventName, !!canBubble, !!cancelable);
        };

        this.fire = function(eventName, element){
            (element || GlobalObject).dispatchEvent(_events[eventName]);
        };
    };
})(GlobalObject.bind = (GlobalObject.bind || {}));

GlobalObject.bind.Event.register('onLoadComplete');
GlobalObject.bind.Event.addHandler(GlobalObject, 'load', function(){
    setTimeout(function(self){
        GlobalObject.bind.Event.fire('onLoadComplete');
    },1);
});
