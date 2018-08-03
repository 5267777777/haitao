<?php
 header("content-type:text/html; charset=utf-8");
 $uname = $_POST['uname'];
 $upwd = $_POST['upwd'];
 
 $db = mysql_connect('localhost','root','root');
 mysql_select_db('db1808a',$db);
 mysql_query('set names utf-8');
 
 $sql = "SELECT * FROM `users` WHERE uname = '$uname'";
 
 $set = mysql_query($sql);
 $arr = mysql_fetch_array($set);
 
 if($uname == $arr['uname']){
 	if($upwd == $arr['upwd']){
 		echo "<script>alert('登陆成功'); window.location='showScore.php';</script>";
 		
 	}else{
 		echo "<script>alert('密码错误'); window.location='login.html';</script>";
 		
 	};
 }else{
 	echo "<script>alert('用户不存在'); window.location='login.html';</script>";
 }
