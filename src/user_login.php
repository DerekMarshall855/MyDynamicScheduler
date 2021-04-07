<!DOCTYPE html>

<head>
  <title>UM Login</title>
</head>

<body>
  <?php

  $user = $_POST['user'];
  $user = strtolower($user);
  $pass = $_POST['pass'];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "umsDB";
  $conn = new mysqli($servername, $username, $password, $dbname);
  $flag = false;
  $role = 0;
  if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

  $sql = "SELECT * FROM users WHERE user = '$user'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {  // Username exists
    
    while ($row = mysqli_fetch_assoc($result)) {
        if (strcmp($row['pass'], $pass) == 0) {
            $flag = true;
            $role = $row['urole'];
        }
    }
    if ($flag) {
        echo "<br>User Found! Logging in!";
        if ($role == 1) {
            echo "<br> Welcome Admin!";
            echo "<h1>Add Users</h1>"; //Add user done without jquery, document.forms[i] i index is different in sign_in.html and add_users.html
            echo '<form action="add_users.php" method="post">';
                echo '<table>';
                    echo '<p>Enter new user information!</p>';
                    echo '<tbody>';
                        echo '<tr>';
                            echo '<td>username: </td>';
                            echo '<td><input size="50" type="text" name="username"> </td>';
                        echo '</tr>';
                        echo '<tr>';
                            echo '<td>password: </td>';
                            echo '<td><input size="50" type="text" name="password"> </td>';
                        echo '</tr>';
                        echo '<tr>';
                        echo '<td>role: (1 - admin, 2 - friend, 3 - guest)</td>';
                        echo '<td><input size="1" name="role" type="text"> </td>';
                        echo '</tr>';
                    echo '</tbody>';
                echo '</table>';
                echo '<input value="Create Account" type="button" onclick="sendRequest()"/>';
            echo '</form>';
            echo '<div id="divStatus"></div>';
            echo '<h1>Search Users</h2>';
            echo '<div id="divSearchInfo"></div>';
        
        } elseif($role == 2) {
            echo "<br> Hello Friend!";
            echo '<div id="divBookSearch"></div>';
        } else {
            echo "<br>Guests have no power here!";
        }
    } else {
        echo "Username or Password Do Not Match";
    }
    
  } else {
      echo "\nNo user exists with this name";
  }
  $conn->close();

  ?>

</body>

</html>