<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $db_server='localhost';
    $db_user_name='sjm6715';
    $db_user_pw='s2119s6715*';
    $db_name='sjm6715';
    $conn=mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
    mysqli_set_charset($conn,'utf8');

    //리액트 회원가입 폼 데이터 => 회원가입 테이블에 저장하기
    //kurly_signup_table_11
    $userId         =$_POST['userId'];
    $userPw         =$_POST['userPw'];
    $userName       =$_POST['userName'];
    $userEmail      =$_POST['userEmail'];
    $userHp         =$_POST['userHp'];
    $userAddr1      =$_POST['userAddr1'];
    $userAddr2      =$_POST['userAddr2'];
    $userGender     =$_POST['userGender'];
    $userBirth      =$_POST['userBirth'];
    $userChooga     =$_POST['userChooga'];
    $userChoogaId   =$_POST['userChoogaId'];
    $userChoogaEvent=$_POST['userChoogaEvent'];
    $userService    =$_POST['userService'];

    //데이터베이스 테이블에 저장(SQL => MYSQL)
    $sql="INSERT INTO kurly_signup_table_11 (userId, userPw, userName, userEmail, userHp, userAddr1, userAddr2, userGender, userBirth, userChooga, userChoogaId, userChoogaEvent, userService)
          VALUES ('$userId', '$userPw', '$userName', '$userEmail', '$userHp', '$userAddr1', '$userAddr2', '$userGender', '$userBirth', '$userChooga', '$userChoogaId', '$userChoogaEvent', '$userService')";

    //SQL 실행
    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo "회원 가입 데이터 테이블에 저장 성공!"; //응답
    }
    else{
        echo "회원 가입 데이터 테이블에 저장 실패!"; //응답
    }

?>