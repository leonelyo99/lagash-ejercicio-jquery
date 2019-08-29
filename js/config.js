$(document).ready(function(){
	var precioPorDia=30;
	var cantidadEstacionados=0;
	var espaciosDisponibles=100;

	//Fijar tarifa
	var span1=$("#span1");
	var h3_tarifa=$("#h3_tarifa");
	var fijar_tarifa=$("#fijar_tarifa");

	span1.css("display", "none");
	h3_tarifa.html(`Si no desea fijar tarifa la misma fue prefijada en ${precioPorDia} pesos.`);
	
	fijar_tarifa.click(function(){
		var tarifa=$("#tarifa").val();
		
		//Si es mayor a cero se muestra
		if(tarifa>0){
			precioPorDia=tarifa;
			span1.css("display", "block");
			span1.html(`<h3>Se fijo la tarifa en ${tarifa} pesos</h3>`);
			h3_tarifa.css("display", "none");
		}else{
			span1.html("<h3>Ingrese un numero mayor a cero.</h3>");
		}
	});

	//autos entrando y saliendo
	var entra =$("#entra");
	var sale =$("#sale");
	var span_ocu =$("#span_ocu");
	var span_des =$("#span_des");

	sale.attr("disabled", true);
	sale.css("background-color","#FC989D");
	span_ocu.html(`<h3>Hay ${cantidadEstacionados} autos estacionados</h3>`);
	span_des.html(`<h3>Hay ${espaciosDisponibles} espacios disponibles</h3>`);

	//entrando
	entra.click(function(){
		cantidadEstacionados=cantidadEstacionados+1;
		espaciosDisponibles=espaciosDisponibles-1;
		//alert("esta ingresando un auto");

		if(cantidadEstacionados<100){
			entra.attr("disabled", false);
			entra.css("background-color","#E50914");
		}else{
			entra.attr("disabled", true);
			entra.css("background-color","#FC989D");
			alert("Ya no hay mas espacios disponibles");
		}
		if(espaciosDisponibles<100){
			sale.attr("disabled", false);
			sale.css("background-color","#E50914");
		}else{
			sale.attr("disabled", true);
			sale.css("background-color","#FC989D");
		}

		span_ocu.html(`<h3>Hay ${cantidadEstacionados} autos estacionados</h3>`);
		span_des.html(`<h3>Hay ${espaciosDisponibles} espacios disponibles</h3>`);
	}); 


	//saliendo
	sale.click(function(){
		cantidadEstacionados=cantidadEstacionados-1;
		espaciosDisponibles=espaciosDisponibles+1;
		//alert("esta egresando un auto");

		if(cantidadEstacionados<100){
			entra.attr("disabled", false);
			entra.css("background-color","#E50914");
		}else{
			entra.attr("disabled", true);
			entra.css("background-color","#FC989D");
		}
		if(espaciosDisponibles<100){
			sale.attr("disabled", false);
			sale.css("background-color","#E50914");
		}else{
			sale.attr("disabled", true);
			sale.css("background-color","#FC989D");
		}

		span_ocu.html(`<h3>Hay ${cantidadEstacionados} autos estacionados</h3>`);
		span_des.html(`<h3>Hay ${espaciosDisponibles} espacios disponibles</h3>`);
	});

	//Consultas
	var vacios= $("#vacios");

	vacios.click(function(){
		alert(`Hay ${espaciosDisponibles} espacios disponibles`);
	});
	$("#llenos").click(function(){
		alert(`Hay ${cantidadEstacionados} autos estacionados`);
	});

	//reloj
	var reloj=new Date();
	reloj=reloj.getHours();

	if(reloj==0||reloj==1||reloj==2||reloj==3||reloj==4||reloj==5||reloj==6){
		alert("son las "+reloj+" se cerro la playa");
		entra.attr("disabled", true);
		entra.css("background-color","#FC989D");
		sale.attr("disabled", true);
		sale.css("background-color","#FC989D");
		fijar_tarifa.attr("disabled", true);
		fijar_tarifa.css("background-color","#FC989D");
		vacios.attr("disabled", true);
		vacios.css("background-color","#FC989D");

		span_ocu.html(`<h3>Quedaron ${cantidadEstacionados} autos estacionados</h3>`);
		span_des.css("display","none");

		precioPorDia=70;
		h3_tarifa.html(`La playa se cerro, al amanecer, a los autos que permacieron se les cobrara una tarifa de ${precioPorDia} pesos.`);

		var mail = {
		asunto:"Autos estacionados en playa", 
		destinatario:"encargado@gmail.com", 
		cuerpo:`Quedaron ${cantidadEstacionados} autos estacionados y se debera cobrar un total ${cantidadEstacionados*precioPorDia} pesos`
		};

		console.log(mail);

		var mailAmostrar=`Se enviara el siguiente mail.
		Asunto: Autos estacionados
		Destinatario: encargado@gmail.com
		Cuerpo: Quedaron ${cantidadEstacionados} autos estacionados y se debera cobrar un total ${cantidadEstacionados*precioPorDia} pesos
		`;
		alert(mailAmostrar);
	};

	//Consultar la facturacion
	$("#consultar").click(function(){
		$("#facturacion").html(`<h3>La facturación total es ${cantidadEstacionados*precioPorDia} pesos</h3>`);
	});


});
