var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require("body-parser");
var randomstring = require("randomstring");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))

console.log('hello');
var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "somepass",
  port     : "3306",
  database : "databasename"
  });
connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/forgotpass', function (req, res) {
    
    var fpmail=req.body.fmail;
    suc = 0;
    console.log(fpmail);
    msg = 'nothing';
    
    connection.query('SELECT count(*) as val FROM login WHERE login.email="'+fpmail+'";', function (error, results, fields) {
      if (error) throw error;
      console.log(results[0].val)
      if(results[0].val===0){
        msg = 'email doesnot exist'
        console.log(msg)
      }
      else{
        str = randomstring.generate(8);
        console.log(str)
        connection.query('update login set password = "'+str+'" where login.email="'+fpmail+'";', function (error, results, fields) {
          if (error) throw error;
          else{
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'gmailaccount', //username and password for gmail account
                pass: 'password for account',
              }
            });
      
            var mailOptions = {
              from: 'abc@gmail.com', // some gmail
              to: fpmail,
              subject: 'created a new password',
              text: 'Password : '+str
            };
            
      
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                suc = 1;
                msg = "sent"
                console.log(msg)
              }
            });
          }
        });
        
      }
      
  });

  
    

      setTimeout(ending, 5000);

      function ending(){
        // connection.end()
        if(suc === 1){
          res.send({sucess:"sent"})
        }
        else{
          res.send({sucess:msg})
        }
        res.end();
      }
      
      
});
app.post('/flogincheck', function (req, res){
  var user=req.body.user;
  var pass=req.body.pass;
  console.log(user+'...'+pass)
  msg = 'no'
  id = '__'
  connection.query('select count(*) as val from login where login.username = "'+user+'" and login.password = "'+pass+'";', function (error, results, fields) {
    if (error) throw error;
    else{
      if(results[0].val===1){
        connection.query('select uniqueid as val from login where login.username = "'+user+'" and login.password = "'+pass+'";', function (error, resu, fields) {
          if (error) throw error;
          else{
            id = resu[0].val
          }
        });
        msg = 'yes'
        console.log(msg)
      }
      
    }
  });
  setTimeout(ending, 250);

  function ending(){
  res.send({val:msg,id:id})
  res.end
  }
});
app.post('/adlogincheck', function (req, res){
  var user=req.body.user;
  var pass=req.body.pass;
  console.log(user+'...'+pass)
  msg = 'no'
  var u = []
  var p = []
  var e = []
  var uni = []
  var recdata
  connection.query('select count(*) as val from adlogin where adlogin.username = "'+user+'" and adlogin.password = "'+pass+'";', function (error, results, fields) {
    if (error) throw error;
    else{
      if(results[0].val===1){
        msg = 'yes'
        console.log(msg)
        connection.query('select * from login;',function (error,facdata,fields){
          if(error) throw error;
          else{
            var i = facdata.length;
            for(var j = 0;j<i;j++){
              u.push(facdata[j].username)
              p.push(facdata[j].password)
              e.push(facdata[j].email)
              uni.push(facdata[j].uniqueid)
            }
            console.log(u.length+"..."+p.length+"..."+e.length+"..."+uni.length)
            recdata = JSON.stringify({val:msg,u:u,p:p,e:e,uni:uni})
          }
        });
        
      }
      else{
        recdata = JSON.stringify({val:msg}) 
      }
      
    }
  });
  setTimeout(ending, 1000);

  function ending(){
  res.send(recdata)
  res.end
  }
});
app.post('/getdata', function (req, res){
  var id = req.body.id;
  var y=[]
  var t=[]
  var cls=[]
  var subject = []
  var recdata

  var mess = []
  var wri = []
  var dat = []

  connection.query('select year,class,total,sub from classes where uniqueid="'+id+'";', function (error, facdata, fields) {
    if (error) throw error;
    else{
      var i = facdata.length
      for(var j = 0;j<i;j++){
        
        t.push(facdata[j].total)
        y.push(facdata[j].year)
        cls.push(facdata[j].class)
        subject.push(facdata[j].sub)
       
      }
    }
  });

  connection.query('select uniqueid,message,DATE_FORMAT(dateent,"%d %m %Y") as dat from notify;', function (error, msgdata, fields) {
    if (error) throw error;
    else{
      var i1 = msgdata.length
      for(var j1 = 0;j1<i1;j1++){
        
        wri.push(msgdata[j1].uniqueid)
        mess.push(msgdata[j1].message)
        dat.push(msgdata[j1].dat)
       //console.log(dat)
      }
    }
  });

  setTimeout(endi, 1500);
  function endi(){
    recdata = JSON.stringify({class:cls,year:y,subject:subject,t:t,mess:mess,wri:wri,dat:dat})
    res.send(recdata);
    res.end()
  }
});

app.post('/addnotif', function (req, res){

  var id = req.body.id
  var msg = req.body.msg
  
  var mess = []
  var wri = []
  var dat = []

  connection.query('insert into notify values ("'+id+'","'+msg+'",curdate());', function (error, msgsent, fields) {
    if (error) throw error;
    else{
      connection.query('select uniqueid,message,DATE_FORMAT(dateent,"%d %m %Y") as dat from notify;', function (error, msgdata, fields) {
        if (error) throw error;
        else{
          var i1 = msgdata.length
          for(var j1 = 0;j1<i1;j1++){
            
            wri.push(msgdata[j1].uniqueid)
            mess.push(msgdata[j1].message)
            dat.push(msgdata[j1].dat)
           console.log(dat)
          }
        }
      });
    }
  });

  setTimeout(fin, 1000);
  function fin(){
    recdata = JSON.stringify({mess:mess,wri:wri,dat:dat})
    res.send(recdata);
    res.end()
  }
});

app.post('/getclassdata', function (req, res){

  var cls = req.body.cls
  var sub = req.body.sub
  var yer = req.body.yer
  var cla = cls+yer
  var n = []
  var sid = []
  var att = []

  connection.query('select name as names,id as studid,'+sub+' as subject from '+cla+';', function (error, clsdata, fields) {
    if (error) throw error;
    else{
      var i = clsdata.length
      for(var j =0;j<i;j++){
        n.push(clsdata[j].names)
        sid.push(clsdata[j].studid)
        att.push(clsdata[j].subject)
      }
      console.log(n.length+"..........."+sid.length+'.....'+att.length)
    }
  });
  setTimeout(fin, 1000);
  function fin(){
    recdata = JSON.stringify({n:n,sid:sid,att:att})
    //console.log(sid)
    //console.log(mrk)
    res.send(recdata);
    res.end()
  }
});

app.post('/updateatt', function (req, res){
  var cls = req.body.cls
  var yer = req.body.yer
  var sub = req.body.sub
  var tot = parseInt(req.body.tot)+1
  var cla = cls+yer
  var sid = JSON.parse(req.body.newsid)
  var att = JSON.parse(req.body.newatt)
  var n = []
  var sid1 = []
  var att1 = []
  console.log(cls+"......."+yer+".........."+sub)
  console.log("sid ......"+sid.length)
  console.log(tot)
  connection.query('update classes set total='+tot+' where year="'+yer+'" and class="'+cls+'" and sub="'+sub+'";', function (error, clsdata, fields) {
    if (error) throw error;
    else{
      var i
  for(i=0;i<sid.length;i++){
    connection.query('update '+cla+' set '+sub+'='+att[i]+' where id = '+sid[i]+';', function (error, clsdata, fields) {
      if (error) throw error;
      else{
        console.log("updated...."+sid[i])
      }
    });
  }
  console.log("i..."+i)
  if(i === sid.length){
    connection.query('select name as names,id as studid,'+sub+' as subject from '+cla+';', function (error, clsdata, fields) {
      if (error) throw error;
      else{
        var i2 = clsdata.length
        for(var j =0;j<i2;j++){
          n.push(clsdata[j].names)
          sid1.push(clsdata[j].studid)
          att1.push(clsdata[j].subject)
        }
        console.log(n.length+"..........."+sid1.length+'.....'+att1.length)
      }
    });
    setTimeout(finatt, 1000);
  }
    }
  });
  
  function finatt(){
    recdata = JSON.stringify({n:n,sid:sid1,att:att1,tot:tot})
    res.send(recdata);
    res.end()
  }

});

app.post('/getclassmarks', function (req, res){

  var cls = req.body.cls
  var sub = req.body.sub
  var yer = req.body.yer
  var cla = cls+sub
  var sid = []
  var p1 = []
  var p2 = []
  var ca = []
  var sem = []

  connection.query('select * from '+cla+';', function (error, clsdata, fields) {
    if (error) throw error;
    else{
      var i = clsdata.length
      for(var j =0;j<i;j++){
        console.log(clsdata[j].id)
        sid.push(clsdata[j].id)
        p1.push(clsdata[j].p1)
        p2.push(clsdata[j].p2)
        ca.push(clsdata[j].ca)
        sem.push(clsdata[j].sem)
      }
    }
  });
  setTimeout(fin, 1000);
  function fin(){
    recdata = JSON.stringify({sid:sid,p1:p1,p2:p2,ca:ca,sem:sem})
    res.send(recdata);
    res.end()
  }
});



app.post('/addclassmarks', function (req, res){

  var cls = req.body.cls
  var sub = req.body.sub
  var yer = req.body.yer
  var cla = cls+sub
  var sid = JSON.parse(req.body.sid)
  var p1 = JSON.parse(req.body.p1)
  var p2 = JSON.parse(req.body.p2)
  var ca = JSON.parse(req.body.ca)
  var sem = JSON.parse(req.body.sem)

  var i = 0
  for(i=0;i<sid.length;i++){
    //console.log(sid[i]+" "+p1[i]+" "+p2[i]+" "+ca[i]+" "+sem[i])
    connection.query('update '+cla+' set p1='+p1[i]+',p2='+p2[i]+',ca='+ca[i]+',sem='+sem[i]+' where id = '+sid[i]+';', function (error, clsdata, fields) {
      if (error) throw error;
    });
  }
  if(sid.length === i){
    fin()
  }
  
  function fin(){
    recdata = JSON.stringify({out:"uploaded"})
    res.send(recdata);
    res.end()
  }
});



app.post('/gettt', function (req, res){

  var cls = req.body.cls
  var yer = req.body.yer
  var cla = cls+yer+"tt"
  var day = []
  var per1 = []
  var per2 = []
  var per3 = []
  var per4 = []
  var per5 = []
  var per6 = []
  var per7 = []
  var per8 = []
  var per9 = []

  connection.query('select * from '+cla+';', function (error, clstdata, fields) {
    if (error) throw error;
    else{
      var i = clstdata.length
      for(var j =0;j<i;j++){
        day.push(clstdata[j].day)
        per1.push(clstdata[j].per1)
        per2.push(clstdata[j].per2)
        per3.push(clstdata[j].per3)
        per4.push(clstdata[j].per4)
        per5.push(clstdata[j].per5)
        per6.push(clstdata[j].per6)
        per7.push(clstdata[j].per7)
        per8.push(clstdata[j].per8)
        per9.push(clstdata[j].per9)
      }
    }
  });
  setTimeout(fin, 1000);
  function fin(){
    recdata = JSON.stringify({day:day,per1:per1,per2:per2,per3:per3,per4:per4,per5:per5,per6:per6,per7:per7,per8:per8,per9:per9})
    res.send(recdata);
    res.end()
  }
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/addfacdata', function (req, res){
  var user = req.body.user
  var pass = req.body.pass
  var email = req.body.email
  var uniid = req.body.uniid
  var cls = JSON.parse(req.body.cls)
  var yer = JSON.parse(req.body.yer)
  var sub = JSON.parse(req.body.sub)
  var data = [[user,pass,email,uniid]]
  var msg = 'no'
  connection.query('SELECT count(*) as val FROM login WHERE login.uniqueid="'+uniid+'" or login.username="'+user+'";', function (error, results, fields) {
    if (error) throw error;
    else{
      if(results[0].val === 0){
        connection.query('insert into login (username,password,email,uniqueid) values ?',[data], function (error, clsdata, fields) {
          if (error) throw error;
          else{
            msg = 'yes'
          }
        });
        var i = cls.length
        var temp
        for(var j=0;j<i;j++){
          temp = [[yer[j],cls[j],0,sub[j],uniid]]
          connection.query('insert into classes (year,class,total,sub,uniqueid) values ?',[temp], function (error, clsdata, fields) {
          if (error) throw error;
          });
        }
        // console.log(cls[0])
      }
      else{
        console.log("data exists")
        msg = 'data exists'
      }
    }
  });
  setTimeout(fin, 1000);

  function fin(){
    res.send({val:msg})
    res.end()
  }
  
});

app.post('/delfacdata', function (req, res){
  var uniid = req.body.uniid
  var u = []
  var p = []
  var e = []
  var uni = []
  var msg = 'no'
  var recdata
  connection.query('delete from login where uniqueid="'+uniid+'";', function (error, clsdata, fields) {
    if (error) throw error;
    else{
      connection.query('select * from login;',function (error,facdata,fields){
        if(error) throw error;
        else{
          var i = facdata.length;
          for(var j = 0;j<i;j++){
            u.push(facdata[j].username)
            p.push(facdata[j].password)
            e.push(facdata[j].email)
            uni.push(facdata[j].uniqueid)
          }
          console.log(u.length+"..."+p.length+"..."+e.length+"..."+uni.length)
          msg = 'yes'
          recdata = JSON.stringify({val:msg,u:u,p:p,e:e,uni:uni})
        }
      });
      connection.query('SELECT count(*) as val FROM classes WHERE classes.uniqueid="'+uniid+'";', function (error, results, fields) {
        if (error) throw error;
        else{
          if(results[0].val > 0){
            connection.query('delete from classes where classes.uniqueid="'+uniid+'";', function (error, delclass, fields) {
              if (error) throw error;
            });
          }
        }
      });
    }
  });
  setTimeout(ending, 1000);

  function ending(){
    if(msg === 'yes'){
      res.send(recdata)
    }
    else{
      recdata = JSON.stringify({val:msg})
      res.send(recdata)
    }
    res.end()
  }
});


app.post('/applyleave', function (req, res){

  var id = req.body.id
  var fdate = req.body.fdate
  var tdate = req.body.tdate
  var sub = req.body.sub
  var rea = req.body.rea
  console.log(id+"...."+fdate+"...."+tdate+"...."+sub+"...."+rea)
  var out = "not applied"
  var typ = "pending"
  var admail
  var data = [[id,fdate,tdate,sub,rea,typ]]

  connection.query('select uniqueid from fleaves where uniqueid = "'+id+'";', function (error, levdata, fields) {
    if (error) throw error;
    else
    {
      if(levdata.length === 0){
            connection.query('insert into fleaves (uniqueid,fdate,tdate,sub,res,typ) values ?',[data], function (error, lappdata, fields) {
              if (error) throw error;
              else{
                out = "applied"
                connection.query('select email from adlogin ;', function (error, admaildata, fields) {
                  if (error) throw error;
                  else{
                    admail = admaildata[0].email
                    sendmail()
                  }
                });
              }
            });
      }
      else{
        out="cannot apply more than 1 leave at a time"
        ending()
      }
    }
  });
  function sendmail(){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'trailacc1140',
        pass: 'TestTrailaccount#1',
      }
    });

    var mailOptions = {
      from: 'trialacc1140@gmail.com',
      to: admail,
      subject: "requesting leave for :"+id,
      text: sub+" "+rea
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        suc = 1;
        msg = "sent"
        console.log(msg)
      }
    });
    ending()
  }
  function ending(){
    var recdate = JSON.stringify({applied:out})
    res.send(recdate)
    res.end()
  }
});

app.post('/getleaves', function (req, res){

  var id = req.body.id
  var fdate = ''
  var tdate = ''
  var sub = ''
  var rea = ''
  var typ = ''
  connection.query('select * from fleaves where uniqueid = "'+id+'";', function (error, levdata, fields) {
    if (error) throw error;
    else
    {
      if(levdata.length>0){
        fdate = levdata[0].fdate
        tdate = levdata[0].tdate
        sub = levdata[0].sub
        rea = levdata[0].res
        typ = levdata[0].typ
      }
      ending()
    }
  });
  
  function ending(){
    var recdate = JSON.stringify({fdate:fdate,tdate:tdate,sub:sub,rea:rea,typ:typ})
    res.send(recdate)
    res.end()
  }
});

app.post('/getallleaves', function (req, res){


  var user = req.body.user
  var pass = req.body.pass
  var id = []
  var fdate = []
  var tdate = []
  var sub = []
  var rea = []
  var typ = []
  connection.query('select count(*) as val from adlogin where adlogin.username = "'+user+'" and adlogin.password = "'+pass+'";', function (error, results, fields) {
    if (error) throw error;
    else{
      if(results[0].val === 1){
        connection.query('select * from fleaves where typ = "pending";', function (error, levdata, fields) {
          if (error) throw error;
          else
          {
            var i = levdata.length
            if(i>0){
              for(var j = 0;j<i;j++)
              {
                id.push(levdata[j].uniqueid)
                fdate.push(levdata[j].fdate)
                tdate.push(levdata[j].tdate)
                sub.push(levdata[j].sub)
                rea.push(levdata[j].res)
                typ.push(levdata[j].typ)
              }
            }
          }
        });
      }
    }
  });
  setTimeout(ending, 1000);
  function ending(){
    var recdate = JSON.stringify({id:id,fdate:fdate,tdate:tdate,sub:sub,rea:rea,typ:typ})
    res.send(recdate)
    res.end()
  }
});


app.post('/updatelev', function (req, res){

  var id1 = JSON.parse(req.body.newid)
  var temp = id1.length
  var id = []
  var fdate = []
  var tdate = []
  var sub = []
  var rea = []
  var typ = []
  var j = 0
  for(j = 0;j<temp;j++){
    connection.query('update fleaves set typ = "approved" where uniqueid = "'+id1[j]+'"', function (error, results, fields) {
      if (error) throw error;
      });
  }
  setTimeout(getdata, 500);
  function getdata(){
        connection.query('select * from fleaves where typ = "pending";', function (error, levdata, fields) {
          if (error) throw error;
          else
          {
            var i = levdata.length
            if(i>0){
              for(var j = 0;j<i;j++)
              {
                id.push(levdata[j].uniqueid)
                fdate.push(levdata[j].fdate)
                tdate.push(levdata[j].tdate)
                sub.push(levdata[j].sub)
                rea.push(levdata[j].res)
                typ.push(levdata[j].typ)
              }
            }
          }
        });
      }
  setTimeout(ending, 1000);
  function ending(){
    var recdate = JSON.stringify({id:id,fdate:fdate,tdate:tdate,sub:sub,rea:rea,typ:typ})
    res.send(recdate)
    res.end()
  }
});


app.listen(8081);
