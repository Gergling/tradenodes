angular.module("<%= name %>", [<%=
    (required.length > 0 ? '"' + required.join('",\n\t"') + '"' : "")
%>]);
