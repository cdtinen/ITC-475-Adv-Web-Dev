<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" media="screen and (max-width: 2160px)" href="styles/styles.css">
        <link rel="stylesheet" media="screen and (max-width: 1100px)" href="styles/tablet.css">
        <link rel="stylesheet" media="screen and (max-width: 768px)" href="styles/mobile.css">
        <title>Mega Travel</title>
    </head>

    <body>
    <div class="wrapper">
        <header>
            <img class="logo" src="assets/mega travel logo.png" alt="Mega Travel">
        </header>

        <span id="separator"></span>

        <nav>
            <a href="home.html"><b>Home</b></a>
            <a href="aboutus.html"><b>About Us</b></a>
            <a href="contact.html"><b>Contact Agent</b></a>
        </nav>
        
        <?php
            $fName = $lName = $email = $phone = $adults = $children = $date = $destination = "";

            if($_SERVER["REQUEST_METHOD"] == "POST") {
                $_SESSION["fName"] = $_POST["firstName"];
                $_SESSION["lName"] = $_POST["lastName"];
                $_SESSION["email"] = $_POST["emailAddress"];
                $_SESSION["phone"] = $_POST["phoneNumber"];
                $_SESSION["adults"] = $_POST["numAdults"];
                $_SESSION["children"] = $_POST["numChildren"];
                $_SESSION["date"] = $_POST["travelDate"];
                $_SESSION["destination"] = $_POST["destination"];
                $_SESSION["activities"] = $_POST["activity0"];
                if(!empty($_POST["activity1"])) {$_SESSION["activities"] = $_SESSION["activities"] . ", " . $_POST["activity1"];}
                if(!empty($_POST["activity2"])) {$_SESSION["activities"] = $_SESSION["activities"] . ", " . $_POST["activity2"];}
                if(!empty($_POST["activity3"])) {$_SESSION["activities"] = $_SESSION["activities"] . ", " . $_POST["activity3"];}
                if(!empty($_POST["activity4"])) {$_SESSION["activities"] = $_SESSION["activities"] . ", " . $_POST["activity4"];}
            }
            
            function console_log($data) {
                echo '<script>';
                echo 'console.log('. json_encode($data) .')';
                echo '</script>';            
            }

            $servername = "localhost";
            $username = "root";
            $password = "";
            $database = "travelDB";
            
            // Create connection
            $conn = new mysqli($servername, $username, $password);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Create DB if it doesn't exist and check for success
            $sql = "CREATE DATABASE IF NOT EXISTS travelDB";
            if ($conn->query($sql) === TRUE) {
                console_log("DB success");
            }
            else {
                echo "Error creating DB: " . $conn->error;
            }

            // Close connection
            $conn->close();

            // Create new connection to new DB
            $conn = new mysqli($servername, $username, $password, $database);

            // Create table if it doesn't exist
            $sql = "CREATE TABLE IF NOT EXISTS myClients (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                firstname VARCHAR(30) NOT NULL,
                lastname VARCHAR(30) NOT NULL,
                email VARCHAR(50),
                phone VARCHAR(15),
                adults INT(2),
                children INT(2),
                traveldate VARCHAR(20),
                destination VARCHAR(50),
                activities VARCHAR(100)
                )";

            // Check table success
            if ($conn->query($sql) === TRUE) {
                console_log("Table success");
            }
            else {
                echo "Error creating table: " . $conn->error;
            }

            // Insert query
            $sql = "INSERT INTO myClients (firstname, lastname, email, phone, adults, children, traveldate, destination, activities)
                VALUES('$_SESSION[fName]', '$_SESSION[lName]', '$_SESSION[email]', '$_SESSION[phone]', '$_SESSION[adults]',
                '$_SESSION[children]', '$_SESSION[date]', '$_SESSION[destination]', '$_SESSION[activities]')";

            // Only insert after form submission
            if($_SERVER["REQUEST_METHOD"] == "POST") {
                if ($conn->query($sql) === TRUE) {
                    console_log("Insert success");
                }
                else {
                    echo "Insert failed: " . $conn->error;
                }
            }

            // Close connection
            $conn->close();
        ?>

        <article>
            <h2>Thank you for submitting your travel agent contact request, <?php echo $_SESSION["fName"];?>! 
                Here is the information you submitted:
            </h2>

            <p>
                Client Name: <?php echo $_SESSION["fName"]; echo "&nbsp;"; echo $_SESSION["lName"]; ?>
                <br>
                Client Phone Number: <?php echo $_SESSION["phone"]; ?>
                <br>
                Client Email: <?php echo $_SESSION["email"];?>
                <br>
                Number of Adults: <?php echo $_SESSION["adults"];?>
                <br>
                Number of Children: <?php echo $_SESSION["children"];?>
                <br>
                Destination: <?php echo $_SESSION["destination"];?>
                <br>
                Travel Date: <?php echo $_SESSION["date"];?>
                <br>
                Interested Activities: <?php echo $_SESSION["activities"];?>
                <br>
            </p>

            <h2>An agent will be in touch with you soon!</h2>

        </article>

        <footer>
            <span>Copyright Protected. All rights reserved.</span><br><br>
            <span>MEGA TRAVELS</span><br>
            <span>mega@travels.com</span>
        </footer>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>

    <?php 
        if($_SERVER["REQUEST_METHOD"] == "GET") {
            session_unset();
        } 
    ?>
    
    </body>
</html>
