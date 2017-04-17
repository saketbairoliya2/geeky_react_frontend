var React = require('react');


var GeekInfo = React.createClass({
	getInitialState: function(){
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
						"Open For": {
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
			}	
		}
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

	getExperianceDetails: function(){
		var experiance = this.getProfileDetails();
		return experiance['Experience'];
	},

	getProjectDetails: function(){
		var projects = this.getProfileDetails();
		return projects["Projects"];
	},

	getskillSet: function(){
		var skills = this.getProfileDetails();
		return skills["SkillSet"];
	},

	render: function(){
		return(
			<div>
				<h3>Geek Info</h3>
				<section className='Education'>
					<Education educationDetails={this.getEducationDetails}/>
					<Experiance experianceDetails={this.getExperianceDetails}/>
					<Projects projectsDetails={this.getProjectDetails}/>
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
		//To-Do Make an ajax call to save data.
		//Chaning the bar to Button, edit and delete Button also.
		this.setState({
			initialEducation: educations,
			addEducation: false
		});
	},

	educationKeys: function(){
			return _.allKeys(_.first(this.props.educationDetails()));
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
		this.props.submitEducation(this.state);
		var form = document.getElementById("educationNewForm");
		form.reset();
    	alert('A new Education Field Added Successfully');
    	event.preventDefault();
    },

    handleChange: function (key) {
    	return function (e) {
      		var state = {};
      		state[key] = e.target.value;
      		this.setState(state);
    	}.bind(this);
  	},

	render: function(){		
		return(
			<div>
				<form onSubmit={this.handleSubmit} id="educationNewForm">
					<label>UniversityOrCollege:</label>
          			<input onChange={this.handleChange('UniversityOrCollege')} />
          			<br />
          			<label>Degree:</label>
          			<input
                		onChange={this.handleChange('Degree')} />
                	<br/>
                	<label>Year:</label>
          			<input  
                		onChange={this.handleChange('Year')} />
          			<br/>
          			<label>FieldOfStudy:</label>
          			<input 
                		onChange={this.handleChange('FieldOfStudy')} />
          			<br/>

          			<label>Grade:</label>
          				<input 
                		onChange={this.handleChange('Grade')} />
          			
          			<br/>
          			<input type="submit" value="Submit" />
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

				<br></br>
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
		//To-Do Make an ajax call to save data.
		//Chaning the bar to Button, edit and delete Button also.
		this.setState({
			initialExperiance: experiance,
			addExperiance: false
		});
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
		this.props.submitExperiance(this.state);
		var form = document.getElementById("experianceNewForm");
		form.reset();
    	alert('A new Experiance Field Added Successfully');
    	event.preventDefault();
    },

    handleChange: function (key) {
    	return function (e) {
      		var state = {};
      		state[key] = e.target.value;
      		this.setState(state);
    	}.bind(this);
  	},

	render: function(){	
		// To-Do, make some changes in the field types and put up data validation. 
		return(
			<div>
				<form onSubmit={this.handleSubmit} id="experianceNewForm">
					<label>Designation:</label>
          			<input onChange={this.handleChange('Designation')} />
          			<br />
          			<label>Company:</label>
          			<input
                		onChange={this.handleChange('Company')} />
                	<br/>
                	<label>CurrentCompany:</label>
          			<input  
                		onChange={this.handleChange('CurrentCompany')} />
          			<br/>
          			<label>WorkedFrom:</label>
          			<input 
                		onChange={this.handleChange('WorkedFrom')} />
          			<br/>

          			<label>WorkedTill:</label>
          				<input 
                		onChange={this.handleChange('WorkedTill')} />
          			
          			<br/>
          			<input type="submit" value="Submit" />
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
				<br></br>
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
				<br></br>
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
		//To-Do Make an ajax call to save data.
		//Chaning the bar to Button, edit and delete Button also.
		this.setState({
			initialExperiance: projects,
			addProject: false
		});
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
		this.props.submitProject(this.state);
		var form = document.getElementById("projectNewForm");
		form.reset();
    	alert('A new Project Field Added Successfully');
    	event.preventDefault();
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
		return(
			<div>
				<form onSubmit={this.handleSubmit} id="projectNewForm">
					<label>Project Name:</label>
          			<input onChange={this.handleChange('ProjectName')} />
          			<br />
          			<label>Description</label>
          			<input onChange={this.handleChange('Description')} />
          			<br />
          			<label>Project Url:</label>
          			<input
                		onChange={this.handleChange('ProjectUrl')} />
                	<br/>
                	<label>Is it On Going Project?</label>
          			<input  
                		onChange={this.handleChange('OnGoingProject')} />
          			<br/>
          			<label>Start Date</label>
          			<input 
                		onChange={this.handleChange('StartDate')} />
          			<br/>
          			<label>End Date</label>
          				<input 
                		onChange={this.handleChange('EndDate')} />
          			<br/>
          			<label>Related Skills</label>
          			<input onChange={this.handleChange('RelatedSkills')} />
          			<br />
          			<input type="submit" value="Submit" />
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
				<br></br>
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
				<br></br>
			</div>
		);
	},
});

var Skillset = React.createClass({
	// To-Do the Add new Skill for this section. 

	render: function(){

		var skills = _.first(this.props.skillSet());
		var skillItems = _.map(skills, function(value, key) {
            return <SkillItem key={key} skillKey={key} skillValue={value}/>
        });
 
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


export default GeekInfo;