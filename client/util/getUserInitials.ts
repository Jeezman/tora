export const getUserInitials = (name: string) => {
  if (!name) return ''
  
  const initials_arr = name.trim().split(' ');
  if (initials_arr.length > 1 && initials_arr[1] != '') {
    return `${initials_arr[0][0]}${initials_arr[1][0]}`;
  }
  return initials_arr[0][0];
};
