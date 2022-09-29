class UserDTO {
  constructor(user) {
      this.email = user.email;
      this.id = user._id || user.id;
      this.password = user.password;
  }
}

module.exports = UserDTO;