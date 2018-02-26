'use strict';

var through2 = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var exec = require('child_process').exec;

var PLUGIN_NAME = 'gulp-exec';

function doExec(command, opt){
	if (!command) {
		throw new Error('command is blank');
	}

	if (!opt) {
		opt = {};
	}

	if (!opt.env) {
		opt.env = process.env;
	}

	// Include node_modules/.bin on the path when we execute the command.
	var oldPath = opt.env.PATH;
	var newPath = path.join(__dirname, '..', '..', '.bin');
	newPath += path.delimiter;
	newPath += oldPath;
	opt.env.PATH = newPath;

	return through2.obj(function (file, enc, cb){
		var cmd = gutil.template(command, {file: file, options: opt});
		var that = this;

		exec(cmd, opt, function (err, stdout, stderr) {
			file.exec = {
				err: err,
				stdout: stdout.trim(),
				stderr: stderr.trim()
			};
			if (opt.pipeStdout) {
				file.exec.contents = file.contents;
				file.contents = new Buffer(stdout); // FRAGILE: if it wasn't a buffer it is now
			}
			if (err && !opt.continueOnError) {
				that.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
			}
			that.push(file);
			cb();
		});
	});
}

function reporter(opt){
	if (!opt) {
		opt = {};
	}

	if (typeof opt.err === 'undefined') {
		opt.err = true;
	}
	if (typeof opt.stderr === 'undefined') {
		opt.stderr = true;
	}
	if (typeof opt.stdout === 'undefined') {
		opt.stdout = true;
	}

	return through2.obj(function (file, enc, cb){
		if (file && file.exec) {
			var e = file.exec;
			if (e.stdout && opt.stdout) {
				gutil.log(e.stdout);
			}
			if (e.stderr && opt.stderr) {
				gutil.log(e.stderr);
			}
			if (e.err && opt.err) {
				gutil.log(e.err);
			}
		}

		this.push(file);
		cb();
	});
}

module.exports = doExec;
module.exports.reporter = reporter;
