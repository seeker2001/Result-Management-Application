const student = require("../models/Student");

/**** Search Page for student ****/
exports.getLoginPage = (req, res) => {
    const error = req.flash('error');
    const success = req.flash('success');
    res.render('student/loginPage', {url : req.url, error, success});
};

/***** Getting and processing the data after form is submitted *****/ 
exports.postResultPage = async (req, res) => {
    try {
        const studentRollNo = Number(req.body.roll_no);
        const requiredStudent = await student.findOne({where : {roll_no : studentRollNo}}); 
        /**** if data entered is invalid redirect to the same search page ****/
        if(!requiredStudent){
            req.flash('error', 'Please enter correct credentials');
            res.redirect('/student/login');
        }
        /*** if Date of birth and roll no do not match show an error ***/
        if (requiredStudent.dob != req.body.dob){
            req.flash('error', 'Roll Number and Date of birth do not match');
            res.redirect('/student/login');
        }
        /**** otherwise render the result on result page ****/
        else {
            res.render('student/resultPage', {requiredStudent, url : req.url});
        }
    } catch (error) {
        console.log(error);
        res.redirect('/student/login');
    }
};