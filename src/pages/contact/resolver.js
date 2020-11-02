export const makeResolver = (pathname) => {
  const hashPathName = stringToHash(pathname);

  //console.log('hashPathName', hashPathName);

  const localForms = JSON.parse(localStorage.getItem('unsave_forms')) || [];
  //console.log('localForms', localForms);

  const hasResolver = getResolver(pathname, localForms);
  //console.log('hasResolver', hasResolver);

  if (hasResolver === false) {
    const newResolver = {
      pathname,
      code: hashPathName + '.' + Date.now(),
      data: {},
    };
    localStorage.setItem(
      'unsave_forms',
      JSON.stringify([...localForms, newResolver])
    );
    //console.log('newResolver', newResolver);
    return newResolver;
  }

  return hasResolver;
};

const getResolver = (pathname, localForms) => {
  if (Array.isArray(localForms)) {
    const pathnameForm = localForms.filter(
      (form) => form.pathname === pathname
    );
    return pathnameForm.length > 0 ? pathnameForm[0] : false;
  }
  return false;
};

export const clearResolver = (resolver) => {
  localStorage.setItem('unsave_forms', JSON.stringify([]));
  /*
  const localForms = JSON.parse(localStorage.getItem('unsave_forms')) || [];
  const prugeLocalsForms = localForms.filter(
    (form) =>
      form.pathname !== resolver.pathname && form.pathname !== resolver.pathname
  );
  */
};
export const updateResolver = (resolver) => {
  const localForms = JSON.parse(localStorage.getItem('unsave_forms')) || [];
  const updateLocalsForms = localForms.map((form) =>
    form.pathname === resolver.pathname && form.code === resolver.code
      ? resolver
      : form
  );
  localStorage.setItem('unsave_forms', JSON.stringify(updateLocalsForms));
};
export function stringToHash(string) {
  var hash = 0;

  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}
