<?php
    //sjm6715.dothome.co.kr/kurly_week_11/member_signup_insert_test2.php
    //sjm6715.com/kurly_week_11/member_signup_insert_test2.php
    $db_server='localhost';
    $db_user_name='sjm6715';
    $db_user_pw='s2119s6715*';
    $db_name='sjm6715';
    //데이터베이스 접속(connection)
    $conn=mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
    mysqli_set_charset($conn,'utf8');

    //회원가입데이터 => 회원가입 테이블에 저장하기
    //kurly_signup_table_11
    
    $userId='sjm6715';
    $userPw='s2119s6715*';
    $userName='신정명';
    $userEmail='sjm6715@naver.com';
    $userHp='010-2970-4426';
    $userAddr1='난곡로66 신림푸르지오2차';
    $userAddr2='102동 1002호';
    $userGender='남자';
    $userBirth='1998-04-24';
    $userChooga='친구초대 추천인 아이디';
    $userChoogaId='sjm6715';
    $userChoogaEvent='';
    $userService='이용약관 동의(필수), 개인정보 수집∙이용 동의(필수), 본인은 만 14세 이상입니다.(필수)';

    //데이터베이스 테이블에 저장(SQL => MYSQL)
    //$변수="인설트 인투 테이블이름(필드1, 필드2 ....) 밸류스(값1, 값2)";
    $sql="INSERT INTO kurly_signup_table_11 (userId, userPw, userName, userEmail, userHp, userAddr1, userAddr2, userGender, userBirth, userChooga, userChoogaId, userChoogaEvent, userService)
          VALUES ('$userId', '$userPw', '$userName', '$userEmail', '$userHp', '$userAddr1', '$userAddr2', '$userGender', '$userBirth', '$userChooga', '$userChoogaId', '$userChoogaEvent', '$userService')";

    //SQL 실행
    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo "회원 가입 데이터 테이블에 저장 성공!";
    }
    else{
        echo "회원 가입 데이터 테이블에 저장 실패!";
    }

?>