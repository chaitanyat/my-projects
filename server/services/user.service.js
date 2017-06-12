var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mysql = require('mysql');
var db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hrm'
});

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();
	//db.getConnection(function(err, connection) {
	  //if (err) throw err;
	  db.query("SELECT * FROM user WHERE mail_id = '"+username+"'", function (err, user) {
		if (err) deferred.reject(err.name + ': ' + err.message);
		
		if (user && user[0].password === password) {
			user = user[0];
            // authentication successful
            deferred.resolve({
                data: user,
                token: jwt.sign({ sub: user.user_id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
		
	  });
	 //db.release();
	//});

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();
	//db.getConnection(function(err, connection) {
       //if (err) throw err;
	   db.query("SELECT * FROM user", function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(users);
	   });
	   //db.release();
    //});
    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    db.query("SELECT * FROM user WHERE user_id="+_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(user[0]);
    });

    /*db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });*/
    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}