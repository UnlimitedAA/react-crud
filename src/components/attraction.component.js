import React, { Component } from "react";
import AttractionDataService from "../services/attraction.service";
import CityDataService from "../services/city.service";

export default class Attraction extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.getAttraction = this.getAttraction.bind(this);
        this.updateAttraction = this.updateAttraction.bind(this);
        this.deleteAttraction = this.deleteAttraction.bind(this);
        this.retrieveCities = this.retrieveCities.bind(this);


        this.state = {
            currentAttraction: {
                id: null,
                name: "",
                city_id: "",
            },
            cities: [],
            message: "",
        };
    }

    componentDidMount() {
        this.retrieveCities();
        this.getAttraction(this.props.match.params.id);
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
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAttraction: {
                    ...prevState.currentAttraction,
                    name: name,
                },
            };
        });
    }

    onChangeCity(e) {
        const city_id = e.target.value;

        this.setState((prevState) => ({
            currentAttraction: {
                ...prevState.currentAttraction,
                city_id: city_id,
            },
        }));
    }

    getAttraction(id) {
        AttractionDataService.get(id)
        .then((response) => {
            this.setState({
                currentAttraction: response.data.data,
            });
            console.log(response.data.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    updateAttraction() {
        AttractionDataService.update(
            this.state.currentAttraction.id,
            this.state.currentAttraction
            )
            .then((response) => {
                console.log(response.data.data);
                this.setState({
                    message: "The attraction was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
        }

        deleteAttraction() {
            AttractionDataService.delete(this.state.currentAttraction.id)
            .then((response) => {
                console.log(response.data.data);
                this.props.history.push("/attractions");
            })
            .catch((e) => {
                console.log(e);
            });
        }

        render() {
            const { currentAttraction, cities } = this.state;

            return (
              <div>
                {currentAttraction ? (
                  <div className="edit-form">
                    <h4>Attraction</h4>
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={currentAttraction.name}
                          onChange={this.onChangeName}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <select
                          className="form-control"
                          id="city"
                          value={currentAttraction.city_id}
                          onChange={this.onChangeCity}
                        >
                            {cities && cities.map((city, index) => (
                            <option value={city.id}>{city.name}</option>
                          ))
                        }
                        </select>
                      </div>
                    </form>

                    <button
                      className="badge badge-danger mr-2"
                      onClick={this.deleteAttraction}
                    >
                      Delete
                    </button>

                    <button
                      type="submit"
                      className="badge badge-success"
                      onClick={this.updateAttraction}
                    >
                      Update
                    </button>
                    <p>{this.state.message}</p>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Attraction...</p>
                  </div>
                )}
              </div>
            );
                    }
                }
