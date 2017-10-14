// copy ncmb.min.js to www/js/
module.exports = function (ctx) {
  var fs = ctx.requireCordovaModule('fs');
  var path = ctx.requireCordovaModule('path');

  var srcfile = path.join(ctx.opts.projectRoot, "node_modules/ncmb/ncmb.min.js");
  var destfile = path.join(ctx.opts.projectRoot, "platforms/android/assets/www/js/ncmb.min.js");
  if (fs.existsSync(srcfile) && fs.existsSync(path.dirname(destfile))) {
    fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
  }
}
