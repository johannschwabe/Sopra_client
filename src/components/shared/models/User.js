/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.birthday = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.creationdate=null;
    this.games = null;
    this.moves = null;
    Object.assign(this, data);
  }
}
export default User;
