import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export class SortButton extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
			sortAnchor: null     
		}
    }

    render() {
        const {
            sortAnchor
        } = this.state;

        const {
            sortValues,
            id
        } = this.props;

        const handleClick = (event) => {
            this.setState({ sortAnchor: event.currentTarget });
        };

        const handleClose = () => {
            this.setState({ sortAnchor: null });
        };

        return (
            <React.Fragment>
                <Button className="sort-by-button button" color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClick }>
                    Sort by
                    <ArrowDropDownIcon/>
                </Button>
                <Menu
                    id={id ? id : 'sort-menu'}
                    className='sort-menu'
                    anchorEl={sortAnchor}
                    keepMounted
                    open={Boolean(sortAnchor)}
                    onClose={handleClose}
                >
                    { sortValues.map(sortValue => {
                        return <MenuItem onClick={handleClose} id={sortValue} key={ sortValue }>{ sortValue }</MenuItem>
                    })}
                </Menu>
            </React.Fragment>
        )
    }

}