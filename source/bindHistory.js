var GlobalObject = (function(){
    try { return window; }
    catch (e) { return exports; }
})();

(function(_bind){

    _bind.History = new function() {

        var _popStateCallbacks  = [],
            _hasOnPopStateFired = false;

        if(GlobalObject.onpopstate
        && typeof GlobalObject.onpopstate == "function")
            _popStateCallbacks.push(GlobalObject.onpopstate);
            
        GlobalObject.onpopstate = _popstateHandler;

        this.push = function (state, url){            
            GlobalObject.history.pushState(
                state, 
                null, 
                url || ""
            );
        };

        this.onPopState = function(callback){
            _popStateCallbacks.push(callback);
        };

        function _popstateHandler(event){
            _popStateCallbacks.forEach(function(callback){
                callback(event.state);
            });
        };

        (function(){
            bind.Event.addHandler(GlobalObject, 'onLoadComplete', function(){
                if(GlobalObject.history.state && !_hasOnPopStateFired)
                    _popstateHandler({state: history.state});
            });
        })();
    };
})(GlobalObject.bind = (GlobalObject.bind || {}));