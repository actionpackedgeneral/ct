class UserProfile {
  constructor(employeeID, APIUsername, APIPassword, p1, p2, p3) {
    this.employeeID = employeeID;
    this.APIUsername = APIUsername;
    this.APIPassword = APIPassword;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }
}
module.exports.UserProfile = UserProfile;
