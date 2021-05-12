import { useEffect, useState } from "react";
import useObtenerGastosDelMes from './useObtenerGastosDelMes';

const useObtenerGastosDelMesPorCategoria = () => {
	const [gastosPorCategoria, cambiarGastosPorCategoria] = useState([]);
	const gastos = useObtenerGastosDelMes();

	useEffect(() => {
		const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {
			const categoriaActual = objetoActual.categoria;
			const cantidadActual = objetoActual.cantidad;
	
			objetoResultante[categoriaActual] += cantidadActual;
	
			return objetoResultante;
		}, {
			'Nominas': 0,
			'Insumos': 0,
			'Mantenimiento de sucursal': 0,
			'Mantenimiento de autos': 0
		});
	
		cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
			return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
		}));
	}, [gastos, cambiarGastosPorCategoria]);

	return gastosPorCategoria;
}
 
export default useObtenerGastosDelMesPorCategoria;