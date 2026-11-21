const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors()); app.use(express.json());
const DB = path.join(__dirname, 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'jaiswal-demo-secret-change-this';
function users(){ try { return JSON.parse(fs.readFileSync(DB,'utf8')); } catch { return []; } }
function save(data){ fs.writeFileSync(DB, JSON.stringify(data,null,2)); }
app.get('/api/health',(_,res)=>res.json({ok:true,service:'Jaiswal Fertilizer API'}));
app.post('/api/auth/login',(req,res)=>{
 const {name,mobile}=req.body||{};
 if(!name?.trim() || !/^\d{10}$/.test(mobile||'')) return res.status(400).json({message:'Enter your name and valid 10-digit mobile number.'});
 const list=users(); let user=list.find(u=>u.mobile===mobile);
 if(!user){user={id:Date.now().toString(),name:name.trim(),mobile,createdAt:new Date().toISOString()};list.push(user);}
 else {user.name=name.trim();}
 save(list);
 const token=jwt.sign({id:user.id,mobile:user.mobile,name:user.name},JWT_SECRET,{expiresIn:'7d'});
 res.json({token,user});
});
app.get('/api/auth/me',(req,res)=>{
 const token=(req.headers.authorization||'').replace('Bearer ','');
 try {res.json({user:jwt.verify(token,JWT_SECRET)});} catch {res.status(401).json({message:'Please sign in again.'});}
});
const port=process.env.PORT||4000; app.listen(port,()=>console.log(`API ready on http://localhost:${port}`));
