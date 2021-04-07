<?php

    header("Content-Type: text/plain");
    $name = $_POST["uname"];
    $password = $_POST["upassword"];
    
    $sql = "SELECT Username FROM Accounts Where Username = '$name'";

    $sql2 = "Insert into Accounts(Username, Password)".
            " values ('$name', '$password')";
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cp476";


    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

    $result = $conn->query($sql);
    

    if($result->num_rows >0) {
        echo "Username already exists.";
        return;
    }
    $result2 = $conn->query($sql2);
    if ($result2 === TRUE) {
        $last_id = $conn->insert_id;
        echo "Insert successfully. Last inserted ID is: " . $last_id;
    } else {
    echo "Error creating database: " . $conn->error;
    }
    $conn->close();
?>