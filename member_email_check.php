<?
    // member_email_check.php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $db_server = 'localhost';
    $db_user_name = 'sjm6715';
    $db_user_pw = 's2119s6715*';
    $db_name = 'sjm6715';
    $conn = mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
    mysqli_set_charset($conn,'utf8');

    // 리액트 회원가입 폼 데이터 => 회원가입 테이블에 저장하기
    // kurly_signup_table_11   
    $userEmail = $_POST['userEmail'];

    // id 중복확인
    //  조회 모두 * 프롬 테이블이름 웨어(조건) 이메일=조회이메일
    $sql = "SELECT * FROM kurly_signup_table_11 WHERE userEmail='$userEmail'";   
    $result = mysqli_query($conn,$sql);

    if( mysqli_num_rows($result) >= 1){ // 행수가 1이상이면
        echo 1;  //응답
    }
    else{
        echo 0; //응답
    }

?>