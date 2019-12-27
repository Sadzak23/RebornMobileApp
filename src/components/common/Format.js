export const add0 = (num) => ("0" + num).slice(-2);
export const formatSeconds = (seconds) => {
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${add0(minutes)}:${add0(seconds)}`;
  }
  else {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return `${add0(hours)}:${add0(minutes)}:${add0(seconds)}`;
  }
};

export const formatDateEU = (timestamp) => {
  const day = new Date(timestamp).getDate()
  const month = new Date(timestamp).getMonth() + 1
  const year = new Date(timestamp).getFullYear()
  return `${day}.${month}.${year}.`
}

export const resizeGooglePhoto = (url, size) => url.split('=')[0]+`=s${size}`