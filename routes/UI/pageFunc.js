const apiRoute = "/api/v1/";

exports.mainPage = [
    async function(req, res, next) {
        const url = req.protocol + "://" + req.get('host') + apiRoute + "main";
        
        try {
            res.render('pages/home');
        } catch (error) {
            console.log(error.response.body);
        }

    }
];

