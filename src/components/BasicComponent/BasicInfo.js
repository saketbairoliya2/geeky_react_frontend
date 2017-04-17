var React = require('react');
var _ = require('underscore');

/* This Basic information will have Basic Information detail;s about the person */
var BasicInfo = React.createClass({
    
    render: function(){
    	var profileDetails = this.props.profileDetails['GeekInfo'];
    	var imageUrl = profileDetails['ProfileImage'];
        return (
            <div className="row card-panel">
        		<div className="">
	      			<div className="col s12 m4 l2">
	        			<ImageDetails imageUrl= {imageUrl}/>
	      			</div>
	      			<div className="col s12 m4 l8">
	        			<NameDetails profileDetails={profileDetails}/>
	      			</div>
	      			<div className="col s12 m4 l2">
	        			<CompletionDetails profileCompletion={profileDetails['ProfileCompleteness']}/>
	      			</div>
      			</div>
    		</div>
        );
    }
});

/* Places image as Profile Picture */
var ImageDetails = React.createClass({

	render: function(){
		var imageStyle = {
			display: "block",
    		margin: 5,
    		backgroundColor: "#fff",
    		borderRadius: 2,
    		borderColor: "#0e0e0f"
		};
		var imageUrl = this.props.imageUrl;
		return(
			<div className="col s12 m4 l2">
				<img style={imageStyle} src={imageUrl}/>
			</div>
		);
	}
});

/* Basic Details of the user, will involved components for each type of data.*/
var NameDetails = React.createClass({

	render: function(){
		return(
		<div>
			<h5>{this.props.profileDetails.UserName}</h5>
			<WorkDetails workDetails={this.props.profileDetails}/>
			<PreviousSchool prevDetails={this.props.profileDetails.CollegeOrUniversity}/>
		</div>
		);
	}
});

var WorkDetails = React.createClass({
	render: function(){
		if (this.props.workDetails.CurrentCompany != ''){
			return(
			<div>
				<p><b>Working</b> at {this.props.workDetails.CurrentCompany} <b>as</b> <i>{this.props.workDetails.Designation}</i></p>
			</div>
			);
		}
		else{
			return(
				<div></div>
			);
		}
	}
});

var PreviousSchool = React.createClass({
	render: function(){
		if(this.props.prevDetails != ''){
			return(
				<h6>Previous: <span>{this.props.prevDetails}</span></h6>
			);
		}
		else{
			return(
				<div></div>
			);
		}
	}
});

/* For Showing the Graph of the % of Profile Completed */
var CompletionDetails = React.createClass({
	render: function(){
		var progressStyle = {
			width: this.props.profileCompletion + '%'
		};

		return(
			<div>
				<h6>Profile Completed: {this.props.profileCompletion}%</h6>
				<div className="progress">
					<div className="determinate" style={progressStyle}></div>
				</div>
			</div>
		);
	}
});

export default BasicInfo;