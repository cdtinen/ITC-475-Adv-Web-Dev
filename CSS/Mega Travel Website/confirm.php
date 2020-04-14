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
                $_SESSION["activity0"] = $_POST["activity0"];
                if(!empty($_POST["activity1"])) {$_SESSION["activity1"] = $_POST["activity1"];}
                if(!empty($_POST["activity2"])) {$_SESSION["activity2"] = $_POST["activity2"];}
                if(!empty($_POST["activity3"])) {$_SESSION["activity3"] = $_POST["activity3"];}
                if(!empty($_POST["activity4"])) {$_SESSION["activity4"] = $_POST["activity4"];}
            }
        ?>

        <article>
            <h2>Thank you for submitting your travel agent contact request! Here is the information you submitted:</h1>

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
                Interested Activities: 
                <?php 
                    echo $_SESSION["activity0"];
                    echo "&nbsp;";
                    if(!empty($_SESSION["activity1"])) {echo $_SESSION["activity1"]; echo "&nbsp;";}
                    if(!empty($_SESSION["activity2"])) {echo $_SESSION["activity2"]; echo "&nbsp;";}
                    if(!empty($_SESSION["activity3"])) {echo $_SESSION["activity3"]; echo "&nbsp;";}
                    if(!empty($_SESSION["activity4"])) {echo $_SESSION["activity4"];}
                ?>
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