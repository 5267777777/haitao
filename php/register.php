<?php
  header("content-type:text/html;charset=utf-8");
  $uname = $_POST['uname'];
  $upwd = $_POST['upwd'];
  
  //链接数据库
  $db = mysql_connect("localhost","root","root");
  //选择数据库
  mysql_select_db("db1808a",$db);
  //编辑字符码
  mysql_query("set names utf-8");
  //创建sql
  $sql = "INSERT INTO `users`( `uname`, `upwd`) VALUES ('$uname',$upwd)";
  //执行sql语句
  $row = mysql_query($sql);
  
  if($row){
  	echo "<script>alert('注册成功'); location.href='login.html';</script>";
  }else{
  	echo "<script>alert('注册失败'); location.href='register.html';</script>";
  }
    
