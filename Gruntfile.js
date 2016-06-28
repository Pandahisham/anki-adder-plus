module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            options: {
                sourceMap: false,
                removeComments: true
            },
            default: {
                src: ["app/src/app/*.ts"],
                outDir: "app/dist/js"
            }
        },
        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        src: ["manifest.json",
                            "_locales/**",
                            "css/*.css",
                            "dist/js/*.js",
                            "popup.html",
                            "options.html"],
                        cwd: "app/",
                        dest: "build/"
                    },
                    {
                        expand: true,
                        src: "app/images/*",
                        dest: "build/"
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'anki-adder-plus.zip',
                    mode: 'zip'
                },
                files: [
                    { expand: true, cwd: 'build/', src: '**' }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask("default", ["ts", "copy"]);
    grunt.registerTask("release", ["ts", "copy", "compress"]);
};