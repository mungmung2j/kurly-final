<?php
    //sjm6715.dothome.co.kr/kurly_week_11/member_signup_insert_test1.php
    //sjm6715.com/kurly_week_11/member_signup_insert_test1.php

    $db_server='localhost';
    $db_user_name='sjm6715';
    $db_user_pw='s2119s6715*';
    $db_name='sjm6715';
    //데이터베이스 접속(connection)
    $conn=mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
    mysqli_set_charset($conn,'utf8');

    if($conn==true){
        echo "데이터베이스 접속 성공!";
    }
    else{
        echo "데이터베이스 접속 실패!";
    }
?>