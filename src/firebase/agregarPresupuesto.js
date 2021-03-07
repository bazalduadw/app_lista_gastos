import {db} from './firebaseConfig';

const agregarPresupuesto = ({categoria, cantidad}) => {
	return db.collection('presupuestos').add({
		categoria: categoria,
		cantidad: Number(cantidad),
		fecha: fecha,
		uidUsuario: uidUsuario
	});
}

export default agregarPresupuesto;