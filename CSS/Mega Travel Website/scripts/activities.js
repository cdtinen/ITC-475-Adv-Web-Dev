const locations = [
    {id: "nz", text: "New Zealand"}, {id: "md", text: "Maldives, South Asia"}, 
    {id: "it", text: "Venice, Italy"}, {id: "cn", text: "Cancun, Mexico"}
]
const nz_activities = [
    {
        id : 1,
        text : "City Tours",
        selected : false
    },
    {
        id : 2,
        text : "Sports",
        selected : false
    },
    {
        id : 3,
        text : "Cycling",
        selected : false
    },
    {
        id : 4,
        text : "Museums",
        selected : false
    },
    {
        id : 5,
        text : "Boating",
        selected : false
    }

]
const cn_activities = [
    {
        id : 1,
        text : "Parks and Recreation",
        selected : false
    },
    {
        id : 2,
        text : "Beaches",
        selected : false
    },
    {
        id : 3,
        text : "Boating",
        selected : false
    },
    {
        id : 4,
        text : "Snorkeling",
        selected : false
    },
]
const it_activities = [
    {
        id : 1,
        text : "Museums",
        selected : false
    },
    {
        id : 2,
        text : "Theatre",
        selected : false
    },
    {
        id : 3,
        text : "Parks and Recreation",
        selected : false
    },
    {
        id : 4,
        text : "City Tours",
        selected : false
    },
]
const md_activities = [
    {
        id : 1,
        text : "Museums",
        selected : false
    },
    {
        id : 2,
        text : "Sailing",
        selected : false
    },
    {
        id : 3,
        text : "Beaches",
        selected : false
    },
    {
        id : 4,
        text : "Hiking",
        selected : false
    },
    {
        id : 5,
        text : "Boating",
        selected : false
    }

]

let nz_acts = []
let md_acts = []
let it_acts = []
let cn_acts = []
for (let i = 0; i < nz_activities.length; i++) {
    nz_acts.push(nz_activities[i].text)
    md_acts.push(md_activities[i].text)
}
for (let i = 0; i < it_activities.length; i++) {
    it_acts.push(it_activities[i].text)
    cn_acts.push(cn_activities[i].text)
}

function ActivityButton(props) {
    return (
        <div className="activity-button">
            <button onClick={() => props.handleClick(props.location.id, event)}>
                {props.location.text}
            </button>
            <div className="divider"></div>
        </div>
    )
}

function ActivityItem(props) {
    return (
        <div className="activity-item">
            <input
                type="checkbox"
                checked={props.activity.selected}
                onChange={() => props.handleCheck(props.activity.id)}
            />
            <p style={{display: "inline-block", padding: "0.5em"}}>{props.activity.text}</p>
        </div>
    )
}


class Activities extends React.Component {
    constructor() {
        super()
        this.state = {
            activities: nz_activities,
            locs: locations
        }
        this.handleCheck = this.handleCheck.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleCheck(id) {
        this.setState(prevState => {
            const checkedActs = prevState.activities.map(activity => {
                if (activity.id === id) {
                    return {
                        ...activity,
                        selected: !activity.selected
                    }
                }
                return activity
            })
            return {
                activities: checkedActs
            }
        })
    }

    handleClick(loc_id, event) {
        event.preventDefault()
        if (loc_id === "nz") {
            this.setState({activities: nz_activities})
        }
        else if (loc_id === "md") {
            this.setState({activities: md_activities})
        }
        else if (loc_id === "it") {
            this.setState({activities: it_activities})
        }          
        else if (loc_id === "cn") {
            this.setState({activities: cn_activities})
        }        
        else {
            console.log("handleClick function error")
        }    
    }
    
    render() {
        const actItems = this.state.activities.map(activity => <ActivityItem key={activity.id} activity={activity} 
            handleCheck={this.handleCheck}/>)
        
        const actButtons = this.state.locs.map(loc => <ActivityButton key={loc.id} id={loc.id} 
            location={loc} handleClick={this.handleClick} />)
        
        return (
        <div>
            <div className="activity-buttons">
                {actButtons}
            </div>
            <div className="activity-list">
                {actItems}
            </div>
        </div>
        )    
    }
}

class ContactForm extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            numAdults: '',
            numChildren: '',
            travelDate: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleChange(event) {
        const {name, value, type} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        var form = document.getElementById("base_form")
        let formData = new FormData(base_form);

        var actList = document.getElementsByClassName("activity-item")
        var boxes = []
        var activities = []
        var destination = ""

        for(let i = 0; i < actList.length; i++) {
            var actChild = actList[i].firstChild
            activities.push(actList[i].innerText)
            if(actChild.checked) {
                boxes.push(actList[i].innerText)
            }
        }

        if (boxes.length == 0) {
            alert("Please select a destination and at least one activity")
        }

        else {
            switch(activities.toString()) {
                case nz_acts.toString():
                    destination = "New Zealand"
                    break;
                case md_acts.toString():
                    destination = "Maldives, South Asia"
                    break;
                case it_acts.toString():
                    destination = "Venice, Italy"
                    break;
                case cn_acts.toString():
                    destination = "Cancun, Mexico"
                    break;
            }
            formData.append('destination', destination)

            for(let j = 0; j < boxes.length; j++) {
                formData.append('activity' + j, boxes[j])
            }

            axios({
                method: 'post',
                url: 'confirm.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                location.href = "confirm.php"
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });
        }
    }

    handleReset() {
        this.setState({
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            numAdults: '',
            numChildren: '',
            travelDate: ""
        })
    }

    render() {
        return (
            <form id="base_form" name="contactForm" onReset={this.handleReset} 
            action="scripts/confirm.php" method="post">
                <label>First Name&emsp;</label>
                <input
                    type="text"
                    value={this.state.firstName}
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange} 
                    required    />
                <br></br><label>Last Name&emsp;</label>
                <input
                    type="text"
                    value={this.state.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleChange} 
                    required    />
                <br></br><label>Email Address&emsp;</label>
                <input
                    type="email"
                    value={this.state.emailAddress}
                    name="emailAddress"
                    placeholder="E-mail Address"
                    onChange={this.handleChange} 
                    required    />
                <br></br><label>Phone Number&emsp;</label>
                <input
                    type="tel"
                    value={this.state.phoneNumber}
                    name="phoneNumber"
                    placeholder="9999999999"
                    pattern="[0-9]{10}"
                    onChange={this.handleChange} 
                    required    />
                <br></br><label>Adults Traveling&emsp;</label>
                <input
                    type="number"
                    value={this.state.numAdults}
                    name="numAdults"
                    placeholder="Number of Adults"
                    onChange={this.handleChange} 
                    required    />
                <br></br><label>Children Traveling&emsp;</label>
                <input
                    type="number"
                    value={this.state.numChildren}
                    name="numChildren"
                    placeholder="Number of Children"
                    onChange={this.handleChange} 
                    required    />
                <br></br><label>Desired Date of Travel&emsp;</label>
                <input
                    type="date"
                    value={this.state.travelDate}
                    name="travelDate"
                    onChange={this.handleChange} 
                    required    />
                <br></br><br></br>
                <p>Select the destination and activities you are interested in below:</p>
                <Activities />
                <input
                    type="submit"
                    name="submit"
                    value="Submit"
                    onClick={e => this.handleSubmit(e)}/>
                <input
                    type="reset" 
                    style={{marginLeft: "1em"}}/>
            </form>
        )
    }
}

ReactDOM.render(<ContactForm />, document.getElementById('contact_form'))
