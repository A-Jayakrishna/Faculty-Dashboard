import React,{Component} from 'react';
import 'react-mdl/extra/material.css';
import Pdf from './Ac.pdf';
import PropTypes from "prop-types";
import "./addleavecss.css";

class Adleave extends Component{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }
    constructor(props) {
        super(props);
          this.state = { id:[],fdate:[],tdate:[],sub:[],rea:[],typ:[],check:[],newid:[],id1:[],fdate1:[],tdate1:[],sub1:[],rea1:[],typ1:[]}
          this.addlev = this.addlev.bind(this)
          this.updatelev = this.updatelev.bind(this)
    }
    
    addlev(event){
        if(event.target.name === "true"){
            this.state.check.push(parseInt(event.target.value))
            event.target.name = "false"
            console.log(event.target.value)
        }
        else{
            event.target.name = "true"
            this.state.check.pop(parseInt(event.target.value))
        }
    }


    updatelev(event){
        if(this.state.check.length === 0){
            alert("mark the leave first")
        }
        else{
            console.log(this.state.check)
            var i
            for(i=0;i<this.state.check.length;i++){
                this.state.newid.push(this.state.id[this.state.check[i]])
            }
            if( i===this.state.check.length ){
                console.log(this.state.newid)
                var data= new URLSearchParams();
                data.append("newid",JSON.stringify(this.state.newid))
                fetch("http://localhost:8081/updatelev",{
                    method:'post',
                    body:data
                })
                .then(response =>{return response.json()})
                .then(response =>{
                    this.setState({id1:response.id})
                    this.setState({fdate1:response.fdate})
                    this.setState({tdate1:response.tdate})
                    this.setState({sub1:response.sub})
                    this.setState({rea1:response.rea})
                    this.setState({typ1:response.typ})   
                    this.props.history.push({pathname:'/adlev',state: { user: this.props.location.state.user,pass:this.props.location.state.pass,u:JSON.stringify(this.props.location.state.u),pa:JSON.stringify(this.props.location.state.pa),e:JSON.stringify(this.props.location.state.e),uni:JSON.stringify(this.props.location.state.uni),id:JSON.stringify(this.state.id1),fdate:JSON.stringify(this.state.fdate1),tdate:JSON.stringify(this.state.tdate1),sub:JSON.stringify(this.state.sub1),rea:JSON.stringify(this.state.rea1),typ:JSON.stringify(this.state.typ1)}});
            })
            }
        }
    }


    render(){
        this.state.id=JSON.parse(this.props.location.state.id);
        this.state.fdate=JSON.parse(this.props.location.state.fdate);
        this.state.tdate=JSON.parse(this.props.location.state.tdate);
        this.state.sub=JSON.parse(this.props.location.state.sub);
        this.state.rea=JSON.parse(this.props.location.state.rea);
        this.state.typ=JSON.parse(this.props.location.state.typ);

        let faclev = [];

        const faclevlis = () => {
            for (let i = 0; i < this.state.id.length; i++) {
            faclev.push(<tr><th>{this.state.id[i]}</th><th>{this.state.fdate[i]}</th><th>{this.state.tdate[i]}</th><th>{this.state.sub[i]}</th><th>{this.state.rea[i]}</th><th>{this.state.typ[i]}</th><th><input type="checkbox" id="ch" value={i} name="true" onClick={this.addlev}/></th></tr>);
            }
            return faclev;
        };

        return(
            <div> 
                <h1 className="head7">Leaves of Faculty</h1>
                <div className="bub"><a className="acc3" href={Pdf} target="_blank"> Academic calender </a>
                <input className="boba" type="button" value="Approve leave" onClick={this.updatelev} /></div>
                <table className="tt4" >
                <tr className="head9">
                <th>Faculty id</th>
                <th>Leave from</th>
                <th>Leave till</th>
                <th>Leave subject</th>
                <th>Leave reason</th>
                <th>Leave stage</th>
                <th> Check to approve</th>
                </tr>
                {faclevlis()}
            </table>
            </div>
        
        )
    }
}
export default Adleave;