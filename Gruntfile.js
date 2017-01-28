module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },
    concat: {
      dist: {
        src: ['less/less_parts/*.less'],
        dest: 'less/style.less',
      }

    },
    watch: {
      less: {
            files: ['less/less_parts/*.less'],
            tasks: ['concat','less', 'autoprefixer'],
            options: {
              spawn: false
            }
      }
    },
    browserSync: {
      dev: {
          bsFiles: {
              src : [
                  'css/style.css',
                  '*.html',
              ]
          },
          options: {
              watchTask: true,
              server: './'
          }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 5 versions', 'ie 8', 'ie 9', 'ie 10', 'ie 11']
      },
      target: {
        src : ['css/style.css']
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);

};