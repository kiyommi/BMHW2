var app = angular.module("buyMeApp", ['ngStorage', 'chart.js']);
app.directive('resizable', ['$localStorage',function ($localStorage) {
    return {
        restrict: 'A',
        
        link: function postLink(scope, elem, attrs) {
            elem.resizable({ handles: "n, e, s, w, ne, se, sw, nw" });
            elem.on('resizestop', function (evt, ui) {
                $localStorage.size = ui.size;              
            });
            elem.on('mouseover',function() {
                elem.addClass('enter');
            });
            elem.on('mouseleave',function() {
                elem.removeClass('enter');
            });
            elem.on('dragstop',function(event,ui) {
                $localStorage.pos = {left: ui.offset.left, top:ui.offset.top};
            });
            elem.draggable({containment: "#mainDrag"});
                    
        }
    };}]);
app.config((function (ChartJsProvider) {
    ChartJsProvider.setOptions({
        global:{
            colors : [ '#ff3399', '#1aa3ff', '#ffff1a']
        }
    });
}))
