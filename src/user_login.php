<!DOCTYPE html>

<head>
  <title>UM Login</title>
</head>

<body>
  <?php
    
  $user = $_POST['user'];
  $user = strtolower($user);
  $pass = $_POST['pass'];
  // echo "Hello $user your password was $pass";  // Line used to test, delete before submission (Not good practice to print others password)

//   $servername = "localhost";
//   $username = "root";
//   $password = "";
//   $dbname = "cp476";
//   $conn = new mysqli($servername, $username, $password, $dbname);
//   $flag = false;
//   $role = 0;
//   if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

//   $sql = "SELECT * FROM Accounts WHERE Username = '$user'";
//   $result = $conn->query($sql);
//   if ($result->num_rows > 0) {  // Username exists
    
//     while ($row = mysqli_fetch_assoc($result)) {
//         if (strcmp($row['pass'], $pass) == 0) {
//             $flag = true;
//             $role = $row['urole'];
//         }
//     }
//     if ($flag) {
//         echo "Login successful";
//     } else {
//         echo "Username or Password Do Not Match";
//     }
    
//   } else {
//       echo "\nNo user exists with this name";
//   }
//   $conn->close();

  ?>

</body>

</html>