var GlobalObject = (function(){
    try { return window; }
    catch (e) { return exports; }
})();

(function(_bind){

    function table(tableElement){
        var _repeater = tableElement.querySelectorAll('repeat');
        var _remoteAddr = tableElement.getAttribute('remote-address');
        var _data = {};
        this.load = function(){
            this.AJAX.get({
                url: _remoteAddr,
                
            })
        };
    }

    this.tables = (function() {

        var _tables = (function(){
            var tableElements = document.querySelectorAll("[bind-table-enabled=true]");
            var tables = [];
            if(tableElements)
                [].forEach.call(tableElements,function(tableElement){                    
                    tables.push(new table(tableElement));        
                });
            return tables;
        })();
        
    })();

})(GlobalObject.bind = (GlobalObject.bind || {}));