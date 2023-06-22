const { HTTP } = require("../HTTPs");

class AuthApis {
  getLogin(requestLogin) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/login/getlogin`, requestLogin)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  refreshToken(tokenModel) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/login/refresh`, tokenModel)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  signIn(newAccount) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/login/signin`, newAccount)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  confirmAccount(code) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/login/confirmemail?code=` + code)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  forgetPass(forgetRequest) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/login/forgetpass`, forgetRequest)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  confirmCode(code) {
    return new Promise((resolve, reject) => {
      HTTP.get(`login/confirmcodeforgetpass?code=${code}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  confirmPass(request) {
    return new Promise((resolve, reject) => {
      HTTP.post(`login/confirmpass`, request)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = new AuthApis();
