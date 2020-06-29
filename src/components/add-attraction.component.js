import React, { Component } from "react";
import AttractionDataService from "../services/attraction.service";
import CityDataService from "../services/city.service";


export default class AddAttraction extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.saveAttraction = this.saveAttraction.bind(this);
        this.newAttraction = this.newAttraction.bind(this);
        this.retrieveCities = this.retrieveCities.bind(this);

        this.state = {
            id: null,
            name: "",
            city_id: "",
            submitted: false,
        };
    }

    componentDidMount() {
        this.retrieveCities();
    }

    retrieveCities() {
        CityDataService.getAll()
        .then((response) => {
            this.setState({
                cities: response.data.data,
            });
            console.log(response.data.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeCity(e) {
        this.setState({
            city_id: e.target.value,
        });
    }

    saveAttraction() {
        var data = {
            name: this.state.name,
            city_id: this.state.city_id,
        };

        AttractionDataService.create(data)
        .then((response) => {
            this.setState({
                id: response.data.data.id,
                name: response.data.data.name,
                city_id: response.data.data.city_id,
                submitted: true,
            });
            console.log(response.data.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    newAttraction() {
        this.setState({
            id: null,
            name: "",
            city_id: "",
            submitted: false,
        });
    }

    render() {
        const { cities } = this.state;
        return (
            <div className="submit-form">
            {this.state.submitted ? (
                <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newAttraction}>
                Add
                </button>
                </div>
                ) : (
                    <div>
                    <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                    className="form-control"
                    id="city"
                    value={this.state.city_id}
                    onChange={this.onChangeCity}
                    >
                    {cities && cities.map((city, index) => (
                        <option value={city.id}>{city.name}</option>
                        ))
                    }
                    </select>
                    </div>

                    <button onClick={this.saveAttraction} className="btn btn-success">
                    Submit
                    </button>
                    </div>
                    )}
                    </div>
                    );
                }
            }
