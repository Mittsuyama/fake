export const jumpInMpa = (pathname: string) => {
  location.href = `//${location.hostname}${location.port ? `:${location.port}` : ''}${pathname}`;
};
