import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class Filters extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            selectedFilters: ''
		}
	}

    render() {
        const {
            filters
        } = this.props;
        const {
            selectedFilters
        } = this.state;

        const handleChange = (name) => {
            let selectedFilters = this.state.selectedFilters.split(',');
            if (selectedFilters.includes(name)) selectedFilters = selectedFilters.filter(val => val !== name);
            else selectedFilters.push(name);
            this.setState({ selectedFilters: selectedFilters.join(',') });
            console.log(selectedFilters)
        }
        
        return (
            <div className="filter-container">
                {
                    Object.keys(filters).map(key => {
                        return <div className="filter-item" key={ key }>
                            <span className="filter-group">{ key }</span>
                            {
                                filters[key].map(filter => {
                                    const name = (key + '-' + filter).replace(/ /g, '-').toLowerCase();
                                    return <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={ selectedFilters.split(',').includes(name) }
                                                onChange={ () => handleChange(name) } 
                                                name={ name }
                                                color="primary"
                                            />
                                        }
                                        label={ filter }
                                        key={ name }
                                    />
                                })
                            }
                        </div>
                    })
                }
            </div>
        )

    }

}