const React = require('react');

function DefaultLayout(props) {
    return (
        <html>
            <head>
                <title>{ props.title }</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </head>
            <body>
                <div></div>
                { props.children }
            </body>
        </html>
    );
}
module.exports = DefaultLayout;