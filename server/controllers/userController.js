var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var jwt = require('jsonwebtoken');


class userController {


    getUser(req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("web_apihenho");
            dbo.collection("users").find(req.user).toArray(function (err, result) {
                if (err) throw err;
                var userInfo = result[0];
                delete userInfo['password'];
                res.json({ message: "successful", user: userInfo });
                db.close();
            });
        });
    }
    signIn(req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("web_apihenho");
            dbo.collection("users").find(req.body).toArray(function (err, result) {
                if (err) throw err;
                if (result.length === 1) {
                    var user = result[0];
                    delete user["password"];
                    delete user["_id"];
                    delete user["friends"];
                    delete user["posts"];
                    delete user["avatar"];
                    delete user["phone"];
                    delete user["like"];
                    delete user["name"];
                    const accessToken = jwt.sign(user, "long");
                    res.status(200).json({ message: "successful", accessToken });
                    db.close();

                } else {
                    res.json({ message: "error" });
                    db.close();

                }
            });
        });
    }
    SignUp(req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("web_apihenho");
            var data = dbo.collection("users");
            var promise = new Promise(function (resolve, reject) {
                data.find({ email: req.body.email }).toArray(function (err, result) {
                    if (err) return reject(err);
                    if (result.length === 0) {
                        resolve();
                    } else {
                        reject("errorEmail");
                    }
                })
            })
            promise
                .then(n => {
                    var findalluser = new Promise(function(resolve, reject) {
                        data.find({}).toArray(function (err, result) {
                            if (err) return reject(err);
                            resolve(result.length);
                        })
                    })
                    return findalluser
                        .then((prev) => {
                            return prev;
                        })
                        .catch((err) => {
                            Promise.reject("error");
                        })
                    
                })
                .then(id => {
                    let userinfo = {
                        id: id,
                        name: "",
                        email: req.body.email,
                        password: req.body.password,
                        friends: [],
                        posts: [],
                        like: [],
                        avatar: "",
                        phone:""
                    }
                    data.insertOne(userinfo,(err, result) => {
                        if (err) throw err;
                        res.json({message: "successful"});
                        db.close();
                    })
                })
                .catch(err => {
                    res.json({message: err});
                    db.close();
                })

        });
    }
    changeInfoUser(req, res) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("web_apihenho");
            var updateUser = { $set: {name:req.body.name,phone:req.body.phone}};
            dbo.collection("users").updateOne(req.user,updateUser ,function(err, result){
                if(err){res.json({message: "error"})};
                res.json({message:"successful"});
                db.close();
            });
        });
    }
    check(req, res) {

    }

}

module.exports = new userController;
