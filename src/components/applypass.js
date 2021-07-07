import React from "react";
//import './applypasscss.css';


class FormElementCombined extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value1: '', value2: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "username") {
            this.setState({ value1: event.target.value })
        }
        else if (event.target.name === "description") {
            this.setState({ value2: event.target.value })
        }
        else if (event.target.name === "type") {
            this.setState({ value3: event.target.value })
        }
    }

    handleSubmit(event) {
       
       // alert('A detailas submitted: ' + this.state.value1 + " " + this.state.value2);
       if (this.state.value1 === '' || this.state.value2 === '')
       event.preventDefault();
    }
    render() {
        return (
        
   
        <div class='login'  >
                     <form action="http://localhost:9111/" onSubmit={this.handleSubmit} name="myform" method="get">
                          <h1>APPLY LEAVE</h1>    
                     <input type="text" value={this.state.value1} name="username"  placeholder='ID of Faculty' onChange={this.handleChange} /> <br/><br/>
                     <input type = "date" value={this.state.value3} name="date" onChange={this.handleChange} /><br></br>
                     <input type="text" value={this.state.value2} name="description" placeholder='Description' onChange={this.handleChange} /> <br/><br/>
                        <span class='one'>  <select  name='type' value={this.state.value3} onChange={this.handleChange}>
                                     <option>authorities</option>
                                     <option>public</option>
                                     <option>survey</option>
                                     </select>
                                     </span> 
                  <input type="submit" value="submit" />
                </form>
                <div class='shadow'></div>
                </div>
             
           
            
        )
    }
}
export default FormElementCombined
