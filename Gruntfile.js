module.exports = function (grunt) {
    'use strict';

    var paths = {
            vendor: [
                'src/public/views/vendor/jquery/jquery.js',
                'src/public/views/vendor/angular/angular.js',
                'src/public/views/vendor/lodash/lodash.compat.js',
                'src/public/views/vendor/*/*.js',
                '!src/public/views/vendor/angular-mocks/angular-mocks.js',
                'src/public/views/vendor/bootstrap/bootstrap.js'
            ],

            scripts: [
                'src/public_html/modules.js',          // QH module definitions.
                'src/public_html/module/fusepump/fusepump.js', // Fusepump lib.
                'src/public_html/module/**/module.js', // Module.js files.
                'src/public_html/module/**/*.js',      // Other source files.
                'src/public_html/angular.bootstrap.run.js' // Bootstrap.
            ],
            client: [
                'src/public/views/modules/NGModule.js',
                'src/public/views/index.js',
                'src/public/views/modules/**/module.js',
                'src/public/views/modules/**/*.js'
            ],
            module: [ 'src/module/**/*.js' ],
            other: [
                'src/templates/image-generator/**/*.js',
                'server.js'
            ],

            helpers: [ 'src/public/views/vendor/angular-mocks/*.js' ],
            specsClient: grunt.file.expand('specs/client/**/*.js'),
            specsServer: grunt.file.expand('specs/server/**/*.js')
        },

        css = {
            vendor: [ 'src/public/views/vendor/**/*.css' ],
            styles: [ 'src/public/views/modules/**/*.css' ]
        },

        banner = '/* TBE */\n'
            + '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        version = (function () {
            var build = process.env.BUILD_NUMBER;
            return build ? '?v=' + build : '';
        }());

    paths.server = paths.module.concat(paths.other);
    paths.specs = paths.specsClient.concat(paths.specsServer);

    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: './src/public/views/vendor',
                    verbose: true,
                    layout: function (type, component, source) {
                        /*
                         * Make sure bootstrap CSS and fonts appear in correct
                         * directories relative to each other.
                         */
                        if (component === 'bootstrap') {
                            if (source.match('bootstrap.css')) {
                                return require('path').join(component, 'css');
                            }
                            if (source.match('glyphicons-halflings-regular')) {
                                return require('path').join(component, 'fonts');
                            }
                            return component;
                        }
                        return component;
                    }
                }
            }
        },

        jslint: {
            grunt: {
                src: [ 'Gruntfile.js' ],
                directives: {
                    unparam: true,
                    maxlen: 80,
                    predef: [ 'module', 'require', 'process' ]
                }
            },
            client: {
                src: paths.client,
                directives: {
                    predef: [
                        '$',
                        'angular',
                        'document',
                        'jQuery',
                        'ngModules',
                        'NGModuleCollection'
                    ]
                },
                options: { checkstyle: 'build/logs/checkstyle.xml' }
            },
            server: {
                src: paths.other,
                directives: {
                    unparam: true,
                    maxlen: 80,
                    predef: [ 'module', 'require', 'process' ]
                }
            },
            module: {
                src: paths.module,
                directives: {
                    unparam: true,
                    maxlen: 80,
                    predef: [ 'module', 'require', 'process', 'console' ]
                }
            },
            specs: {
                src: paths.specs,
                directives: {
                    predef: [
                        'afterEach',
                        'angular',
                        'beforeEach',
                        'describe',
                        'expect',
                        'it',
                        'inject',
                        'jasmine',
                        'module',
                        'require'
                    ]
                }
            }
        },

        jsdoc: {
            dist: {
                src: 'src/public_html/module/**/*.js',
                options: {
                    destination: 'build/documentation'
                }
            }
        },

        template: {
            dev: {
                options: {
                    data: { paths: paths, css: css, expand: true }
                },
                files: {
                    'src/public/views/index.html':
                        'src/templates/html/index.html.tpl'
                }
            },
            build: {
                options: {
                    data: {
                        paths: {
                            vendor:  'js/vendor.min.js'  + version,
                            scripts: 'js/scripts.min.js' + version
                        },
                        css: {
                            vendor: 'css/vendor.min.css' + version,
                            styles: 'css/styles.min.css' + version
                        },
                        expand: false
                    }
                },
                files: {
                    'build/public_html/index.html':
                        'src/public_html/index.html.tpl'
                }
            }
        },

        eol: {
            options: { replace: true },
            dev: {
                src: [
                    'src/public_html/index.html',
                    'src/public_html/modules.js'
                ]
            },
            build: {
                src: [
                    'build/public_html/index.html'
                ]
            }
        },

        jasmine: {
            options: {
                specs:   paths.specsClient,
                vendor:  paths.vendor,
                helpers: paths.helpers
            },
            test: {
                src: paths.client,
                options: {
                    outfile:    'specs/index.html',
                    keepRunner: true,
                    junit:      { path:  'build/logs/junit' }
                }
            },
            coverage: {
                src: paths.client,
                options: {
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'build/logs/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: { dir: 'build/coverage/' }
                            },
                            {
                                type: 'cobertura',
                                options: { dir: 'build/logs/' }
                            },
                            {
                                type: 'text-summary'
                            }
                        ]
                    },
                    display: 'none',
                    summary: true
                }
            }
        },
        jasmine_node: {
            options: {
                matchall: true, // load only specs containing specNameMatcher
                forceExit: true,
                jUnit: {
                    report: false,
                    savePath : "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['specs/server/']
        },

        uglify: {
            vendor: {
                files: { 'build/public_html/js/vendor.min.js': paths.vendor }
            },
            scripts: {
                options: { banner: banner },
                files: { 'build/public_html/js/scripts.min.js': paths.scripts }
            }
        },

        cssmin: {
            vendor: {
                files: { 'build/public_html/css/vendor.min.css': css.vendor }
            },
            styles: {
                options: { banner: banner },
                files: { 'build/public_html/css/styles.min.css': css.styles }
            }
        },

        htmlmin: {
            options: {
                removeComments:       true,
                collapseWhitespace:   true,
                conservativeCollapse: true,
                preserveLineBreaks:   true
            },
            build: {
                files: [ {
                    expand: true,
                    cwd:    'src/public_html/module/',
                    src:    '**/partial/**/*.html',
                    dest:   'build/public_html/module/'
                } ]
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd:    'src/public_html/module/',
                        src:    '**/img/**/*',
                        dest:   'build/public_html/module/'
                    },
                    {
                        expand: true,
                        cwd:    'src/public_html/vendor/bootstrap/fonts/',
                        src:    '*',
                        dest:   'build/public_html/fonts/'
                    }
                ]
            }
        },

        execute: {
            images: {
                src: ['./src/templates/image-generator/generator.js']
            }
        },
        watch: {
            bower: {
                files: [ 'bower.json' ],
                tasks: [ 'bower' ]
            },
            gruntfile: {
                files: [ 'Gruntfile.js' ],
                tasks: [ 'jslint:grunt' ]
            },
            client: {
                files: [ ]
                    .concat(paths.client)
                    .concat(paths.specsClient),
                tasks: [ 'template:dev', 'jasmine', 'jslint:client' ]
            },
            server: {
                files: [
                    'server.js'
                ],
                tasks: [ 'jasmine_node', 'jslint:server' ]
            },
            module: {
                files: [ 'src/module/**/*.js' ],
                tasks: [ 'jasmine_node', 'jslint:module' ]
            },
            specs: {
                files: paths.specsServer,
                tasks: [ 'jasmine_node', 'jslint:specs' ]
            },
            generator: {
                files: [
                    './src/templates/image-generator/generator.js',
                    './src/templates/image-generator/src/*.js',
                    './src/templates/image-generator/generator/**.js'
                ],
                tasks: [
                    'execute:images',
                    'jslint:server'
                ]
            }
        },

        clean: {
            dev: [
                '.grunt/',
                'build/',
                'specs/test.html',
                'src/public_html/index.html',
                'src/public_html/modules.js'
            ],
            build: [
                'build/public_html/'
            ],
            extra: [
                'bower_components/',
                'src/public_html/vendor'
            ],
            junit: [ 'build/logs/junit/' ]
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-eol');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-template');

    // Default task
    grunt.registerTask('default', [ 'build' ]);

    grunt.registerTask('build', [
        'bower',       // Install dependencies with bower
        'template',    // Populate templates with lists of source files
        'eol',         // Standardise on LF (Unix) line endings
        'clean:junit', // Clean up old test results
        'jasmine_node',// Run server unit tests with Jasmine
        'jasmine',     // Run client unit tests with Jasmine
        'jslint',      // Check code with JSLint
        'uglify',      // Concatenate and minify code
        'cssmin',      // Concatenate and minify styles
        'htmlmin',     // Copy and minify partials
        'copy'         // Copy images and fonts
    ]);
};
