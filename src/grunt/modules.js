module.exports = function (grunt) {
    var camel = require("to-camel-case"),
        generateModule = function (name, required) {
            var folder = "./src/public/views/modules/" + name;

            if (grunt.file.exists(folder + "/module.js")) {
                // If module folder exists, do NOT overwrite it.
                throw new Error("Module already exists: " + name);
            } else {
                grunt.config("template.module", {
                    options: {
                        data: { name: name, required: required }
                    },
                    files: (function () {
                        var ret = { };
                        ret['src/public/views/modules/' + name + '/module.js'] =
                            'src/templates/code/grunt-ng-module.js.tpl';
                        return ret;
                    }())
                });
                grunt.task.run("template:module");
            }
        },
        generateComponent = function (module, type, name) {
            // If file exists with component name, do nothing and generate an error
            var valid = [
                    "class",
                    "controller",
                    "directive",
                    "factory",
                    "service"
                ],
                fileName = name,
                file,
                fnc = type;

            if (valid.indexOf(type) < 0) {
                throw new Error("Invalid component type: " + type);
            } else if (type === "class") {
                fileName = name.charAt(0).toUpperCase() + camel(name.slice(1));
                name = fileName;
                fnc = "factory";
            }

            file = [
                "src/public/views/modules",
                module,
                type,
                fileName + ".js"
            ].join("/");

            if (grunt.file.exists(file)) {
                throw new Error("Component already exists: " + [
                    module,
                    type,
                    name
                ].join("."));
            } else {
                grunt.config("template.component", {
                    options: {
                        data: {
                            name: name,
                            type: type,
                            module: module,
                            fnc: fnc,
                            camelName: camel(name)
                        }
                    },
                    files: (function () {
                        var ret = { };
                        switch(type) {
                        case "directive":
                            ret[file] = 'src/templates/code/grunt-ng-directive.js.tpl';
                            break;
                        case "class":
                            ret[file] = 'src/templates/code/grunt-ng-class.js.tpl';
                            break;
                        default:
                            ret[file] = 'src/templates/code/grunt-ng-component.js.tpl';
                        }
                        return ret;
                    }())
                });
                grunt.task.run("template:component");
            }
        };

    grunt.registerTask("generate",
        "Generate angular components",
        function (module, b, component) {
            var required;
            if (component) {
                grunt.log.writeln("Creating a " + b + " component for module '" + module + "' named '" + component +"'");
                generateComponent(module, b, component);
            } else {
                grunt.log.writeln("Creating a module '" + module + "' requiring '" + b +"'");
                if (b) {
                    required = b.split(",");
                } else {
                    required = [ ];
                }
                generateModule(module, required);
            }
            grunt.task.run("template:dev");
        }
    );
};
