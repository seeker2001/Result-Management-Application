/** Rendering the home page of web app ***/
exports.getHomePage = (req, res) => {
    res.render('index', {url : req.url});
};
