import React, { Component } from "react";
import axios from "axios";
import Jugadores from "./Jugadores";
export default class Buscador extends Component {
    url = "https://apiapuestas.azurewebsites.net";
    cajaBuscador = React.createRef();
    selectSeleccionado = React.createRef();

    state = {
        Equipos: [],

        caja: "",
        cajaselect: "",
    };

    loadEquipos = () => {
        let request = "/api/Equipos";

        axios.get(this.url + request).then(response => {
            console.log("lEYENDO EQUIPOS");

            this.setState({
                Equipos: response.data,
            });
        });
    };

    buscarPornombre = e => {
        e.preventDefault();
        console.log("leyendoo");

        this.setState({
            caja: this.cajaBuscador.current.value,
            cajaselect: "",
        });
    };

    buscarPorEquipo = e => {
        e.preventDefault();
        this.setState({
            cajaselect: this.selectSeleccionado.current.value,
            caja: "",
        });
    };

    componentDidMount = () => {
        this.loadEquipos();
    };

    render() {
        return (
            <>
                <form action="">
                    <input className="border-width: 1px;" type="text" ref={this.cajaBuscador} />
                    <button className="text-black bg-gradient-to-t from-green-400 to-violet-300 rounded p-3 m-3" onClick={this.buscarPornombre}>
                        Buscar Jugador por nombre
                    </button>
                </form>
                <form action="">
                    <select name="" ref={this.selectSeleccionado} className="p-10">
                        {this.state.Equipos.map((equipo, index) => {
                            return (
                                <>
                                    <option value={equipo.idEquipo}>{equipo.nombre}</option>
                                </>
                            );
                        })}
                    </select>
                    <button className="text-black bg-gradient-to-t from-green-400 to-violet-300 rounded p-3 m-3" onClick={this.buscarPorEquipo}>
                        bUSCAR POR EQUIPO
                    </button>
                </form>

                {(this.state.cajaselect !== "" || this.state.caja !== "") && <Jugadores cajabuscador={this.state.caja} cajaselect={this.state.cajaselect} />}
            </>
        );
    }
}
