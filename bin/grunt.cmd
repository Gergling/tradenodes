@IF EXIST "%~dp0\..\node_modules\.bin\grunt.cmd" (
  "%~dp0\..\node_modules\.bin\grunt.cmd" %*
) ELSE (
  echo Please run 'npm install' first.
)
