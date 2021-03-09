import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';

const useObtenerPresupuestos = () => {
	const {usuario} = useAuth();
	const [presupuestos, cambiarPresupuestos] = useState([]);

	useEffect(() => {
		const unsuscribe = db.collection('presupuestos')
		.where('uidUsuario', '==', usuario.uid)
		//.get()
		.onSnapshot((snapshot) => {	
			console.log(snapshot)		
			cambiarPresupuestos(snapshot.docs.map((presupuesto) => {
				return {...presupuesto.data(), id: presupuesto.id}
			}));
		});

		return unsuscribe;
	}, [usuario]);
	return [presupuestos];
}
 
export default useObtenerPresupuestos;