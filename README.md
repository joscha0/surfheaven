# surfheaven

Alternative website for surfheaven surf servers.

## Features
- [Next.js](https://nextjs.org/) SSR
- Server side cached API requests from `surfheaven.eu/api` (see [api.js](https://github.com/joscha0/surfheaven/blob/main/services/api.js) for cache duration)
- Youtube videos collected with Youtube API
### API
- `api/mapnamefixes` - name fixes for images
- `api/mapsyt` - yt video data for maps (some videos are incorrectly assigned)

## Dev
Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Credits

Images from https://github.com/Sayt123/SurfMapPics
