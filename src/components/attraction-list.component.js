import React, { Component } from "react";
import AttractionDataService from "../services/attraction.service";
import { Link } from "react-router-dom";

export default class AttractionsList extends Component {
    constructor(props) {
        super(props);
        this.retrieveAttractions = this.retrieveAttractions.bind(this);
        this.setActiveAttraction = this.setActiveAttraction.bind(this);

        this.state = {
            attractions: [],
            currentAttraction: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveAttractions();
    }



    retrieveAttractions() {
        AttractionDataService.getAll()
        .then((response) => {
            this.setState({
                attractions: response.data.data,
            });
            console.log(response.data.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }


    setActiveAttraction(attraction, index) {
        this.setState({
            currentAttraction: attraction,
            currentIndex: index,
        });
    }



    render() {
        const { attractions, currentAttraction, currentIndex } = this.state;

        return (
            <div className="list row">
            <div className="col-md-6">
            <h4>Attractions List</h4>

            <ul className="list-group">
            {attractions &&
                attractions.map((attraction, index) => (
                    <li
                    className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveAttraction(attraction, index)}
                    key={index}
                    >
                    {attraction.name}
                    </li>
                    ))}
                    </ul>


                    </div>
                    <div className="col-md-6">
                    {currentAttraction ? (
                        <div>
                        <h4>Attraction</h4>
                        <div>
                        <label>
                        <strong>Name:</strong>
                        </label>{" "}
                        {currentAttraction.name}
                        </div>
                        <div>
                        <label>
                        <strong>City:</strong>
                        </label>{" "}
                        {currentAttraction.city.name}
                        </div>

                        <Link
                        to={"/attractions/" + currentAttraction.id}
                        className="badge badge-warning"
                        >
                        Edit
                        </Link>
                        </div>
                        ) : (
                            <div>
                            <br />
                            <p>Please click on a Attraction...</p>
                            </div>
                            )}
                            </div>
                            </div>
                            );
                        }
                    }
