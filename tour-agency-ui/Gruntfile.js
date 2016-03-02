// Generated on 2014-05-27 using generator-angular 0.8.0
'use strict';

var modRewrite = require('connect-modrewrite');

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    // NG Constant
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '\'use strict\';\n\n{%= __ngModule %}',
        name: 'taConfig'
      },

      // Environment targets
      development: {
        options: {
          dest: '<%= yeoman.src %>/scripts/ta-config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: '/api'
          }
        }
      },
      production: {
        options: {
          dest: '<%= yeoman.dist %>/scripts/ta-config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.livesite.com'
          }
        }
      }
    },

    // Project settings
    yeoman: {
      'public': 'public',
      'dist': 'dist',
      //'feefoWidget': 'public/feefo-widget',
      // feefoComponents: 'feefo_components'
      'src': 'public'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      // js: {
      //   files: ['<%= yeoman.src %>/scripts/**/*.js', '!<%= yeoman.src %>/scripts/templates.js'],
      //   tasks: ['newer:jshint:all']
      // },
      html: {
        files: ['<%= yeoman.src %>/views/**/*.html'],
        tasks: ['ngtemplates']
      },
      // jsTest: {
      //   files: ['test/spec/**/*.js'],
      //   tasks: ['newer:jshint:test', 'karma']
      // },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= yeoman.src %>/css/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      includeSource: {
        // Watch for added and deleted scripts to update index.html
        files: '<%= yeoman.src %>/scripts/**/*.js',
        tasks: ['includeSource'],
        options: {
          event: ['added', 'deleted']
        }
      }
    },

    includeSource: {
      // Task to include files into index.html
      options: {
        basePath: '<%= yeoman.src %>',
        baseUrl: ''
      },
      app: {
        files: {
          '<%= yeoman.public %>/index.html': '<%= yeoman.public %>/index.html'
          // you can add karma config as well here if want inject to karma as well
        }
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 8002,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      test: {
        options: {
          port: 8003,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.public %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      },
      server: {
        options: {
          port: 8002,
          hostname: 'localhost'
        },
      },
      proxies: [
        {
          context: '/api',
          host: 'localhost',
          port: 8080,
          changeOrigin: true,
          rewrite: {
            '^/api': '',
          }
        }
      ],
      dev: {
        options: {
          middleware: function (connect) {
            return [
	      connect().use(function (req, res, next) {
		var url = require('url');
		if (url.parse(req.url).pathname.match(/ta-widget\/fonts/)) {
		    res.setHeader('Access-Control-Allow-Origin', '*');
		    res.setHeader('Access-Control-Allow-Methods', 'GET');
		}
  		next();
              }),
              modRewrite(['!\\.?(js|css|html|eot|svg|ttf|woff|otf|css|png|jpg|gif|ico|/api) / [L]']),
              require('grunt-connect-proxy/lib/utils').proxyRequest,
	      //connect.static(require('path').resolve('feefo-widget')),
              connect.static(require('path').resolve('public')),
              connect.static(require('path').resolve('src')),
              connect.static(require('path').resolve('.tmp'))
            ];
          }
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.src %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['<%= yeoman.public %>/index.html'],
        ignorePath: '<%= yeoman.public %>/',
        exclude: [
          '<%= yeoman.public %>/bower_components/es5-shim/',
          '<%= yeoman.public %>/bower_components/json3/',
          '<%= yeoman.public %>/bower_components/jquery/'
        ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            //'<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Uglify options
    uglify: {
      options: {
        mangle: false,
        compress: false
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.public %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/**/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        //root: '<%= yeoman.public %>'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.public %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/img'
        },
		{
          expand: true,
          cwd: '<%= yeoman.public %>/assets',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/assets'
        },
		{
          expand: true,
          cwd: '<%= yeoman.public %>/media',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/media'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.public %>/img',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: false,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/**/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    //cdnify: {
    //  dist: {
    //    html: ['<%= yeoman.dist %>/*.html']
    //  }
    //},

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        // Root Files
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.public %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'images/{,*/}*.{webp}',
              'fonts/*',
              'css/fonts/*'
            ]
          },

          // Views
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.src %>',
            dest: '<%= yeoman.dist %>',
            src: ['views/{,*/**/}*.html']
          },

          // Images
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/img',
            src: ['generated/*']
          },

          // JSON
          {
            dest: '<%= yeoman.dist %>/json/',
            cwd: '<%= yeoman.public %>/json',
            expand: true, // needed for cwd
            src: '*'
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.public %>/css',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      fontAwesome: {
        expand: true,
        flatten: true,
        cwd: '<%= yeoman.public %>',
        dest: '<%= yeoman.dist %>/fonts/',
        src: ['bower_components/font-awesome/fonts/*']
      },
   //    feefoWidget: {
	// expand: true,
   //      cwd: '<%= yeoman.feefoWidget %>',
   //      dest: '<%= yeoman.dist %>/feefo-widget/',
   //      src: ['**/*.*']
   //    }

      //feefoComponents: {
      //  expand: true,
      //  cwd: '<%= yeoman.public%>',
      //  dest: '<%= yeoman.public %>/views/feefo_components/',
      //  src: '{,*/}*.html'
      //}
    },

    //less: {
    //  development: {
    //    options: {
    //      paths: ["./styles"],
    //      yuicompress: true
    //    },
    //    files: {
    //      "./public/css/feefo-components.css": [
    //        "./feefo_components/media_modal/{,*/}*.less"
    //      ]
    //    }
    //  }
    //},

    //ngtemplates: {
    //  development: {
    //    options: {
    //      standalone: true,
    //      module: 'templates'
    //    },
    //    cwd: '<%= yeoman.public %>',
    //    src: 'views/**/*.html',
    //    dest: '<%= yeoman.src %>/scripts/templates.js'
    //  }
    //},

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js',
        keepAlive: true,
        noColor: false,
        args: {}
      },
      all: {
        options: {
          configFile: 'protractor.conf.js',
          args: {}
        }
      }
    }
  });

  // Register LESS compiler
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //grunt.loadNpmTasks('grunt-include-bootstrap');

  // Register Protractor runner
  grunt.loadNpmTasks('grunt-protractor-runner');
  
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      //'ngtemplates',
      'clean:server',
      'ngconstant:development',
      'bowerInstall',
      'includeSource',
      // 'less',
      'configureProxies:server',
      'concurrent:server',
      'autoprefixer',
      'connect:dev',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma',
    'protractor'
  ]);

  grunt.registerTask('build', [
    //'ngtemplates',
    'clean:dist',
    'bowerInstall',
    'includeSource',
    // 'less',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'copy:fontAwesome',
    //'copy:feefoComponents',
    // 'copy:feefoWidget',
    //'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('lint', [
    'newer:jshint',
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

};
