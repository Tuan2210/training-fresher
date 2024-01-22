export const FULLNAME_REGEX = /^[a-zA-Z\s]+$/u;
// export const PHONENUMBER_REGEX = /^\\+?[1-9][0-9]{7,14}$/;
export const PHONENUMBER_REGEX = /^\+?[1-9][0-9]{7,14}$/;
export const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
export const ADDRESS_REGEX = /^[a-zA-Z0-9\s/-]+$/;
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,50}$/;
//   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,50}$/;
