const locations = [
    {id: "nz", text: "New Zealand"}, {id: "md", text: "Maldives, South Asia"}, 
    {id: "it", text: "Venice, Italy"}, {id: "cn", text: "Cancun"}
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

function ActivityButton(props) {
    return (
        <div className="activity-button">
            <button onClick={() => props.handleClick(props.location.id)}>
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

    handleClick(loc_id) {
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

ReactDOM.render(<Activities />, document.getElementById('activity_form'))
