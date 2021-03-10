import {db} from './firebaseConfig';

const editarPresupuesto = ({id, categoria, cantidad, fecha}) => {
	return db.collection('presupuestos').doc(id).update({
		categoria: categoria,
		cantidad: Number(cantidad),
		fecha: fecha
	});
}

export default editarPresupuesto;


//uidUsuario: uidUsuario