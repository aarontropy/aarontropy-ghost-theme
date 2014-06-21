'use strict';

module.exports = exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['nodemon:dev', 'watch:dev']
            }
        },

        nodemon: {
            dev: {
                script: '../../../index.js',
                options: {
                    args: [],
                    ignore: [],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delay: 1000,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        watch: {
            dev: {
                files: ['./**/*.scss'],
                tasks: ['sass']
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/sass',
                    src: ['*.scss'],
                    dest: '../css',
                    ext: '.css'
                }]
            }
        },



        rsync: {
            options: {
                args: ["--verbose"],
                exclude: [".git*", "node_modules"],
                recursive: true
            },
            site: {
                options: {
                    src: "./",
                    dest: "aaron@aarontropy.com:/srv/www/aarontropy.com/content/themes/aarontropy",
                    ssh: true,
                    recursive: true,
                    syncDestIgnoreExcl: true
                }
            }
        }


    });





    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks("grunt-rsync")

    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('push', ['rsync:site']);


};
