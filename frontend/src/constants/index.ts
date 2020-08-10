export const BASE_URL = 'http://localhost:3100'

interface IResolutions {
  [x:number]: {title: string, dimensions: string, quality: string }
}
export const Resolutions: IResolutions = {
  1080: { title: '1080P', dimensions: '1920x1080', quality: '1080' },
  720: { title: '720P', dimensions: '1280x720', quality: '720' },
  480: { title: '480P', dimensions: '858x480', quality: '480' },
  360: { title: '360P', dimensions: '480x360', quality: '360' },
  240: { title: '240P', dimensions: '352x240', quality: '240' },
}
