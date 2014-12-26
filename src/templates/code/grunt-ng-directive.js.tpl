angular.module("<%= module %>").directive("<%= camelName %>", function () {
    "use strict";

    return {
        scope: { },
        templateUrl: "modules/<%= module %>/partial/directive-<%= name %>.html"
    };
});
