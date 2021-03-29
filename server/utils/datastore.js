const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

module.exports = {
  /**
   * Stores a new user object into datastore
   * @param {string} email
   * @param {object} data
   */
  register: async (email, data) => {
    await datastore.save({ key: datastore.key(["User", email]), data: data });
    console.out(`New user ${email} has logged into our application`);
  },
  /**
   * Retrieves user data from db based on email
   * @param {string} email
   */
  getUser: (email) => {
    return new Promise(async (resolve, reject) => {
      const user = await datastore.runQuery(
        datastore.createQuery("User").filter("email", email)
      );
      resolve(user);
    });
  },
  /**
   * Returns a boolean value specifying if the user exists or not
   * @param {string} email
   */
  userExists: (email) => {
    return new Promise(async (resolve, reject) => {
      const user = await datastore.runQuery(
        datastore.createQuery("User").filter("email", email)
      );
      if (user[0].length !== 0) resolve(true);
      else resolve(false);
    });
  },
  /**
   * Returns a list of users
   */
  getUsers: () => {
    return new Promise(async (resolve, reject) => {
      const user = await datastore.runQuery(datastore.createQuery("User"));
      resolve(user);
    });
  },

  /**
   * Stores a calendar inside datastore
   * @param {string} email
   * @param {object} calendar
   */
  storeCalendar: async (email, calendar) => {
    calendar.email = email;
    await datastore.save({
      key: datastore.key(["Calendar", email]),
      data: calendar,
    });
    console.out(`Calendar entry for ${email} stored !`)
  },
  /**
   * Returns the calendar of an user
   * @param {string} email
   */
  getCalendar: (email) => {
    return new Promise(async (resolve, reject) => {
      const user = await datastore.runQuery(
        datastore.createQuery("Calendar").filter("email", email)
      );
      resolve(user);
    });
  }
};
