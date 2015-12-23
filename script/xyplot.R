# Author: Denis Petrov
# petrovdenis [at] gmail [dot] com
# Date: 2015-07-07

webdir <- Sys.getenv('R_WEB_DIR')
f.name.out <- file.path(webdir, 'xyplot.png')

x <- rnorm(100)
y <- rnorm(100)

png(f.name.out)

plot(x, y)

dev.off()