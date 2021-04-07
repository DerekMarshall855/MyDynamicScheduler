<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cp476";


    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
    else echo "Connected successfully";
    $sql = "CREATE TABLE Accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name char(50), 
        role TINYINT NOT NULL
    )";
    if ($conn->query($sql) === TRUE) {
    echo "Table created successfully";
    } else {
    echo "Error: " . $conn->error;
    }
    $conn->close();

?>