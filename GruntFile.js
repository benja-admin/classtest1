var request = require('request');

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserSync: {
            bsFiles: {
                src: ['./resources/build/*.html', './resources/build/css/**/*.css', './resources/build/js/**/*.js', './resources/build/img/**/*.gif', './resources/build/img/**/*.png', './resources/build/img/**/*.jpg']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./resources/build"
                }
            }
        },


        concat: {
            js: {
                src: ['resources/assets/js/plugins/*.js', 'resources/assets/js/main.js'],
                dest: 'resources/build/js/scripts.js',
            },
            css: {
                src: ['resources/assets/css/**/*.css'],
                dest: 'resources/build/css/style.css',
            }
        },

        uglify: {
            js: {
                src: ['resources/build/js/scripts.js'],
                dest: 'resources/build/script.min.js',

            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed' // Can be nested, compact, compressed, expanded.
                },
                files: [{
                    expand: true, // Recursive Output style.
                    cwd: "resources/assets/sass/", // The startup directory
                    src: ["**/*.scss"], // Source files
                    dest: "resources/build/css/", // Destination
                    ext: ".css" // File extension
                }]
            }
        },

        watch: {

            js: {
                files: ['resources/assets/js/**/*.js'],
                tasks: ['concat', 'uglify']
            },
            sass: {
                files: 'resources/assets/sass/**/*.{css,scss,sass}',
                tasks: ['sass']
            }

        }
    });
    //grunt.registerTask('watch', ['concat', 'uglify', 'watch']);
    grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
}
