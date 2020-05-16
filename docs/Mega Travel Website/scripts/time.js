function updateClock() {
    let now = new Date()
    let twelvetime = now.getHours() 
    let ampm = "am"

    if (twelvetime >= 12) {
        if (twelvetime > 12) {twelvetime -= 12}
        ampm = "pm"
    }
    else {ampm = "am"}
    
    
    let time = "Time: " + twelvetime + ':' + now.getMinutes() + ":" + now.getSeconds() + " " + ampm

    if (now.getMinutes() < 10 && now.getSeconds() < 10) {
        time = "Time: " + twelvetime + ':0' + now.getMinutes() + ":0" + now.getSeconds() + " " + ampm
    } 
    else if (now.getMinutes() < 10 && now.getSeconds() >= 10) {
        time = "Time: " + twelvetime + ':0' + now.getMinutes() + ":" + now.getSeconds() + " " + ampm
    }
    else if (now.getSeconds() < 10 && now.getMinutes() >= 10) {
        time = "Time: " + twelvetime + ':' + now.getMinutes() + ":0" + now.getSeconds() + " " + ampm
    }
    document.getElementById("time").innerHTML = [time];

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}

function Welcome() {
    const date = new Date()
    const hours = date.getHours()
    const mins = date.getMinutes()
    let timeOfDay
    let img
    
    // change welcome text
    if (hours < 12) {
        timeOfDay = "Morning"
    }
    else if (hours >= 12 && hours < 17) {
        timeOfDay = "Afternoon"
    }
    else {
        timeOfDay = "Evening"
    }
    
    // change sun or moon image
    if (hours >= 6 && hours <= 18) {
        if(hours == 18 && mins >= 1) {
            img = "assets/moon.png"
        }
        else {
            img = "assets/sun.png"
        }
    }
    else {
        img = "assets/moon.png"
    }
    
    
    return (
        <div>
              <img src={img}></img>
              <h4>Good {timeOfDay}!</h4>
        </div>
    )
}

updateClock();
ReactDOM.render(<Welcome />, document.getElementById("welcome"))