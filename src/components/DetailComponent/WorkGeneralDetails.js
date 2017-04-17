var React = require('react');
var _ = require('underscore');
import InlineEdit from 'react-edit-inline';

var WorkGeneralDetails = React.createClass({

	getInitialState: function(){
		return{
			initialGeneralDetails: this.props.generalDetails(),
		};
	},

	render: function(){

		var initialGeneralDetails = this.state.initialGeneralDetails;
 
		return (
			<div>
				<LookingFrequently item={initialGeneralDetails['LookingFrequency']}/>
				<NoticePeriod item={initialGeneralDetails['NoticePeriod']}/>
				<ServingNoticePeriod item={initialGeneralDetails['ServingNoticePeriod']} value={initialGeneralDetails['DaysLeftInNoticePeroid']}/>
				<CheckboxExampleSimple/>

			</div>
		);
	}
});

class LookingFrequently extends React.Component {
 
    constructor(props){
      super(props);
      this.dataChanged = this.dataChanged.bind(this);
      this.state = {
        message: this.props.item
      }
    }
 
    dataChanged(data) {
        // data = { description: "New validated text comes here" } 
        // Update your model from here 
        console.log(data);
        this.setState({data});
        //To-Do make an AJAX Call here with the data.
    }
 
    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }
 
    render() {
        return (
        	<div>
	            <h5>Actively Looking/Passively Looking?</h5>
	            <InlineEdit
	              validate={this.customValidateText}
	              activeClassName="editing"
	              text={this.state.message}
	              paramName="message"
	              change={this.dataChanged}
	              style={{
	                minWidth: 150,
	                display: 'inline-block',
	                margin: 0,
	                padding: 0,
	                fontSize: 15,
	                outline: 0,
	                border: 0
	              }}
	            />
        	</div>
        	)
    }
}

class NoticePeriod extends React.Component {
 
    constructor(props){
      super(props);
      this.dataChanged = this.dataChanged.bind(this);
      this.state = {
        message: this.props.item
      }
    }
 
    dataChanged(data) {
        // data = { description: "New validated text comes here" } 
        // Update your model from here 
        console.log(data);
        this.setState({data});
        //To-Do make an AJAX Call here with the data.
    }
 
    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }
 
    render() {
        return (
        	<div>
	            <h5>What is your notice Period?</h5>
	            <InlineEdit
	              validate={this.customValidateText}
	              activeClassName="editing"
	              text={this.state.message}
	              paramName="message"
	              change={this.dataChanged}
	              style={{
	                minWidth: 150,
	                display: 'inline-block',
	                margin: 0,
	                padding: 0,
	                fontSize: 15,
	                outline: 0,
	                border: 0
	              }}
	            />
        	</div>
        	)
    }
}

var ServingNoticePeriod = React.createClass({

	getInitialState: function () {
	    return {
	      selectedOption: 'Yes'
	    };
  	},

  	handleOptionChange: function(changeEvent){
  		this.setState({
  			selectedOption: changeEvent.target.value
  		});
  	},

	render: function(){
	var isServingNoticePeriod = this.props.item
		/*if (isServingNoticePeriod == 'true'){
			return(
				<div>
					<p>{this.props.item}</p>
					<p>{this.props.value}</p>
				</div>
			);
		}

		return(
			<div>
				<p>{this.props.item}</p>
			</div>
		);*/
		return(
			<div>
				<h5>Are you serving notice period?</h5>
				<form>
			        <div className="radio">
			          <label>
			            <input type="radio" 
			            value="Yes" 
			            checked={this.state.selectedOption === 'Yes'}
			            onChange={this.handleOptionChange}/>
			            Yes
			          </label>
			        </div>
			        <div className="radio">
			          <label>
			            <input type="radio" 
			            value="No" 
			            checked={this.state.selectedOption === 'No'}
			            onChange={this.handleOptionChange}/>
			            No
			          </label>
			        </div>
      			</form>
			</div>
		);
	}
});

/*var OpenFor = React.createClass({
	getInitialState: function () {
	    return {
	      productCompany: this.props.item['ProductComapnies'],
	      serviceCompany: this.props.item['ServiceCompanies'],
	      startUp: this.props.item['Startups']
	    };
  	},

  	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
  	},

	render: function(){
		console.log(this.state.productCompany);
		return(
			<div>
				<form id="companyType">
					<h5>Which type of companies are you interested in?</h5>
			        <label>Product Company</label>
			        <input
			            name="productCompany"
			            type="checkbox"
			            checked={this.state.productCompany}
			            onChange={this.handleInputChange} />
			        <br />
			        <label>Service Company</label>
			          <input
			            name="serviceCompany"
			            type="checkbox"
			            checked={this.state.serviceCompany}
			            onChange={this.handleInputChange} />
			        <br />
			        <label>Start Ups</label>
			          <input
			            name="startUp"
			            type="checkbox"
			            checked={this.state.startUp}
			            onChange={this.handleInputChange} />
			    </form>
			</div>
		);
	}
});
*/

export default WorkGeneralDetails;