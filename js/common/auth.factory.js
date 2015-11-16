(function() {
  'use strict';

  /**
   * Module factory definition
   */
  angular.module('dhtorchbearer.common')
    .factory('Auth', auth);

    /**
     * [auth returns a new instance of the AuthModel constructor, and also provides the nested AuthModel with
     * acess to the application-wide Users factory, where AuthModel will invoke a new instance of Users, and
     * use this in combination with Firebase native API authentication calls to provide controllers
     * extended user authentication capabilities]
     * @param  {[factory]} Users [Application-wide factory]
     * @return {[constructor]}       [AuthModel function constructor]
     */
  function auth(Users) {
    return new AuthModel();

    /**
     * [AuthModel is a service, shared between the controllers, which provides combined interaction with the
     * Firebase built-in API for authentication, and the extra Torchbearer specific client-side functions
     * for extended user roles. The method .authorized() should always be called first, which will will provide
     * the service with its .ref property, necessary for most other functions
     */
    function AuthModel() {
      /* jshint validthis: true */
      var vm = this;
      var users = null;
      
      /*Properties*/
      vm.ref = null;
      vm.loggedIn = false;
      vm.user = {};

      /*Methods*/
      vm.authorized = authorized;
      vm.login = login;
      vm.logout = logout;
      vm.register = register;

      /*Functions*/

      /**
       * [authorized must be called first. Copies received Firebase ref to its internal properties,
       * then creates a new instance of the Users factory as an internal variable, allowing all service
       * functions to access the full range of user factory functions. Then uses FB api to see if the client
       * is already authorized (each token is good for 24 hours.) If so, returns true, if not, returns false.
       * @param  {[object]} ref [Firebase reference object]
       * @return {[boolean]}     [State of client authentication state]
       */
      function authorized(ref) {
        vm.ref = ref;
        users = new Users(vm.ref);
        var authData = vm.ref.root().getAuth();
        if (authData) {
          getUserInfo(authData.password.email);
          return true;
        }
        return false;
      }
      /*close authorized*/

      /**
       * [login receives email and password as a credentials object to Firebase API authorization call,
       * along with the loginCB function definined within, where the received CB function is called
       * @param  {[string]} email        [User email]
       * @param  {[string]} password     [User Password]
       * @param  {[function]} signInCtrlCB [CB passed from the controller call]
       */
      function login(email, password, signInCtrlCB) {
        //Calling FB authorization with passed credentials and function below
        vm.ref.authWithPassword({
          email: email,
          password: password
        }, loginCB);

        /**
         * [loginCB calls the getUserInfo function defined below, which will retreive information about
         * the user email returned by FB in the authData object. After getUserInfo copies the full
         * user info to the Auth service property, it then calls the CB function passed to the parent
         * login function
         * @param  {[object]} error    [error object returned by FB, null if no error]
         * @param  {[object]} authData [authorization object returned by FB]
         */
        function loginCB(error, authData) {
          //If FB login was successfully, calling function to retreival full user info from DB
          if (!error) getUserInfo(authData.password.email);
          //Execute CB function passed by controller to parent login function
          signInCtrlCB(error, authData);
        }
        /*close loginCB*/
      }
      /*close login*/

      /**
       * [logout clears the Auth service user properties to their default state, then unauthorizies the client using Firebase's API
       * Finally, executes a passed CB function
       * @param  {[function]} logoutCB [passed callback function]
       */
      function logout(logoutCB) {
        vm.user = {};
        vm.loggedIn = false;
        vm.ref.unauth();
        logoutCB();
      }
      /*close logout*/
      
      /**
       * [register passes received variables as a credentials object using Firebase's authentication API.
       * Also sends a callback function which will add the same information as well as user role to torchbearer's internal user information storage.
       * Finally, logs in using the same credentials and passes a received CB function to the login function
       * @param  {[string]} email          [new user email]
       * @param  {[string]} password       [new user password]
       * @param  {[string]} role           [new user role]
       * @param  {[function]} registerCtrlCB [CB function upon registration]
       */
      function register(email, password, role, registerCtrlCB) {
        vm.ref.createUser({
          email: email,
          password: password
        }, registerCB);
        
        /**
         * [registerCB is called after the call to Firebase's .createUser() method is executed. If error is undefined (FB registration was successful),
         * the registerCB then calls the $add function for the users extended factory to add the full user information to the server data. Then this
         * calls the .login function, passing to it the callback function which the parent .register() receives from the controller call ]
         * @param  {[object]} error    [FB error object]
         * @param  {[object]} authData [FB authentication object]
         */
        function registerCB(error, authData) {
          if (!error) {
            users.$add({
              email: email,
              password: password,
              role: role
            });
            vm.login(email, password, registerCtrlCB);
          }
        }
        /*close registerCB*/
      }
      /*close register*/

      /**
       * [getUserInfo retreives full user account information from the DB and loads it into service properties.
       * @param  {[string]} email [user's email string]
       */
      function getUserInfo(email) {
        //Calls FB's $loaded function to execute CB function on async data load
        users.$loaded(onUserDataLoadCB);

        /**
         * [onUserDataLoadCB is called when FB async data load is finished. It then uses the
         * Auth service's internal Users factory instance to get the internal extended user role
         * information from the server, and the results to the service .email and .role properties,
         * as well as change the status of .loggedIn]
         */
        function onUserDataLoadCB() {
          var userInfo = users.getUser(email);
          vm.user.email = userInfo.email;
          vm.user.role = userInfo.role;
          vm.loggedIn = true;
        }
        /*close onUserDataLoadCB*/
      }
      /*close getUserInfo*/
      
    }
    /*close authFactoryCall*/

  }
  /*close auth*/


})();