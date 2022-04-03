const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https");
const { jar } = require("request");



var app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",function(req,res){
   res.sendFile(__dirname+"/sinup.html")
})
app.post("/",function(req,res){
    
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email

    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname 
                }
            }
        ]
    }
    const jasonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/2fc2707295"
    const Options = {
         method: "POST",
         auth: "naveen:ea14610f033be1e3e2821c01a336dfa3-us14"
    }

    const request = https.request(url,Options,function(response){
        
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/succcess.html")
        }
        else{
            res.sendFile(__dirname+"/failer.html")
        }
    })
    request.write(jasonData)
    request.end();


    console.log(fname)
    console.log(lname)
    console.log(email)
})
app.listen(3000,function(){
    console.log("server is running at port 3000")
})

// api =  














