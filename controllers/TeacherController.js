const student = require("../models/Student");
const dotenv = require('dotenv');
dotenv.config({path : 'config.env'});

/*** Login password for teacher ***/
const TEACHER_LOGIN_PASS = process.env.TEACHER_LOGIN_PASS;

/*** Login Page for the teacher ***/
exports.getLoginPage = (req, res) => {
    const error = req.flash('error');
    const success = req.flash('success');
    res.render('teacher/login', {success, error, url : req.url});
};

/*** login form processing after it is submitted ***/
exports.postLoginPage = (req, res) => {
    const pass = req.body.password;
    if (pass == TEACHER_LOGIN_PASS){
        res.redirect('/teacher/viewall');
    } else {
        req.flash('error', 'Wrong Password, Please try again!!');
        res.redirect('/teacher/login');
    }
};



/** Handles the main page for teacher where all students are displayed **/
exports.getViewAllPage = async (req, res) => {
    try {        
        /** Get all students and render them on the page */ 
        const allStudents = await student.findAll();
        const error = req.flash('error');
        const success = req.flash('success');
        return res.render('teacher/viewAllStudents', {allStudents, url : req.url, error, success});
    } catch (error) {
        console.log(error);
        /** Redirect to Home page **/
        return res.redirect('/');
        
    }
};

/*** render the page for adding new student ***/
exports.getAddStudentPage = (req, res) => {
    res.render('teacher/addStudent', {url : req.url});
};

/** post request for posting or adding the data from forms to the database ***/
exports.postStudentData = async (req, res) => {
    try {
        const roll_no = Number(req.body.roll_no);
        const name = req.body.name;
        const dob = new Date(req.body.dob);
        const score = Number(req.body.score);
        /*** check if the student already exists then redirect to the viewall page ***/
        const studentExists = await checkStudentAlreadyExists(roll_no)
        if (studentExists) {
            req.flash('error', 'Student with given Roll No already exists');
            return res.redirect('/teacher/viewall');
        }
        if(!validateDateOfBirth(dob)){
            req.flash('error', 'Age should be more than 5');
            return res.redirect('/teacher/viewall');
        }
        /** if student with given roll_no donot exist then create and add a new one **/
        student.create({
            roll_no : Number(roll_no),
            name : name,
            dob : dob,
            score: Number(score),
        });
        req.flash('success', 'Successfully Added the new student!!');
        return res.redirect('/teacher/viewall');
    } catch (error) {
        console.log(`${error}`);
        res.redirect('/teacher/viewall');
    }
}

/** render the page for editing existing student information **/
exports.getEditStudentPage = async (req, res) => {
    student_id = Number(req.params.id);
    try {
        /** get the student by its id and render the edit page with the info of student */
        const reqStudent = await student.findByPk(student_id);
        return res.render('teacher/editStudent', {reqStudent, url : req.url});
    } catch (error) {
        console.log(error);
        return res.redirect('/teacher/viewall');
    }
};

/*** adding updated data to the database ***/
exports.updateStudentData = async (req, res) => {
    try {
        const roll_no = Number(req.body.roll_no);
        const name = req.body.name;
        const dob = new Date(req.body.dob);
        const score = Number(req.body.score);
        _id = Number(req.params.id)
        const curStudent = await student.findOne({where : {id : _id}});
        studentExists = checkStudentAlreadyExists(req.body.roll_no)
        /** if a student with new updated roll no already exist show an error**/
        if (studentExists && curStudent.roll_no !== Number(req.body.roll_no)) {
            req.flash('error', 'Student with given Roll No already exists !!')
            return res.redirect('/teacher/viewall')
        }
        /*** if invalid DOB show and error ***/
        if(!validateDateOfBirth(dob)){
            req.flash('error', 'Age should be more than 5');
            return res.redirect('/teacher/viewall');
        }        
        await student.update(
            { 
                roll_no : roll_no, 
                name : name,
                dob : dob,
                score : score,
            },
            { where: {id : _id}})
        req.flash('success', 'Imformation updated successfully!!');
        return res.redirect('/teacher/viewall');

    } catch (error) {
        console.log(`${error}`);
        return res.redirect('/teacher/viewall');
    }
};

/*** handling the deletion of a student result from database ***/
exports.deleteStudentData = async (req, res) => {
    studentId = Number(req.params.id);
    try {
        await student.destroy({where : {id : studentId}});
    } catch (error) {
        console.log(`${error}`);
    }
    req.flash('success', 'Student entry deleted successfully');
    res.redirect('/teacher/viewall');
}


/*** Helper Functions  ***/
// This function will check if the student with given roll_no already exists
async function checkStudentAlreadyExists(roll_no) {
    const checkStudent = await student.findOne({where : {roll_no : roll_no}});
    if (checkStudent) {
        return true;
    }
    return false;
}

// This function is for validating the date of birth of the student
function validateDateOfBirth(dob) {
    const currentDate = new Date();
    const minAge = 5;
    const ageInMillis = currentDate - dob;
    const ageInYears = ageInMillis / (1000 * 60 * 60 * 24 * 365.25);
    if (ageInYears < minAge) {
        return false;
    }
    return true

}