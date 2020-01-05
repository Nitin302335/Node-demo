var UserService = require('../../Service/userService');
var UserController = require('../../Controller/userController');
var router = require('express').Router()

router.post('/',
  UserService.createStudent,
  UserController.appNewUser,
  UserService.error
);

router.post('/login',
  UserService.validateRequest,
  UserService.login,
  UserService.reGenerateSession,
  UserController.appNewUser
);

router.post('/email',
  UserService.sendmail,
  UserController.appNewUser
);

router.get('/',
  UserService.authorizeUser,
  UserService.getStudent,
  UserController.appNewUser,
  UserService.error
);

router.get('/all',
  UserService.getAllStudent,
  UserController.appNewUser
);

router.put('/',
  UserService.updateStudent,
  UserController.appNewUser
);

router.delete('/',
  UserService.deleteStudent,
  UserController.appNewUser
);

module.exports = router;