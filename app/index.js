'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the supreme' + chalk.red('Susicomponent') + ' generator!'
    ));

    var prompts = [{
      name: 'componentName',
      message: 'Name of component:'
    },{
      name: 'susiIncludes',
      message: 'Susi include directory:',
      default: '~/Code/susi/Core/src/headers'
    }];

    this.prompt(prompts, function (props) {
      this.componentName = props.componentName;
      this.susiIncludes = props.susiIncludes;
      done();
    }.bind(this));
  },

  writing: {
    folders: function() {
      this.mkdir('sources');
      this.mkdir('headers');
    },
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_header.h'),
        this.destinationPath('headers/'+this.componentName+'.h'), 
        {name: this.componentName}
      );
      this.fs.copyTpl(
        this.templatePath('_source.cpp'),
        this.destinationPath('sources/'+this.componentName+'.cpp'), 
        {name: this.componentName}
      );
      this.fs.copyTpl(
        this.templatePath('_CMakeLists.txt'),
        this.destinationPath('CMakeLists.txt'), 
        {name: this.componentName, susiIncludes: this.susiIncludes}
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
