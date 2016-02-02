var gulp        = require('gulp'),
    browserSync = require('browser-sync');


gulp.task('serve', function() {
    browserSync.init({
        server: {
          baseDir: "./"
        },
        port: 8080
    });

    gulp.watch("./**/*").on('change', browserSync.reload);
    gulp.watch("./views/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
