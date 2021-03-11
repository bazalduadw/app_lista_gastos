import React,  { useState, useEffect } from "react";
import { Header, Titulo } from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "./../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastosDelMesPorCategoria from "./../hooks/useObtenerGastosDelMesPorCategoria";
import useObtenerPresupuestos from "../hooks/useObtenerPresupuestos";

import {
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Valor,
} from "./../elementos/ElementosDeLista";
import IconoCategoria from "./../elementos/IconoCategoria";
import convertirAMoneda from "./../funciones/convertirAMoneda";
import { Chart } from "react-google-charts";

const GastosPorCategoria = () => {
  const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();
  const [presupuestos] = useObtenerPresupuestos();
  const [listaParaGrafica, cambiarListaParaGrafica] = useState([]);
  const [styles, cambiarStyles] = useState({});


  useEffect(() => {
    // Comprobamos si ya hay algun gasto.
    // De ser asi establecemos todo el state con los valores del gasto.
	
    if (listaParaGrafica.length == 0) {
		let temporalLista = [];
      presupuestos.forEach((v, i) => {
        gastosPorCategoria.forEach((v2, i2) => {
          if (v.categoria == v2.categoria) {
            temporalLista.push({
              categoria: v.categoria,
              cantidad: v2.cantidad,
              presupuesto: v.cantidad,
            });
          }
        });
      });

	  cambiarListaParaGrafica(temporalLista);

    }


	cambiarStyles({'display': "flex", 'flex-direction': "column"});

	console.log(listaParaGrafica)
  });

  return (
    <>
      <Helmet>
        <title>Gastos por Categoría</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Gastos por Categoría</Titulo>
      </Header>
	  <div style={styles}>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria>
                <IconoCategoria id={elemento.categoria} />
                {elemento.categoria}
              </Categoria>
              <Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>
      {listaParaGrafica.length > 0 &&
      <Chart
  width={'700px'}
  height={'400px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Categoria', 'Presupuesto', 'Gastos del mes'],
    [listaParaGrafica[0].categoria, listaParaGrafica[0].presupuesto, listaParaGrafica[0].cantidad],
    [listaParaGrafica[1].categoria, listaParaGrafica[1].presupuesto, listaParaGrafica[1].cantidad],
    [listaParaGrafica[2].categoria, listaParaGrafica[2].presupuesto, listaParaGrafica[2].cantidad],
    [listaParaGrafica[3].categoria, listaParaGrafica[3].presupuesto, listaParaGrafica[3].cantidad],
  ]}
  options={{
    title: 'Gastos vs Presupuestos',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Cantidad',
      minValue: 0,
    },
    vAxis: {
      title: 'Categoria',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '1' }}
/>
}
	</div>
  

      <BarraTotalGastado />
    </>
  );
};

export default GastosPorCategoria;



/*


{listaParaGrafica.map((elemento, index) => {
      <Chart
        width={"400px"}
        height={"200px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Language", "Speakers (in millions)"],
          ["Presupuesto", elemento.presupuesto],
		  ["Cantidad actual", elemento.cantidad],

        ]}
        options={{
          legend: "none",
          pieSliceText: "label",
          title: elemento.categoria ,
          pieStartAngle: 100,
        }}
        rootProps={{ "data-testid": "4" }}
      />
	})}



	 <Chart
        width={"400px"}
        height={"200px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Language", "Speakers (in millions)"],
          ["Presupuesto", 6],
		  ["Cantidad actual", 10],

        ]}
        options={{
          legend: "none",
          pieSliceText: "label",
          title: 'simon' ,
          pieStartAngle: 100,
        }}
        rootProps={{ "data-testid": "4" }}
      />


		

	  {listaParaGrafica.length > 0 && listaParaGrafica.map((elemento, index) => {
		  return (
      <Chart
        width={"600px"}
        height={"600px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Rubro", "Cantidad"],
          ["Presupuesto", Number(elemento.presupuesto )],
		  ["Cantidad actual", Number(elemento.cantidad )],

        ]}
        options={{
          legend: "none",
          pieSliceText: "label",
          title: elemento.categoria ,
          pieStartAngle: 100,
        }}
        //rootProps={{ "data-testid": "4" }}
      />
	   );
	})}

*/