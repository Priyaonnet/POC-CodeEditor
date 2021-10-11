
//var reload = require('auto-reload');
async function execute(code){
    //await delete require.cache['/custom/custom']
    delete require.cache[require.resolve('./custom/custom.js')]

    eval(`var customJs = require('./custom/custom.js'); var b = customJs.${code};`);
    var data = eval(`(function (){
                            var customJs = require('./custom/custom.js'); 
                            var b = customJs.${code}; 
                            return b
                        })()`);

    // var customJs = await reload("./custom/custom.js");
    // var test = new Function(" var b = customJs.add(2,2); return b;", customJs)();
    // code = "var aa = require('./custom/custom.js'); var b = aa.add(2,2); return b;";
    // var F = new Function(code);  
    // var data = F();
    return data;
}


module.exports = { execute };