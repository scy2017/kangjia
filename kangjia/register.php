<?php
      header('Access-Control-Allow-Origin:*');
      # 1. 获取用户的数据; 

      # 字段名一般情况下和数据的字段名一致的; 
      $username = $_GET["username"];
      $password = $_GET["password"];

      # 2. 链接数据库在数据之中进行验证

      $conn = mysqli_connect( "localhost" , "root" , "root" , "test" );

      # 3. sql语句编写; 
      # 我查询用户名和密码，并且要求用户名和密码必须相等; 
      $sql = "SELECT * FROM `user_table` WHERE `username`='$username'";

      # 4. 执行sql语句; 
      $res = mysqli_query($conn , $sql);

      # 5. 如果查询失败，会报错; 
      if(!$res){
            echo mysqli_error($conn);
      }

      # 6. 判定内部是否查询到内容; 

      $row = mysqli_fetch_assoc($res);

      # 7. 如果用户名存在表示用户名重名; 
      if($row){
            echo '{ "type":"error" ,"message":"用户名重名" }';
      }else{
            # 8. 写一个插入数据的SQL语句; 
            $sql_insert = "INSERT INTO `user_table` (`username`,`password`) VALUES (
               '$username',
               '$password'
            )";

            $res = mysqli_query($conn , $sql_insert);

            # 9. 如果插入失败，会报错; 
            if(!$res){
                  echo mysqli_error($conn);
            }else{
                  echo '{"type":"success" ,"message":"注册成功" }';
            }
      }
?>