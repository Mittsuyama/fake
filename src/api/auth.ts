export const fetchCheckIsCodeUsable = async (token: string) => {
  return await new Promise((res) => {
    if (/^FAKE[0-9]{2}$/.test(token)) {
      setTimeout(() => res(true), 500);
    } else {
      setTimeout(() => res(false), 500);
    }
  });
};
