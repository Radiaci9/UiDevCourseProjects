export const formatPath = (path) => {
  

  return path.replaceAll(new RegExp(/[/]+/ig), '/');
}
