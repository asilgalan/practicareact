import axios from "axios";
import React, { Component } from "react";

export default class Jugadores extends Component {
    url = "https://apiapuestas.azurewebsites.net";
    state = {
        jugadores: [],
    };

    loadJugadores() {
        let request = "";
        if (this.props.cajabuscador !== "") {
            request = "/api/Jugadores/BuscarJugadores/" + this.props.cajabuscador;
        } else {
            console.log(this.props.cajaselect);

            request = "/api/Jugadores/JugadoresEquipos/" + this.props.cajaselect;
        }

        axios.get(this.url + request).then(response => {
            console.log("sacando jugadores");

            this.setState({
                jugadores: response.data,
            });
        });
    }

    componentDidMount = () => {
        this.loadJugadores();
    };
    componentDidUpdate = oldProps => {
        if (oldProps.cajabuscador != this.props.cajabuscador || oldProps.cajaselect != this.props.cajaselect) {
            this.loadJugadores();
        }
    };
    render() {
        return (
            <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    posicion
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    pais
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    fecha Nacimiento
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.jugadores.map((jugador, index) => {
                                return (
                                    <>
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img className="w-15 h-11" src={jugador.imagen} alt="" />
                                            </th>
                                            <td className="px-6 py-4">{jugador.nombre}</td>
                                            <td className="px-6 py-4">{jugador.posicion}</td>
                                            <td className="px-6 py-4">{jugador.pais}</td>
                                            <td className="px-6 py-4">{jugador.fechaNacimiento}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}
