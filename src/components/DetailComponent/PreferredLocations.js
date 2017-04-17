var React = require('react');
var _ = require('underscore');

var PreferredLocations = React.createClass({

	getInitialState: function(){
		return{
			initialPreference: this.props.workPreferenceDetails(),
			addLocation: false
		};
	},

	componentDidMount: function(){
		var cities = _.map(this.state.initialPreference, function(city){
			return{'tag': city}
		});

		$('.chips-initial').material_chip({
			data: cities,
		});
	},

	render: function(){
		var initialPreference = this.state.initialPreference;
		console.log(initialPreference)

		$('.chips').on('chip.add', function(e, chip){
    	// you have the added chip here
    	console.log('here is the added chip' + e + '' + chip);
  		});

		return (
			<div className="chips chips-initial"></div>
		);
	}
});

export default PreferredLocations;