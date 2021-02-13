const indexController = {};

indexController.renderIndex = (req, res, next) => {
    res.render('index', {
        title: 'DriverApp'
    });
}

indexController.renderAbout = (req, res, next) => {
    res.render('about', {
        title: 'About'
    });
}

module.exports = indexController;