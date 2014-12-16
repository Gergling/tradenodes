12a-mean Installation
=====================

Download and install nodejs.

Run:

    make
    grunt
    mongo
    node server.js

'make' runs 'npm install'.
'grunt' runs the bower downloads and builds the templates. This should be done when there are new files or bower packages.
'mongo' is the windows runner for mongo. You would have to find a different way to run this in Ubuntu. Best open a spare terminal (and let me know what you had to run).
'node server.js' runs the server side.

Browse to http://localhost:8080/.

Windows
-------

Windows developers will require msysgit (http://msysgit.github.io/) to run grunt and bower.
