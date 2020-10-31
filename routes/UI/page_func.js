const api_route = "/api/v1/";

exports.main_page = [
    async function(req, res, next) {
        const url = req.protocol + "://" + req.get('host') + api_route + "main";
        
        try {
            res.render('pages/home');
        } catch (error) {
            console.log(error.response.body);
        }

    }
];

