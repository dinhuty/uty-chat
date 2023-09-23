
const validate = (data) => {
  const errors = {};
  // validate Name
  if (!data.firstName.trim() || !data.lastName.trim()) {
    errors.name = "Nhập tên của bạn";
  } else {
    delete errors.name;
  }

  // validate Adress
  if (!data.address.trim()) {
    errors.address = "Nhập địa chỉ";
  } else {
    delete errors.address;
  }
  // validate Email
  if (!data.email) {
    errors.email = "Nhập email của bạn";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Sai định dạng email";
  } else {
    delete errors.email;
  }

  // validate password
  if (!data.password) {
    errors.password = "Nhập mật khẩu";
  } else if (data.password.length < 8) {
    errors.password = "Mật khẩu cần ít nhất 8 ký tự";
  }
  else if (!data.password.match(/[A-Z]/)) {
    errors.password = "Mật khẩu phải có ít nhất 1 chữ cái viết hoa";
  }
  else if (!data.password.match(/[0-9]/)) {
    errors.password = "Mật khẩu phải có ít nhất 1 số";
  }
  else if (!data.password.match(/[!@#$%^&?*]/)) {
    errors.password = "Mật khẩu phải có ít nhất 1 kí tự đặc biệt";
  } else {
    delete errors.password;
  }

  return errors;
};
export default validate