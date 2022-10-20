export const isRoute = (route) => {
  return typeof route === 'string' && route.indexOf('/') === 0;
};

export const useRoute = (route) => {
  return (path) => {
    if (!isRoute(route) && !isRoute(path)) return '/';
    if (!isRoute(route)) return path;
    return path ? `${route}${path}` : route;
  };
};
