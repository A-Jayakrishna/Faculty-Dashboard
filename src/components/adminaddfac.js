import React from "react";
import PropTypes from "prop-types";
import "./adminaddfaccss.css"

class Adminadd extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }
    constructor(props) {
        super(props);
          this.state = { user1:'',pass1:'',u:[],pa:[],e:[],uni:[],values:[],cls:[],sub:[],yer:[],user:'',pass:'',email:'',uniid:'',adval:'',curyer:'',curcls:'',cursub:'',count:0}
          this.handleselect = this.handleselect.bind(this);
          
    }

    createUI(){
       ////////////////////////////////////////////////////////////////////////////////
       
       const clsdata = () => {
         let clsdatalis = []
         switch(this.state.curyer) {
            case '1':
               clsdatalis.push(<option>__select__</option>)
               clsdatalis.push(<option>CSE_A</option>)
               clsdatalis.push(<option>CSE_B</option>)
               clsdatalis.push(<option>CSE_C</option>)
               clsdatalis.push(<option>CSE_D</option>)
               return clsdatalis;
            case '2':
               clsdatalis.push(<option>__select__</option>)
               clsdatalis.push(<option>CSE_A</option>)
               clsdatalis.push(<option>CSE_B</option>)
               clsdatalis.push(<option>CSE_C</option>)
               return clsdatalis;
            case '3':
               clsdatalis.push(<option>__select__</option>)
               clsdatalis.push(<option>CSE_A</option>)
               clsdatalis.push(<option>CSE_B</option>)
               return clsdatalis;
            case '4':
               clsdatalis.push(<option>__select__</option>)
               clsdatalis.push(<option>CSE_A</option>)
               return clsdatalis;
            default:
               clsdatalis.push(<option>__select year first__</option>)
               return 'foo';
          }
         };


         const clssub = () => {
            let clssublis = []
            switch(this.state.curyer) {
               case '1':
                  clssublis.push(<option>__select__</option>)
                  clssublis.push(<option>math</option>)
                  clssublis.push(<option>c</option>)
                  clssublis.push(<option>oops</option>)
                  clssublis.push(<option>ds</option>)
                  return clssublis;
               case '2':
                  clssublis.push(<option>__select__</option>)
                  clssublis.push(<option>dc</option>)
                  clssublis.push(<option>daa</option>)
                  clssublis.push(<option>python</option>)
                  clssublis.push(<option>evs</option>)
                  return clssublis;
               case '3':
                  clssublis.push(<option>__select__</option>)
                  clssublis.push(<option>cloud</option>)
                  clssublis.push(<option>android</option>)
                  clssublis.push(<option>se</option>)
                  clssublis.push(<option>cd</option>)
                  return clssublis;
               case '4':
                  clssublis.push(<option>__select__</option>)
                  clssublis.push(<option>ml</option>)
                  clssublis.push(<option>ai</option>)
                  clssublis.push(<option>pr</option>)
                  clssublis.push(<option>ssk</option>)
                  return clssublis;
               default:
                  clssublis.push(<option>__select year first__</option>)
                  return 'foo';
             }
            };

        return this.state.values.map((i) => 
           <div className="adfaccls">Year:
                   <select className="ye" name="year" onChange={this.handleselect}>
                   <option>__select__</option>
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                   </select>
              Class :
                   <select className="class1" name="class" onChange={this.handleselect}>
                       {clsdata()}
                   </select>
              Subject :
                   <select className="subbu" name="subject" onChange={this.handleselect}>
                        {clssub()}
                   </select><br></br>
                   <br></br>
                   <input  className="bubu" type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
               </div>          
        )
     }
     handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
     }
     
     addClick(){
      if(this.state.count>0){
         if((this.state.curyer != '') & (this.state.curcls != '') & (this.state.cursub != '')){
            this.state.cls.push(this.state.curcls)
            this.state.yer.push(this.state.curyer)
            this.state.sub.push(this.state.cursub)
            console.log(this.state.yer)
            console.log(this.state.cls)
            console.log(this.state.sub)
            this.setState({curcls:''})
            this.setState({curyer:''})
            this.setState({cursub:''})
            this.setState(prevState => ({ values: [...prevState.values, '']}))
         }
         else{
            alert("please select all columns")
         }
      }
      else{
         this.setState(prevState => ({ values: [...prevState.values, '']}))
         this.setState({count:2})
      }
     }

     removeClick(i){
        let values = [...this.state.values];
        values.splice(i,1);
        this.setState({ values });
     }

     handleselect(event){
         if(event.target.name === "class")
         {
            //this.state.cls.push(event.target.value)
            this.setState({curcls:event.target.value})
         }
         else{
            if(event.target.name === "year")
            {
               //this.state.yer.push(event.target.value)
               this.setState({curyer:event.target.value})
            }
            else{
               //this.state.sub.push(event.target.value)
               this.setState({cursub:event.target.value})
            }
         }
         //console.log(this.state.cls+"...."+this.state.sub)
         
     }

     handledatachange(event){
        if(event.target.name === "u")
        {
           this.setState({user:event.target.value})
        }
        if(event.target.name === "p")
        {
           this.setState({pass:event.target.value})
        }
        if(event.target.name === "e")
        {
           this.setState({email:event.target.value})
        }
        if(event.target.name === "ui")
        {
           this.setState({uniid:event.target.value})
        }
     }


     handlesubmit(e){
      if((this.state.curyer != '') & (this.state.curcls != '') & (this.state.cursub != '')){
         this.state.cls.push(this.state.curcls)
         this.state.yer.push(this.state.curyer)
         this.state.sub.push(this.state.cursub)
         console.log(this.state.yer)
         console.log(this.state.cls)
         console.log(this.state.sub)
         this.setState({curcls:'',
         curyer:'',
         cursub:''}, function(){
            var data= new URLSearchParams();
        data.append("user",this.state.user)
        data.append("pass",this.state.pass)
        data.append("email",this.state.email)
        data.append("uniid",this.state.uniid)
        data.append("cls",JSON.stringify(this.state.cls))
        data.append("yer",JSON.stringify(this.state.yer))
        data.append("sub",JSON.stringify(this.state.sub))
        fetch("http://localhost:8081/addfacdata",{
          method:'post',
          body:data
        })
        .then(response =>{return response.json()})
        .then(response =>{this.setState({adval:response.val})
          if(this.state.adval == 'yes'){
            alert(this.state.adval)
          }
          else{
            alert(this.state.adval)
          }
          
        })
         })
         this.setState({})
         this.setState({cursub:''})
         
      }
      else{
         alert("please select all columns")
      }
        e.preventDefault();
        
     }
    
    render() {
      this.state.user1 = this.props.location.state.user;
      this.state.pass1 = this.props.location.state.pass;
      this.state.u=JSON.parse(this.props.location.state.u);
      this.state.pa=JSON.parse(this.props.location.state.pa);
      this.state.e=JSON.parse(this.props.location.state.e);
      this.state.uni=JSON.parse(this.props.location.state.uni);

        return (
        <div>
            <h1 className="head1">Creating faculty database</h1>
            <div className="det"><p className='u'>Username :</p> <input className="name"  name="u" type = "text" value = {this.state.user} onChange={this.handledatachange.bind(this)}/><br></br>
            <p className='p'>Password :</p>  <input className="name" name="p" type = "text" value = {this.state.pass} onChange={this.handledatachange.bind(this)}/><br></br>
            <p className='e'>Email :</p> <input className="email" name="e" type = "email" value = {this.state.email} onChange={this.handledatachange.bind(this)}/><br></br>
            <p className='uid'>Unique Id : </p> <input className="id" name="ui" type = "text" value = {this.state.uniid} onChange={this.handledatachange.bind(this)}/></div><br></br>
            {this.createUI()}
            <div className="buu"><input className="addc" type='button' value='add classes' onClick={this.addClick.bind(this)}/>
            <input className="subii" type='button' value='submit' onClick={this.handlesubmit.bind(this)}/></div>
        </div>
        )
    }
}
export default Adminadd
