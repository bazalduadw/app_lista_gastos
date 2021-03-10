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
import editarPresupuesto from "../firebase/editarPresupuesto";
import getUnixTime from 'date-fns/getUnixTime'


// cambiar componente a class component
// 

const ListaDePresupuestos = () => {
  const [presupuestos] = useObtenerPresupuestos();
  const [listaPresupuestos, cambiarListaPresupuestos] = useState([]);
	const [fecha, cambiarFecha] = useState(new Date());


  useEffect(() => {
		// Comprobamos si ya hay algun gasto.
		// De ser asi establecemos todo el state con los valores del gasto.
    if (listaPresupuestos.length == 0) {
      cambiarListaPresupuestos(presupuestos);
  }
	});


  const handleChange = (e) => {

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

    listaPresupuestos.forEach((v,i)=> {
      editarPresupuesto({
        id: v.id,
        categoria: v.categoria,
        cantidad: v.cantidad,
        fecha: getUnixTime(fecha)
      }).then(() => {
        //history.push('/lista');
      }).catch((error) => {
        console.log("some error came" + error);
      })


    });

    alert("everything updated")
    

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
