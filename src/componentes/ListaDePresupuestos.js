import React, { useState, useEffect } from "react";
import { Header, Titulo } from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastos from "./../hooks/useObtenerGastos";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "./../elementos/ElementosDeFormulario";
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo,
} from "./../elementos/ElementosDeLista";
import IconoCategoria from "./../elementos/IconoCategoria";
import convertirAMoneda from "./../funciones/convertirAMoneda";
import { ReactComponent as IconoEditar } from "./../imagenes/editar.svg";
import { ReactComponent as IconoBorrar } from "./../imagenes/borrar.svg";
import { Link } from "react-router-dom";
import Boton from "./../elementos/Boton";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import borrarGasto from "./../firebase/borrarGasto";
import useObtenerPresupuestos from "../hooks/useObtenerPresupuestos";
import { ReactComponent as IconoPlus } from "./../imagenes/plus.svg";

// cambiar componente a class component
// 

const ListaDePresupuestos = () => {
  const [presupuestos] = useObtenerPresupuestos();
  const [listaPresupuestos, cambiarListaPresupuestos] = useState([]);


  useEffect(() => {
		// Comprobamos si ya hay algun gasto.
		// De ser asi establecemos todo el state con los valores del gasto.
		console.log(presupuestos);
    if (listaPresupuestos.length == 0) {
      cambiarListaPresupuestos(presupuestos);
  }
	});


  const handleChange = (e) => {
    // console.log(event.target.name)
    // console.log(event.target.value)

    let lista = presupuestos.filter((a, i)=> {
      if (a.id   === e.target.name ) {
        a.cantidad = e.target.value;
      }
      return a;
    });
    cambiarListaPresupuestos(lista);

  };

  const handleSubmit = (e) => {
		e.preventDefault();
    console.log(listaPresupuestos);

  };

  return (
    <>
      <Helmet>
        <title>Lista de Presupuestos</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Lista de Presupuestos</Titulo>
      </Header>

      <form onSubmit={handleSubmit}>


      <Lista>
        {listaPresupuestos.map((presupuesto, index) => {
          return (
            <div key={presupuesto.id}>
              <ElementoLista key={presupuesto.id}>
                <Categoria>
                  <IconoCategoria id={presupuesto.categoria} />
                  {presupuesto.categoria}
                </Categoria>

                <Input
                  type="text"
                  name={presupuesto.id}
                  placeholder="cantidad"
                  value={presupuesto.cantidad}
                  onChange={handleChange}
                />
              </ElementoLista>
            </div>
          );
        })}

        <ContenedorBoton>
          <Boton as="button" primario conIcono type="submit">
            {"Save"} <IconoPlus />
          </Boton>
        </ContenedorBoton>
      </Lista>
      </form>



      <BarraTotalGastado />
    </>
  );
};

export default ListaDePresupuestos;

/*{gastos.length === 0 &&
					<ContenedorSubtitulo>
						<Subtitulo>No hay gastos por mostrar</Subtitulo>
						<Boton as={Link} to="/">Agregar Gasto</Boton>
					</ContenedorSubtitulo>
				}
				
				
												<Valor>{convertirAMoneda(presupuesto.cantidad)}</Valor>

				
				*/
