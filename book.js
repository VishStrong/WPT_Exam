const express=require('express');

const app=express();
const mysql = require('mysql2');
app.use(express.static("cd"));

app.get("/getinfo",(req,res)=>{
    console.log("info ajax call working");
    let dbparams={
        host:"localhost",
        user:"root",
        password:"cdac",
        database:"bookshop",
        port:3306
    }

    const con=mysql.createConnection(dbparams);

    let output={status:false,bookinfo:{bookid:0,bookname:"",price:0}}

    let bookid=req.query.bookid;
    con.query("select bookid,bookname,price from book where bookid =?",[bookid],
    (err,rows)=>{
        if(err)
        console.log(err);
        else
        {
            if(rows.length>0)
            {
                output.status=true;
                output.bookinfo=rows[0];
            }
        }
        res.send(output);
    })


})//server logic end for getinfo


app.get("/updateinfo",(req,res)=>{
    console.log("update ajax call working");
    let dbparams={
        host:"localhost",
        user:"root",
        password:"cdac",
        database:"bookshop",
        port:3306
    }

    const con=mysql.createConnection(dbparams);

    let output={status:false}

    let bookid=req.query.bookid;
    let bookname=req.query.bookname;
    let price=req.query.price
    con.query("update book set bookid=?, bookname=?,price=? where bookid=?",[bookid,bookname,price,bookid],
    (err,resp)=>{
        if(err)
        console.log(err);
        else
        {
            if(resp.affectedRows>0)
            {
                output.status=true;
            }
        }
        res.send(output);
    })


})

app.listen(200,()=>{
    console.log("listening on port 200");
})
