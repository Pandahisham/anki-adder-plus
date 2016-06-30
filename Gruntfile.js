module.exports = function (grunt) {
    "use strict";

    //TODO: clean dirs & zip before build

    grunt.initConfig({
        ts: {
            options: {
                sourceMap: false,
                removeComments: true,
                fast: 'never',
                failOnTypeErrors: false
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
                            "js/*.js",
                            "images/**",
                            "dist/js/*.js",
                            "popup.html",
                            "options.html"],
                        cwd: "app/",
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
                    {expand: true, cwd: 'build/', src: '**'}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask("default", [
        "ts",
        "copy"
    ]);

    grunt.registerTask("release", [
        "ts",
        "copy",
        "compress"
    ]);

    grunt.registerTask('build', [
        //    'karma',
        'ts',
        'copy',
        'compress'
    ]);
};