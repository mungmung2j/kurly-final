<?php
// member_login_check.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$db_server = 'localhost';
$db_user_name = 'sjm6715';
$db_user_pw = 's2119s6715*';
$db_name = 'sjm6715';
$conn = mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
mysqli_set_charset($conn, 'utf8');

// 리액트에서 전달한 로그인 폼 데이터
$userId = $_POST['userId'];
$userPassword = $_POST['userPassword']; // 예제에서는 평문을 가정하고 있습니다. 실제로는 해시를 사용해야 합니다.

// id 및 password 일치 확인
$sql = "SELECT * FROM kurly_signup_table_11 WHERE userId='$userId'";
$result = mysqli_query($conn, $sql);

if ($result) {
    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);

        // 비밀번호 일치 확인
        if (password_verify($userPassword, $row['userPassword'])) {
            // 사용자 아이디와 비밀번호가 일치하는 경우
            echo 1;  // 로그인 성공
        } else {
            // 사용자 비밀번호가 일치하지 않는 경우
            echo "비밀번호를 확인하세요.";  // 로그인 실패
        }
    } else {
        // 사용자 아이디가 존재하지 않는 경우
        echo "아이디를 확인하세요.";  // 로그인 실패
    }
} else {
    // 쿼리 오류
    echo "오류가 발생했습니다.";
}
?>