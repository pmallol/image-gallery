## Image Gallery
An image gallery using next and React.js.

Images provided by [Unsplash](https://unsplash.com/).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Runs in production
```
npm run start
```

### Add your own apiKey
Make sure to sign up to Unsplash and get your own api key. Then, open the `.env` file and add your UNSPLASH_ACCESS_KEY like this:

```
UNSPLASH_ACCESS_KEY=""
```

### Future improvements:

- Update the url whenever the user clicks on a pagination button or next/prev image button inside lightbox.
- Add a nice loading indicator when fetching images.
- Make the `Share` button inside lightbox share the gallery url instead of image url.
- Images flicker when loading.
- Animated transitions.
- Custom Lightbox.
- Separate gallery and image preview into their own components.
