const express = require("express");
const Birthday = require("../mongoose/models/birthdays");

//setting up birthdays router
const birthdaysRouter = new express.Router();

//write your code for birthdays endpoints here
birthdaysRouter.post('/birthdays', (req, res) => {

    const name = req.body.name;

    if (name.length >= 3 && name.length <= 15) {
        const newobj = new Birthday({
            name: req.body.name,
            dob: req.body.dob,
            relationship: req.body.relationship,
        })
        newobj.save()
        res.send(201)
    }
    else
        res.send(400)

})

birthdaysRouter.get('/birthdays', async (req, res) => {
    const q_name = req.query.name;
    const q_dob = req.query.dob;
    const q_type = req.query.type;



    if (q_name == undefined && q_dob == undefined && q_type == undefined) {
        Birthday.find((err, item) => {
            if (!err)
                res.send(item)
            else
                res.send(400)
        })
    }
    else if (q_name != undefined && q_dob == undefined && q_type == undefined) {
        const b_names = await Birthday.find()

        if (q_name == 'asc') {
            b_names.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        } else {
            b_names.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
                return 0;
            });
        }

        res.send(b_names)
    }
    else if (q_name == undefined && q_dob != undefined && q_type == undefined) {
        const b_names = await Birthday.find()

        if (q_dob == 'asc') {
            b_names.sort((a, b) => {
                var c = new Date(a.dob);
                var d = new Date(b.dob);
                return c - d;
            });
        } else {
            b_names.sort((a, b) => {
                var c = new Date(a.dob);
                var d = new Date(b.dob);
                return d - c;
            });
        }

        res.send(b_names)
    }


    else if (q_name == undefined && q_dob == undefined && q_type != undefined) {
        const b_names = await Birthday.find()
        var newArray = []
        if (q_type == 'Friend') {
            newArray = await b_names.filter(item => item.relationship == 'Friend');
            console.log(newArray)
            res.send(newArray)
        } else {

        }


    }

    else if (q_name != undefined && q_dob == undefined && q_type != undefined) {
        const b_names = await Birthday.find()
        var newArray = []
        if (q_type == 'Sister') {
            newArray = await b_names.filter(item => item.relationship == 'Sister');
            if (q_name == 'asc') {
                newArray.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
            }
            else {
                newArray.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa > fb) {
                        return -1;
                    }
                    if (fa < fb) {
                        return 1;
                    }
                    return 0;
                });
            }

            res.send(newArray)
        }
    }
    else if ((q_name == undefined && q_dob != undefined && q_type != undefined)) {
        if (q_type == 'Brother') {
            const b_names = await Birthday.find()
            newArray = await b_names.filter(item => item.relationship == 'Brother');
            if (q_dob == 'asc') {
                newArray.sort((a, b) => {
                    var c = new Date(a.dob);
                    var d = new Date(b.dob);
                    return c - d;
                });
            }
            else {
                newArray.sort((a, b) => {
                    var c = new Date(a.dob);
                    var d = new Date(b.dob);
                    return d - c;
                });
            }

            res.send(newArray)
        }
    }
})


module.exports = birthdaysRouter;