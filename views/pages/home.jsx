var React = require('react');
var DefaultLayout = require('./layouts/default');

function HomePage(props) {

    props = {
        title: 'hey 2',
        user: {
            name: 'sally'
        }
    }

    return (
        <DefaultLayout title={props.title} user={props.user}>
            <div>Hello{props.user ? ' ' + props.user.name : ''}</div>
        </DefaultLayout>
    );
}
module.exports = HomePage;