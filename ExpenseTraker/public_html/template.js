/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    // define the application name    
    var myApp = {};
    (function(app) {
        // set a few variables which can be used within the app        
        var appName = 'My First Appliction';
        var version = '1.0';
        app.init = function() {
            // init is the typical name that developers give for the            
            // code that runs when an application first loads            
            // use whichever word you prefer            
            var someData = app.data();
        };
        app.data = function() {
            var data = ['first', 'second', 'third', 'fourth'];
            return data;
        };
        app.init();
    })(myApp);
});
