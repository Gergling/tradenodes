angular.module("<%= name %>", [<%=
    (required.length > 0 ? '\n\t"' + required.join('",\n\t"') + '"\n' : "")
%>]);
