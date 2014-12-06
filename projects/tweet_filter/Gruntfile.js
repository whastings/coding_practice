module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    uglify: {
      build: {
        files: {
          'build/bookmarklet.js': ['tweet_filter.js', 'filter_ui.js']
        }
      }
    },
    concat: {
      options: {
        separator: ''
      },
      build: {
        src: ['bookmarklet_start', 'build/bookmarklet.js', 'bookmarklet_end'],
        dest: 'build/bookmarklet.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build', ['uglify:build', 'concat:build']);
};
