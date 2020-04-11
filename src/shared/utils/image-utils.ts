export interface Ratio {
  width: number;
  height: number;
}

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 * https://stackoverflow.com/a/14731922/2047666
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): Ratio {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

/**
 * Convert size in bytes to KB, MB
 * https://stackoverflow.com/a/18650828/2047666
 * @param bytes
 */
function bytesToSize(bytes: number): string {
  var sizes = ['Bytes', 'KB', 'MB'];
  if (bytes === 0) {
    return '0 Byte';
  }
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export default {
  calculateAspectRatioFit,
  bytesToSize
};
