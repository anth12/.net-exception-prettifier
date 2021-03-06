'use strict';

(function (window, app) {

    app.plugin = {

        init: function () {

            var body = document.getElementsByTagName('body')[0];

            if (body != null && this.isDotNetErrorPage(body)) {

                this.beutifyErrorPage(body);

            }
        },
        
        isDotNetErrorPage: function (body) {
            ///<summary>Checks to see if the current page is a .net YSOD</summary>
            ///<returns type="bool"></returns>
            
            var checks = {
                title: function () {
                    var h1 = document.getElementsByTagName('h1');
                    if(h1.length !== 1)
                        return false;

                    return h1[0].innerHTML.toLowerCase().indexOf('server error') > -1;
                },
                comment: function () {
                    var lastChildOfBody = body.childNodes[body.childNodes.length - 1];

                    return lastChildOfBody.nodeType === document.COMMENT_NODE && /\[(.*)Exception\]/.test(lastChildOfBody.nodeValue);
                }
            };

            for (var index in checks) {

                if (checks[index]())
                    return true;
            }

            return false;
        },
        
        beutifyErrorPage: function (body) {
            ///<summary>Beutifies the current page</summary>
            
            //Add top level class for targeting css
            body.className += ' beautify-exception';

            //Get plugin settings
            app.browser.getStorage('theme', 'Flatly', function (options) {
                
                //Add bootswatch reference
                var ss = document.createElement("link");
                ss.type = "text/css";
                ss.rel = "stylesheet";
                ss.href = app.browser.absoluteUrl("/css/theme-" + options.theme.toString().toLowerCase() + ".css");
                document.getElementsByTagName("head")[0].appendChild(ss);

            });

        }
    }

    //document.addEventListener('load', exceptionBeutifier.init);
    //document.addEventListener('DOMContentLoaded', exceptionBeutifier.init);

    app.plugin.init();

})(window, window.app = window.app || {});