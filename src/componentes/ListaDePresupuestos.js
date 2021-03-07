import React from 'react';
import {Header, Titulo} from './../elementos/Header';
import {Helmet} from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from './../hooks/useObtenerGastos';
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
    Subtitulo
} from './../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria';
import convertirAMoneda from './../funciones/convertirAMoneda';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import {Link} from 'react-router-dom';
import Boton from './../elementos/Boton';
import {format, fromUnixTime} from 'date-fns';
import {es} from 'date-fns/locale';
import borrarGasto from './../firebase/borrarGasto';
import useObtenerPresupuestos from '../hooks/useObtenerPresupuestos';

const ListaDePresupuestos = () => {
	const [presupuestos] = useObtenerPresupuestos();

	const formatearFecha = (fecha) => {
		return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es})
	}

	return (
		<>
			<Helmet>
				<title>Lista de Presupuestos</title>
			</Helmet>

			<Header>
				<BtnRegresar />
				<Titulo>Lista de Presupuestos</Titulo>
			</Header>

			<Lista>
				{presupuestos.map((presupuesto, index) => {
					return(
						<div key={presupuesto.id}>
							<ElementoLista key={presupuesto.id}>
								<Categoria>
									<IconoCategoria id={presupuesto.categoria} />
									{presupuesto.categoria}
								</Categoria>

								<Valor>{convertirAMoneda(presupuesto.cantidad)}</Valor>

								<ContenedorBotones>
									<BotonAccion as={Link} to={`/editar/${presupuesto.id}`}>
										<IconoEditar />
									</BotonAccion>
								</ContenedorBotones>
							</ElementoLista>
						</div>
					);
				})}


				
			</Lista>

			<BarraTotalGastado/>
		</>
	);
}
 
export default ListaDePresupuestos;


/*{gastos.length === 0 &&
					<ContenedorSubtitulo>
						<Subtitulo>No hay gastos por mostrar</Subtitulo>
						<Boton as={Link} to="/">Agregar Gasto</Boton>
					</ContenedorSubtitulo>
				}*/