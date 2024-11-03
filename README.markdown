## Stream-bounce

An edge bouncing floating image, intended to be used as a web source in an OBS overlay.

## first

`npm run build` will build the structure page and code (and copy the images) into a `dist/` folder ready to be served.

## images

Images from `./images` will be copied as part of the build. Images are loaded via a `<img>` tag, so unbounded SVGs are not supported.

They can also be updated with `npm run images`, and you dont need to rebuild the code, only refresh the page.

Note: for filenames that are the same, the running page will eventually fetch them again, loading the new version, but the roster of images is NOT live refreshed (only on first load), so it is best to refesh the page (obs source) if doing this image reload.

