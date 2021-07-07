import React from "react";
import PropTypes from "prop-types";
import "./admincss.css";

class Admin extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }
    constructor(props) {
        super(props);
          this.state = { user:'',pass:'',u:[],pa:[],e:[],uni:[],duni:[],adval:'', user1:'',pass1:'',u1:[],pa1:[],e1:[],uni1:[]}
          this.handledelclick = this.handledelclick.bind(this);
    }
    handledelclick(event){
        console.log(this.state.uni[event.target.name])
        var data= new URLSearchParams();
        data.append("uniid",this.state.uni[event.target.name]) 
        fetch("http://localhost:8081/delfacdata",{
            method:'post',
            body:data
        })
        .then(response =>{return response.json()})
        .then(response =>{this.setState({adval:response.val})
        if(this.state.adval == 'yes'){
          this.setState({u1:response.u})
          this.setState({pa1:response.p})
          this.setState({e1:response.e})
          this.setState({uni1:response.uni})
          this.props.history.push({pathname:'/admin',state: { user: this.state.user,pass:this.state.pass,u:JSON.stringify(this.state.u1),pa:JSON.stringify(this.state.pa1),e:JSON.stringify(this.state.e1),uni:JSON.stringify(this.state.uni1)}});
          //alert("deleted")
        }
        else{
          alert("wrong credentials")
        }
        
      })
    }
    render() {
        this.state.user = this.props.location.state.user;
        this.state.pass = this.props.location.state.pass;
        this.state.u=JSON.parse(this.props.location.state.u);
        this.state.pa=JSON.parse(this.props.location.state.pa);
        this.state.e=JSON.parse(this.props.location.state.e);
        this.state.uni=JSON.parse(this.props.location.state.uni);


        let facdata = [];

        const facdatalis = () => {
            for (let i = 0; i < this.state.u.length; i++) {
            facdata.push(<tr className="tad2"><th>{this.state.u[i]}</th><th>{this.state.pa[i]}</th><th>{this.state.e[i]}</th><th>{this.state.uni[i]}</th><th><input type="button" name={i} value = "delete" onClick={this.handledelclick}/></th></tr>);
            }
            return facdata;
        };




        //console.log(this.state.u.length+"...."+this.state.pa.length+"...."+this.state.e.length+"...."+this.state.uni.length)
        return (
        
        <div><h1 className="head">All Faculty Details</h1><table className="tt1">
        <tr className="tad">
        <th>USERNAME</th>
        <th>PASSWORD</th>
        <th>EMAIL</th>
        <th>UNIQUEID</th>
        </tr>
        {facdatalis()}
        </table>
        </div>
        )
    }
}
export default Admin
