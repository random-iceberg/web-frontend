function url(path: string) {
  // return `${window.location.protocol}//${window.location.host}/api/${path}`;
  return `/api/${path}`
}

export default { url };
