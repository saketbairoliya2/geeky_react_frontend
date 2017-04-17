// Set up your application entry point here...

/* eslint-disable import/default */
import BasicInfo from './components/BasicComponent/BasicInfo'
import PreferredLocations from './components/DetailComponent/PreferredLocations'
import WorkGeneralDetails from './components/DetailComponent/WorkGeneralDetails'
import { Router, Route, hashHistory, Link, IndexRoute, IndexLink} from 'react-router'
import React from 'react';;
import { render } from 'react-dom';
var _ = require('underscore');


if (typeof windows !== 'undefined'){
  window.React = React;
}

/* This will have all the details of the User Profile */
var Profile = React.createClass({

	getInitialState: function() {
        return {
			profileDetails: undefined
        }
    },

    componentDidMount: function() {
    	callAction("https://geekyprepdev.herokuapp.com/profilejson/1341",
				"GET",
				{
				},
				"text",
				function(result){
					var profileJSON =  result;
					var profileObject = JSON && JSON.parse(profileJSON) || $.parseJSON(profileJSON);
					this.setState({
							profileDetails: profileObject,
					});
					console.log(this.state.profileDetails); // Comment this, only for debug
					console.log("fetched Profile Details Successfully");
				}.bind(this),
				function(error){
					console.log("Error Fetching Profile Details");
					this.setState({
							profileDetails: {},
					});
				}.bind(this));
	},

  	componentWillUnmount: function() {
    	this.serverRequest.abort();
  	},

    render: function(){
    	if ( !this.state.profileDetails ) {
         return <div>Getting Your Profile...</div>
      	}

        return (
            <div>
            	<BasicInfo profileDetails={this.state.profileDetails}/>
            	<div className="row">
            		<div className="side col s12 m4 l3">
	    				<SideBar/>
	    			</div>
	            	<div className="content col s12 m8 l9 card-panel">
	        			{this.props.children}
	        		</div>
	        	</div>
            </div>
        );
    }
});

/* This part onwards is for the display of the Detailed Information of the person */
var SideBar = React.createClass({

	render: function(){

		var tempStyle = {
        	pointerEvents: 'none',
        	cursor: 'default',
        	opacity: '0.6'
    	};
    
		return(
			<div className="sideBar">
					<ul className="collection z-depth-3">
			          <li><IndexLink to='/' className="collection-item"  activeClassName="active"><b>Geek Info</b></IndexLink></li>
			          <li><Link to='/work_preference' className="collection-item" activeClassName="active"><b>Work Preference</b></Link></li>
			          <li><Link to='/resume' className="collection-item" activeClassName="active"><b>Resume</b></Link></li>
			          <li><Link to='/account_settings' className="collection-item" activeClassName="active"><b>Account Settings</b></Link></li>
			          <li style={tempStyle}><Link to='/subscription' className="collection-item" activeClassName="active"><b>Subscriptions</b></Link></li>
	        		</ul>
			</div>
		);
	}
});

var GeekInfo = React.createClass({
	getInitialState: function(){
		return {
			profileDetails: undefined	
		}
	},

	componentDidMount: function() {
	//Making GET Request with Profile ID to get user geekInfo Details
	/*var path_name = window.location.pathname;
	var res = path_name.split("/", 3);
    var user_id = res[2];
    if (typeof(user_id) == 'undefined') {
    	console.log('Error fetching user');
    	// To-Do,Put 404 Error Screen.
    }*/
	callAction("https://geekyprepdev.herokuapp.com/profilejson/1341#/",
				"GET",
				{
				},
				"text",
				function(result){
					var profileJSON =  result;
					var profileObject = JSON && JSON.parse(profileJSON) || $.parseJSON(profileJSON);
					this.setState({
							profileDetails: profileObject,
					});
					console.log(this.state.profileDetails); // Comment this, only for debug
					console.log("fetched Geek Info Successfully");
				}.bind(this),
				function(error){
					console.log("Error Fetching Geek INFO Data");
					this.setState({
							profileDetails: {},
					});
				}.bind(this));
	},

	getProfileDetails: function(){
		var profileDetails = _.values(this.state.profileDetails);
		var totalDetails = _.first(profileDetails);
		return totalDetails;
	},

	getEducationDetails: function(){
		var education = this.getProfileDetails();
		return education['Education'];
	},

	getUserId: function(){
		var path_name = window.location.pathname;
		var res = path_name.split("/", 3);
	    var user_id = res[2];
	    if (typeof(user_id) == 'undefined') {
	    	console.log('Error fetching user');
	    	// To-Do,Put 404 Error Screen.
	    }
	    else{
	    	return user_id.toString();
	    }
	},

	setEducationDetails: function(newEducation){
		var education = this.getProfileDetails();
		education['Education'] = newEducation;
		var user_id = this.getUserId();
		callAction("https://geekyprepdev.herokuapp.com/profilejson/",
	            	"POST",
	            	{
						profile_json: JSON.stringify({"GeekInfo": education}),
						userId: user_id
	            	},
	            	"text",
	            	function(response){
	            		console.log("Data Saved For Education");
	            	},
	            	function(error){
	            		console.log("Error Saving User Data for Education");
	            	});
	},

	getExperianceDetails: function(){
		var experiance = this.getProfileDetails();
		return experiance['Experience'];
	},

	setExperianceDetails: function(newExperiance){
		var experiance = this.getProfileDetails();
		var user_id = this.getUserId();
		experiance['Experience'] = newExperiance;
		callAction("https://geekyprepdev.herokuapp.com/profilejson/",
					"POST",
					{
						profile_json: JSON.stringify({"GeekInfo": experiance}),
						userId: user_id
					},
					"text",
					function(response){
						console.log("Data Saved for Experiance");
					},
					function(error){
						console.log("Error Saving User Data For Experiance");
					});
	},

	getProjectDetails: function(){
		var projects = this.getProfileDetails();
		return projects["Projects"];
	},

	setProjectDetails: function(newProject){
		var project = this.getProfileDetails();
		var user_id = this.getUserId();
		project['Projects'] = newProject;
		callAction("https://geekyprepdev.herokuapp.com/profilejson/",
					"POST",
					{
						profile_json: JSON.stringify({"GeekInfo": project}),
						userId: user_id
					},
					"text",
					function(response){
						console.log("Data Saved for New Project");
					},
					function(error){
						console.log("Error Saving User Data For Experiance")
					});
	},

	getskillSet: function(){
		var skills = this.getProfileDetails();
		return skills["SkillSet"];
	},

	render: function(){
    	if ( !this.state.profileDetails ) {
         return <div>Getting Geek Info...</div>
      	}
		return(
			<div>
				<h3>Geek Info</h3>
				<section className='Education'>
					<Education educationDetails={this.getEducationDetails} makePost={this.setEducationDetails}/>
					<Experiance experianceDetails={this.getExperianceDetails} makePost={this.setExperianceDetails}/>
					<Projects projectsDetails={this.getProjectDetails} makePost={this.setProjectDetails} />
					<Skillset skillSet={this.getskillSet}/>
				</section>
			</div>
		);
	}
});

/* All Details about Education is stored here in Education */

var Education = React.createClass({

	getInitialState: function(){
		return{
			initialEducation: this.props.educationDetails(),
			addEducation: false
		};
	},

	handleAddEducation: function(){
		if (this.state.addEducation == false){
			this.setState({
				addEducation: true
			});
		}
		else{
			this.setState({
				addEducation: false
			});
		}
	},

	handleSubmitEducation: function(newEducation){
		var educations = this.state.initialEducation;
		educations.push(newEducation);
		this.setState({
			initialEducation: educations,
			addEducation: false
		});
		this.props.makePost(educations);
	},

	render: function(){

		var educationItems = this.state.initialEducation.map(function(eachItem) {
            return <EducationItem key={eachItem.Year} itemDetails={eachItem} />
        });

        var educationLatest = educationItems.reverse();
       
        var style = {
			float: 'right'
		};

		var styleHidden = {
			display: 'none'
		};

		var styleShow = {
			display: 'block'
		};

		var styleForm;

		if (this.state.addEducation == true){
			styleForm = styleShow;
		}
		else{
			styleForm = styleHidden;
		}

		if (this.state.initialEducation == ''){
			console.log("This is just the initial Education " + this.state.initialEducation);
			return (
			//ToDo work on form input types.
				<div>
					<header className="educationHeader">
						<h6 className="card-panel teal lighten-2 educationAddLogo"><b>Education</b><a className="btn-floating btn-large waves-effect waves-light" style={style} onClick={this.handleAddEducation}><i className="material-icons">add</i></a></h6>
					</header>
					<p>No Education details available.</p>
					<ul style={styleForm}>
						<EducationForm submitEducation={this.handleSubmitEducation}/>
					</ul>
					<ul>
						{educationLatest}
					</ul>
				</div>
			);
		}

		return (
			//ToDo work on form input types.
			<div>
				<header className="educationHeader">
					<h6 className="card-panel teal lighten-2 educationAddLogo"><b>Education</b><a className="btn-floating btn-large waves-effect waves-light" style={style} onClick={this.handleAddEducation}><i className="material-icons">add</i></a></h6>
				</header>

				<ul style={styleForm}>
					<EducationForm submitEducation={this.handleSubmitEducation}/>
				</ul>
				<ul>
					{educationLatest}
				</ul>
			</div>
		);
	}
});

var EducationForm = React.createClass({
	
	getInitialState: function(){
		return{
			UniversityOrCollege: '',
			Degree: '',
			Year: '',
			FieldOfStudy: '',
			Grade: ''
		};
	},

	handleSubmit: function(event) {
		if (this.state.UniversityOrCollege == '' || 
			this.state.Degree == '' ||
			this.state.Year == '' ||
			this.state.FieldOfStudy == '' || 
			this.state.Grade == ''){
			console.log("You might have entered some empty fields");
			alert('You might have entered some empty fields');
		}
		else{
			this.props.submitEducation(this.state);
			var form = document.getElementById("educationNewForm");
			form.reset();
    		alert('A new Education Field Added Successfully');
    		event.preventDefault();
		}
    },

    handleChange: function (key) {
    	return function (e) {
      		var state = {};
      		state[key] = e.target.value;
      		this.setState(state);
    	}.bind(this);
  	},

	render: function(){
		var star = {
	      color: 'red'
	    };

		return(
			<div>
				<form onSubmit={this.handleSubmit} id="educationNewForm">
					<label>
						University<span style={star}>★</span>
          				<input type="text" value={this.state.UniversityOrCollege} onChange={this.handleChange('UniversityOrCollege')} />
          			</label>
          			<br />
          			
          			<label>
          				Degree<span style={star}>★</span>
          				<input type="text" value={this.state.Degree} onChange={this.handleChange('Degree')} />
                	</label>
                	<br/>
                	
                	<label>
                		Year Of Graduation<span style={star}>★</span>
          				<input type="text" value={this.state.Year} onChange={this.handleChange('Year')} />
          			</label>
          			<br/>
          			
          			<label>
          			Field Of Study<span style={star}>★</span>
          				<input type="text" value={this.state.FieldOfStudy} onChange={this.handleChange('FieldOfStudy')} />
          			</label>
          			<br/>

          			<label>
          			Grade<span style={star}>★</span>
          				<input type="text" value={this.state.Grade} onChange={this.handleChange('Grade')} />
                	</label>
          			<br/>

          			<button className="btn waves-effect waves-light" type="submit" name="action">Submit
    					<i className="material-icons right">send</i>
  					</button>
        		</form>
			</div>
		);
	}
});

var EducationItem = React.createClass({

	render: function(){
		return(
			<div>
				<li>
					<h5><strong>{this.props.itemDetails.UniversityOrCollege}</strong></h5>
					<h6>{this.props.itemDetails.FieldOfStudy}</h6>
					<h6>{this.props.itemDetails.Degree}, {this.props.itemDetails.Grade}</h6>
					<h6><span>Graduated in year </span>{this.props.itemDetails.Year}</h6>
				</li>
			</div>
		);
	}
});

var Experiance = React.createClass({

	getInitialState: function(){
		return{
			initialExperiance: this.props.experianceDetails(),
			addExperiance: false
		};
	},

	handleAddExperiance: function(){
		if (this.state.addExperiance == false){
			this.setState({
				addExperiance: true
			});
		}
		else{
			this.setState({
				addExperiance: false
			});
		}
	},

	handleSubmitExperiance: function(newExperiance){
		var experiance = this.state.initialExperiance;
		experiance.push(newExperiance);
		this.setState({
			initialExperiance: experiance,
			addExperiance: false
		});
		this.props.makePost(experiance);
	},

	render: function(){
		var experianceItems = this.props.experianceDetails().map(function(eachItem) {
            return <ExperianceItem key={eachItem.Company} itemDetails={eachItem} />
        });
        
		var experianceLatest = experianceItems.reverse();
       
        var style = {
			float: 'right'
		};

		var styleHidden = {
			display: 'none'
		};

		var styleShow = {
			display: 'block'
		};

		var styleForm;

		if (this.state.addExperiance == true){
			styleForm = styleShow;
		}
		else{
			styleForm = styleHidden;
		}

		if (this.state.initialExperiance == ''){
			console.log("This is just the initial Experiance " + this.state.initialExperiance);
			return (
			//ToDo work on form input types.
				<div>
				<header className="experianceHeader">
					<h6 className="card-panel teal lighten-2"><b>Experience</b><a className="btn-floating btn-large waves-effect waves-light" style={style} onClick={this.handleAddExperiance}><i className="material-icons">add</i></a></h6>
				</header>
				<p>No Experiance details available.</p>
				<ul style={styleForm}>
					<ExperianceForm submitExperiance={this.handleSubmitExperiance}/>
				</ul>
				<ul>
					{experianceItems}
				</ul>
			</div>
			);
		}

		return (
			<div>
				<header className="experianceHeader">
					<h6 className="card-panel teal lighten-2"><b>Experience</b><a className="btn-floating btn-large waves-effect waves-light" style={style} onClick={this.handleAddExperiance}><i className="material-icons">add</i></a></h6>
				</header>
				<ul style={styleForm}>
					<ExperianceForm submitExperiance={this.handleSubmitExperiance}/>
				</ul>
				<ul>
					{experianceItems}
				</ul>
			</div>
		);
	}

});

var ExperianceForm = React.createClass({
	
	getInitialState: function(){
		return{
			Designation: '',
			Company: '',
			CurrentCompany: '',
			WorkedFrom: '',
			WorkedTill: ''
		};
	},

	handleSubmit: function(event) {
    	if (this.state.Designation == '' ||
    		this.state.Company == '' ||
    		this.state.CurrentCompany == '' ||
    		this.state.WorkedFrom == '' ||
    		this.state.WorkedTill == ''){
    		console.log("You might have entered some empty fields");
			alert('You might have entered some empty fields');
    	}
    	else{
    		this.props.submitExperiance(this.state);
			var form = document.getElementById("experianceNewForm");
			form.reset();
	    	alert('A new Experiance Field Added Successfully');
	    	event.preventDefault();

    	}
    },

    handleChange: function (key) {
    	return function (e) {
      		var state = {};
      		state[key] = e.target.value;
      		this.setState(state);
    	}.bind(this);
  	},

	render: function(){	
		// To-Do, make some changes in the field types.
		var star = {
	      color: 'red'
	    }; 
		return(
			<div>
				<form onSubmit={this.handleSubmit} id="experianceNewForm">
					<label>Designation</label><span style={star}>★</span>
          			<input onChange={this.handleChange('Designation')} />
          			<br />
          			<label>Company</label><span style={star}>★</span>
          			<input
                		onChange={this.handleChange('Company')} />
                	<br/>
                	<label>CurrentCompany</label><span style={star}>★</span>
          			<input  
                		onChange={this.handleChange('CurrentCompany')} />
          			<br/>
          			<label>WorkedFrom</label><span style={star}>★</span>
          			<input 
                		onChange={this.handleChange('WorkedFrom')} />
          			<br/>

          			<label>WorkedTill</label><span style={star}>★</span>
          				<input 
                		onChange={this.handleChange('WorkedTill')} />
          			
          			<br/>
          			<button className="btn waves-effect waves-light" type="submit" name="action">Submit
    					<i className="material-icons right">send</i>
  					</button>
        		</form>
			</div>
		);
	}
});

var ExperianceItem = React.createClass({
	render: function(){
		const currentCompany = this.props.itemDetails.CurrentCompany;
		const iscurrentCompany = (currentCompany == 'true');
		let company = null
		if (iscurrentCompany){
			company = <ItemCurrent itemDetails={this.props.itemDetails}/>;
		}
		else{
			company = <ItemPrevious itemDetails={this.props.itemDetails}/>;
		}

		return(
			<div>
				{company}
			</div>
		);
	}
});

var ItemCurrent = React.createClass({
	render: function(){
		return(
			<div>
				<li>
					<h5><strong>{this.props.itemDetails.Company}</strong></h5>
					<h6>{this.props.itemDetails.Designation}</h6>
					<h6><span>{this.props.itemDetails.WorkedFrom}</span> - <span>Present</span></h6>
				</li>
			</div>

		);
	}
});

var ItemPrevious = React.createClass({
	render: function(){
		var style = {
			float: 'right'
		};

		return(
			<div>
				<li>
					<h5><strong>{this.props.itemDetails.Company}</strong></h5>
					<h6>{this.props.itemDetails.Designation}</h6>
					<h6><span>{this.props.itemDetails.WorkedFrom}</span> - <span>{this.props.itemDetails.WorkedTill}</span></h6>
				</li>
			</div>
		);
	},
});

var Projects = React.createClass({

	getInitialState: function(){
		return{
			initialProjects: this.props.projectsDetails(),
			addProject: false
		};
	},

	handleAddProject: function(){
		if (this.state.addProject == false){
			this.setState({
				addProject: true
			});
		}
		else{
			this.setState({
				addProject: false
			});
		}
	},

	handleSubmitProject: function(newProject){
		var projects = this.state.initialProjects;
		projects.push(newProject);
		this.setState({
			initialProjects: projects,
			addProject: false
		});
		this.props.makePost(projects);
	},

	render: function(){
		var projectItems = this.props.projectsDetails().map(function(eachItem) {
            return <ProjectItem key={eachItem.ProjectName} itemDetails={eachItem} />
        });
 
		var projectLatest = projectItems.reverse();
       
        var style = {
			float: 'right'
		};

		var styleHidden = {
			display: 'none'
		};

		var styleShow = {
			display: 'block'
		};

		var styleForm;

		if (this.state.addProject == true){
			styleForm = styleShow;
		}
		else{
			styleForm = styleHidden;
		}


		if (this.state.initialProjects == ''){
			console.log("This is just the initial Project " + this.state.initialProjects);
			return (
			//ToDo work on form input types.
			<div>
				<header className="projectHeader">
					<h6 className="card-panel teal lighten-2"><b>Projects</b><a className="btn-floating btn-large waves-effect waves-light" style={style} onClick={this.handleAddProject}><i className="material-icons">add</i></a></h6>
				</header>
				<p>No Project details available.</p>
				<ul style={styleForm}>
					<ProjectForm submitProject={this.handleSubmitProject}/>
				</ul>
				<ul>
					{projectItems}
				</ul>
			</div>
			);
		}


		return (
			<div>
				<header className="projectHeader">
					<h6 className="card-panel teal lighten-2"><b>Projects</b><a className="btn-floating btn-large waves-effect waves-light" style={style} onClick={this.handleAddProject}><i className="material-icons">add</i></a></h6>
				</header>
				<ul style={styleForm}>
					<ProjectForm submitProject={this.handleSubmitProject}/>
				</ul>
				<ul>
					{projectItems}
				</ul>
			</div>
		);
	}

});

var ProjectForm = React.createClass({
	
	getInitialState: function(){
		return{
			ProjectName: '',
			ProjectUrl: '',
			OnGoingProject: '',
			StartDate: '',
			EndDate: '',
			Description: '',
			RelatedSkills: ''
		};
	},

	handleSubmit: function(event) {
		if (this.state.ProjectName == '' ||
			this.state.ProjectUrl == '' ||
			this.state.OnGoingProject == '' ||
			this.state.StartDate == '' ||
			this.state.EndDate == '' ||
			this.state.Description == '' ||
			this.state.RelatedSkills == ''){
			console.log("You might have entered some empty fields");
			alert('You might have entered some empty fields');
		}
		else{
			this.props.submitProject(this.state);
			var form = document.getElementById("projectNewForm");
			form.reset();
	    	alert('A new Project Field Added Successfully');
	    	event.preventDefault();
    	}
    },

    handleChange: function (key) {
    	return function (e) {
      		var state = {};
      		state[key] = e.target.value;
      		this.setState(state);
    	}.bind(this);
  	},

	render: function(){	
		//To-Do, need to validate the forms and put up proper fields. 
		var star = {
	      color: 'red'
	    }; 
	    
		return(
			<div>
				<form onSubmit={this.handleSubmit} id="projectNewForm">
					<label>Project Name</label><span style={star}>★</span>
          			<input onChange={this.handleChange('ProjectName')} />
          			<br />
          			<label>Description</label><span style={star}>★</span>
          			<input onChange={this.handleChange('Description')} />
          			<br />
          			<label>Project Url</label><span style={star}>★</span>
          			<input
                		onChange={this.handleChange('ProjectUrl')} />
                	<br/>
                	<label>Is it On Going Project?</label><span style={star}>★</span>
          			<input  
                		onChange={this.handleChange('OnGoingProject')} />
          			<br/>
          			<label>Start Date</label><span style={star}>★</span>
          			<input 
                		onChange={this.handleChange('StartDate')} />
          			<br/>
          			<label>End Date</label><span style={star}>★</span>
          				<input 
                		onChange={this.handleChange('EndDate')} />
          			<br/>
          			<label>Related Skills</label><span style={star}>★</span>
          			<input onChange={this.handleChange('RelatedSkills')} />
          			<br />
          			<button className="btn waves-effect waves-light" type="submit" name="action">Submit
    					<i className="material-icons right">send</i>
  					</button>
        		</form>
			</div>
		);
	}
});


var ProjectItem = React.createClass({
	render: function(){
		const currentProject = this.props.itemDetails.OnGoingProject;
		const iscurrentProject = (currentProject == 'true');
		let project = null
		if (iscurrentProject){
			project = <ProjectCurrent itemDetails={this.props.itemDetails}/>;
		}
		else{
			project = <ProjectPrevious itemDetails={this.props.itemDetails}/>;
		}

		return(
			<div>
				{project}
			</div>
		);
	}
});


var ProjectCurrent = React.createClass({
	render: function(){
		return(
			<div>
				<li>
					<h5><strong>{this.props.itemDetails.ProjectName}</strong></h5>
					<h6><span>{this.props.itemDetails.StartDate}</span> - <span>Present</span></h6>
					<h6><a target="_blank" href='{this.props.itemDetails.ProjectUrl}'>{this.props.itemDetails.ProjectUrl}</a></h6>
					<p>{this.props.itemDetails.Description}</p>
					<h6><strong><i>{this.props.itemDetails.RelatedSkills}</i></strong></h6>
				</li>
			</div>

		);
	}
});

var ProjectPrevious = React.createClass({
	render: function(){
		return(
			<div>
				<li>
					<h5><strong>{this.props.itemDetails.ProjectName}</strong></h5>
					<h6><span>{this.props.itemDetails.StartDate}</span> - <span>{this.props.itemDetails.EndDate}</span></h6>
					<h6><a target="_blank" href='{this.props.itemDetails.ProjectUrl}'>{this.props.itemDetails.ProjectUrl}</a></h6>
					<p>{this.props.itemDetails.Description}</p>
					<h6><strong><i>{this.props.itemDetails.RelatedSkills}</i></strong></h6>
				</li>
			</div>
		);
	},
});

var Skillset = React.createClass({
	// To-Do the Add new Skill for this section. 

	render: function(){

		//var skills = _.first(this.props.skillSet());
		var skillItems = _.each(this.props.skillSet(), function(value, key){
			_.each(value, function(valueNew, keyNew){
				console.log(valueNew);
				console.log(keyNew);
				return <SkillItem key={key} skillKey={keyNew} skillValue={valueNew}/>
			});
		});
		/*var skillItems = _.map(skills, function(value, key) {
            return <SkillItem key={key} skillKey={key} skillValue={value}/>
        });*/
 
        var style = {
			float: 'right'
		};

		return (
			<div>
				<header className="skilsetHeader">
					<h6 className="card-panel teal lighten-2"><b>Skillset</b><a className="btn-floating btn-large waves-effect waves-light" style={style}><i className="material-icons">add</i></a></h6>
				</header>
				<ul>
					{skillItems}
				</ul>
			</div>
		);
	}
});

var SkillItem = React.createClass({

	render: function(){
		var items = this.props.skillValue.map(function(each){
			return <Item key={each} value={each} />
		});
		console.log("The");

		return(
			<div>
				<h5><strong>{this.props.skillKey}</strong></h5>
				{items}
			</div>
		);
	}

});

var Item = React.createClass({
	render: function(){

		return(
			<p>{this.props.value}</p>
		);
	}
});

var WorkPreference = React.createClass({

	getInitialState: function() {
        return {
            profileDetails: {
				"GeekInfo": {
					"UserName": "Test User",
					"CurrentCompany": "Oracle",
					"Designation": "Designation",
					"CollegeOrUniversity": "XYZ University",
					"CurrentLocation": "Bangalore",
					"ProfileImage": "https://lh3.googleusercontent.com/-_PNeKCtE7XA/AAAAAAAAAAI/AAAAAAAAAAA/AKB_U8ueCG_xALFeb3IyOjxAGl9xQeqfnw/s96-c/photo.jpg",
					"ProfileCompleteness": "50",


					"JobPreferences": {
						"PreferredLocations": ["Bangalore", "Hyderabad", "Delhi"],
						"LookingFrequency": "Actively looking",
						"NoticePeriod": "30 days",
						"ServingNoticePeriod": "true",
						"DaysLeftInNoticePeroid": "15",
						"OpenFor": {
							"ProductComapnies": "true",
							"ServiceCompanies": "false",
							"Startups": "true"
						}
					},

					"Experience": [{
						"Designation": "Senior Software Developer",
						"Company": "Oracle",
						"CurrentCompany": "true",
						"WorkedFrom": "Sept 2014",
						"WorkedTill": ""
					}, {
						"Designation": "Software Developer",
						"Company": "Microsoft",
						"CurrentCompany": "false",
						"WorkedFrom": "Jun 2012",
						"WorkedTill": "Sept 2014"
					}],
					"Education": [{
						"UniversityOrCollege": "XYZ University",
						"Degree": "MS Computer Science",
						"Year": "2012",
						"FieldOfStudy": "Computer Science",
						"Grade": "6.5"
					}, {
						"UniversityOrCollege": "XYZ University",
						"Degree": "BTech",
						"Year": "2010",
						"FieldOfStudy": "Computer Science",
						"Grade": "70%"
					}],
					"Projects": [{
						"ProjectName": "XYZ Project",
						"ProjectUrl": "www.xyzproject.com",
						"OnGoingProject": "true",
						"StartDate": "Sept 2014",
						"EndDate": "",
						"Description": "",
						"RelatedSkills": "Algorithms, Java, Facebook Graph API"
					}, {
						"ProjectName": "XYZ Project 2",
						"ProjectUrl": "www.xyzproject2.com",
						"OnGoingProject": "false",
						"StartDate": "Jun 2012",
						"EndDate": "Sept 2014",
						"Description": "",
						"RelatedSkills": "Java, J2EE, CSS, HTML"
					}],
					"SkillSet": [{
						"Programming": ["C", "Java", "J2EE"],
						"Frameworks": ["Hibernate"],
						"Concepts": ["Data Strutures", "Algorithms", "Operating Systems"],
						"GeekySkills": ["Multithreading", "Basic Structures"]
					}],		
					"Resume": {
						"ResumeTitle": "Software Developer 2 at Amazon",
						"ResumeUrl": "aws s3 url"
					}
				}
			},
			jobs: []	
        }
    },

    getProfileDetails: function(){
		var profileDetails = _.values(this.state.profileDetails);
		var totalDetails = _.first(profileDetails);
		return totalDetails;
	},

	getWorkPreferenceLocation: function(){
		var workPreference = this.getProfileDetails();
		return workPreference['JobPreferences']['PreferredLocations'];
	},

	getWorkGeneralDetails: function(){
		var workPreference = this.getProfileDetails();
		return workPreference['JobPreferences']
	},


	render: function(){
		return(
			<div>
				<h4>Work Preference</h4>
				<section className='WorkPreference'>
					<PreferredLocations workPreferenceDetails={this.getWorkPreferenceLocation}/>
					<WorkGeneralDetails generalDetails={this.getWorkGeneralDetails}/>
				</section>
			</div>
		);
	}
});

var Resume = React.createClass({
	render: function(){
		return(
			<div>
				<p>Hello resume!</p>
			</div>
		);
	}
});

var AccountSettings = React.createClass({
	render: function(){
		return(
			<div>
				<p>Hello AccountSettings!</p>
			</div>
		);
	}
});

var Subscriptions = React.createClass({
	render: function(){
		return(
			<div>
				<p>Hello Subscriptions!</p>
			</div>
		);
	}
});

render(
	<Router history={hashHistory}>
      <Route path='/' component={Profile}>
        <IndexRoute component={GeekInfo}/>
        <Route path='work_preference' component={WorkPreference}/>
        <Route path='resume' component={Resume}/>
        <Route path='account_settings' component={AccountSettings}/>
        <Route path='subscription' component={Subscriptions}/>
      </Route>
    </Router>, 
  document.getElementById('profile_container')
);
