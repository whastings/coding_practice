module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    coffee: {
      build: {
        expand: true,
        ext: '.js',
        flatten: true,
        src: ['coffee/**/*.coffee'],
        dest: 'js'
      }
    },
    watch: {
      build: {
        files: ['coffee/**/*.coffee'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch:build']);
  grunt.registerTask('build', ['coffee:build']);
};
