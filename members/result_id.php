<?php
$u_id = $_POST["input_id"];

include "../inc/dbcon.php";

$sql = "select u_id from p_members where u_id='$u_id';";

$result = mysqli_query($dbcon, $sql);

$num = mysqli_num_rows($result);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>검색 결과</title>
    <style type="text/css">
        body,button{font-size:20px}
        a{text-decoration:none;color:rgb(9, 124, 206)}
        a:hover{color:rgb(255, 153, 0)}
        .bld{font-weight:bold}
        .able{font-weight:bold;color:rgb(0, 110, 255)}
        .d_able{font-weight:bold;color:rgb(255, 123, 0)}
    </style>
    <?php if(!$num){ ?>
    <script type="text/javascript">
        function return_id(){
            opener.document.getElementById("u_id").value = "<?php echo $u_id;?>";
            window.close();
        };
    </script>
    <?php }; ?>
</head>
<body>
    <p>
        입력하신 <span class="bld">"<?php echo $u_id;?>"</span>은 사용할 수 
        <!-- <?php
        if(!$num){ // if($num == 0)
            echo "<span class=\"able\">있는</span> ";
        } else{
            echo "<span class=\"d_able\">없는</span> ";
        }
        ?> --> 

        <?php if(!$num){ // if($num == 0) ?>
        <span class="able">있는</span> 
        <?php } else{ ?>
        <span class="d_able">없는</span> 
        <?php }; ?>
        
        아이디입니다.<br><br>
        <?php if(!$num){ ?>
        <a href="#" onclick="return_id()">[사용하기]</a>
        <?php }; ?>
        <a href="#" onclick="history.back()">[다시 검색]</a>
    </p>
</body>
</html>