import React from 'react';

import {ReactComponent as IconoNominas} from './../imagenes/cat_compras.svg';
import {ReactComponent as IconoInsumos} from './../imagenes/cat_transporte.svg';
import {ReactComponent as IconoMantenimientoSucursal} from './../imagenes/cat_cuentas-y-pagos.svg';
import {ReactComponent as IconoMantenimientoAutos} from './../imagenes/cat_cuentas-y-pagos.svg';

const IconoCategoria = ({id}) => {
	switch(id){
		case 'Nominas':
			return <IconoNominas />;
		case 'Insumos':
			return <IconoInsumos />;
		case 'Mantenimiento de sucursal':
			return <IconoMantenimientoSucursal />;
		case 'Mantenimiento de autos':
			return <IconoMantenimientoAutos />;
		default:
		break;
	}
}
 
export default IconoCategoria;