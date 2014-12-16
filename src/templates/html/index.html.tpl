<!-- public/views/index.html -->
<!doctype html>
<html lang="en">
<head>
 <meta charset="UTF-8">

 <%
  var replace = function (path) {return path.replace("src/public/views/", "");};
  grunt.file.expand(css.vendor.concat(css.styles)).forEach(function (path) {
   %><link rel="stylesheet" type="text/css" href="<%- replace(path) %>"><%- "\n" %><%
  });
 %>

 <%
  grunt.file.expand(paths.vendor.concat(paths.client)).forEach(function (path) {
   %><script src='<%- replace(path) %>'></script><%- "\n" %><%
  });
 %>

 <title>12a MEAN</title>

</head>
<body data-ng-controller="application.controller.index">
 <div data-ng-view></div>
</body>
</html>