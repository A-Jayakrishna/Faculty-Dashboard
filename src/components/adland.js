import React from "react";
import 'react-mdl/extra/material.css';
import {Layout,Header,Navigation,Drawer,Content} from 'react-mdl';
//import Main from './components/main';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {Switch,Route} from 'react-router-dom';
import PropTypes from "prop-types";
import Admin from './admin'
import Adleave from './addleave'
import Adminadd from './adminaddfac'
class Adland extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }
    constructor(props) {
        super(props);
        this.state = { user:'',pass:'',u:[],pa:[],e:[],uni:[], user1:'',pass1:'',u1:[],pa1:[],e1:[],uni1:[],id:[],fdate:[],tdate:[],sub:[],rea:[],typ:[]}
        this.handleaclick = this.handleaclick.bind(this);
        this.handledclick = this.handledclick.bind(this);
        this.handlelclick = this.handlelclick.bind(this);
        this.handlelogout = this.handlelogout.bind(this);
    }

    handleaclick(e){
        this.props.history.push({pathname:'/adminadd',state: { user: this.state.user,pass:this.state.pass,u:JSON.stringify(this.state.u),pa:JSON.stringify(this.state.pa),e:JSON.stringify(this.state.e),uni:JSON.stringify(this.state.uni)}});
    }
    handledclick(e){
        var data= new URLSearchParams();
        data.append("user",this.state.user)
        data.append("pass",this.state.pass)  
         fetch("http://localhost:8081/adlogincheck",{
            method:'post',
            body:data
        })
        .then(response =>{return response.json()})
        .then(response =>{this.setState({adval:response.val})
        if(this.state.adval == 'yes'){
          //alert(this.state.adval)
          this.setState({u1:response.u})
          this.setState({pa1:response.p})
          this.setState({e1:response.e})
          this.setState({uni1:response.uni})
          //this.props.history.push('/admin');
          this.props.history.push({pathname:'/admin',state: { user: this.state.user,pass:this.state.pass,u:JSON.stringify(this.state.u1),pa:JSON.stringify(this.state.pa1),e:JSON.stringify(this.state.e1),uni:JSON.stringify(this.state.uni1)}});
        }
        else{
          alert("wrong credentials")
        }
        })
    }


    handlelclick(e){
        // this.props.history.push({pathname:'/Bio',state: { id: this.state.id ,c:this.state.c,p:this.state.p,s:this.state.s}});
        var data= new URLSearchParams();
        data.append("user",this.state.user)
        data.append("pass",this.state.pass)
            fetch("http://localhost:8081/getallleaves",{
              method:'post',
              body:data
            })
          .then(response =>{return response.json()})
          .then(response =>{console.log(response)
            this.setState({id:response.id})
            this.setState({fdate:response.fdate})
            this.setState({tdate:response.tdate})
            this.setState({sub:response.sub})
            this.setState({rea:response.rea})
            this.setState({typ:response.typ})   
            this.props.history.push({pathname:'/adlev',state: { user: this.state.user,pass:this.state.pass,u:JSON.stringify(this.state.u),pa:JSON.stringify(this.state.pa),e:JSON.stringify(this.state.e),uni:JSON.stringify(this.state.uni),id:JSON.stringify(this.state.id),fdate:JSON.stringify(this.state.fdate),tdate:JSON.stringify(this.state.tdate),sub:JSON.stringify(this.state.sub),rea:JSON.stringify(this.state.rea),typ:JSON.stringify(this.state.typ)}});       
            })

        
    }


    handlelogout(e){
        localStorage.clear("token")
        window.location.replace('/')
    }

    render() {
        this.state.user = this.props.location.state.user;
        this.state.pass = this.props.location.state.pass;
        this.state.u=JSON.parse(this.props.location.state.u);
        this.state.pa=JSON.parse(this.props.location.state.pa);
        this.state.e=JSON.parse(this.props.location.state.e);
        this.state.uni=JSON.parse(this.props.location.state.uni);

        return (
            <div className="demo-big-content">
    <Layout>
        <Header title="Faculty DashBoard - Admin page" scroll>
            <Navigation>
                <a onClick={this.handleaclick}>Add faculty</a>
                <a onClick={this.handledclick}>faculty details</a>
                <a onClick={this.handlelclick}>Faculty leave</a>
                <a onClick = {this.handlelogout}>Logout</a>
            </Navigation>
        </Header>
        <Content>
            <div className="page-content" />
            <Switch>
        <Route exact path = "/admin" component={Admin}/>
        <Route exact path = "/adlev" component={Adleave}/>
        <Route exact path = "/adminadd" component={Adminadd}/>
    </Switch>
        </Content>
    </Layout>
</div>
        )
    }
}
export default withRouter(Adland);