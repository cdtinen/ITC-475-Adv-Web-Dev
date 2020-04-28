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

            
        <article>
            <h2>Welcome, admin! Here are the submitted forms:</h2>
            <div id="adminforms">
                <?php
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
                    $conn = new mysqli($servername, $username, $password, $database);

                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    }

                    $sql = "SELECT * FROM myClients";
                    $result = $conn->query($sql);

                    if($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            echo "<div>";
                            echo "<br />";
                            echo "Client Name: " . $row['firstname'] . " " . $row['lastname'] . "<br />";
                            echo "Client Phone Number: " . $row['phone'] . "<br />";
                            echo "Client Email: " . $row['email'] . "<br />";
                            echo "Number of Adults: " . $row['adults'] . "<br />";
                            echo "Number of Children: " . $row['children'] . "<br />";
                            echo "Destination: " . $row['destination'] . "<br />";
                            echo "Travel Date: " . $row['traveldate'] . "<br />";
                            echo "Interested Activities: " . $row['activities'] . "<br />";
                            echo "<br />";
                            echo "</div>";
                        }
                    }
                    else {
                        echo "No forms";
                    }

                    $conn->close();
                ?>
            </div>
        </article>

        <footer>
            <span>Copyright Protected. All rights reserved.</span><br><br>
            <span>MEGA TRAVELS</span><br>
            <span>mega@travels.com</span>
        </footer>
    </div>  
    </body>
</html>