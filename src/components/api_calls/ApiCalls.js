/**
* ApiCalls
*
* Contiene todas las llamadas a la API
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import configJson from '../configuration/configuration.json';
import axios from 'axios';


const path = configJson.apiPath; 

export function login(id_empresa,username,password){
	//consulta si el usuario existe con los datos ingresados
    return axios.get(path+'login/'+id_empresa+'/'+username+'/'+password, {withCredentials: true});    
}	

export function validaEmpresa(id_empresa){
	//consulta si la empresa existe
    return axios.get(path+'validaEmpresa/'+id_empresa, {withCredentials: true});
}

export function checkSession(){
	//consulta si la sesion esta activa
	return axios.get(path+'checkSession', {withCredentials: true});
}

export function logout(){
	//cierra la sesion
	return axios.get(path+'logout', {withCredentials: true});
}

export function loadComboBoxDataGrid(apiUrl){
	//carga el combobox dinamico 
	return axios.get(apiUrl, {withCredentials: true});
}

export function consultarFilas(apiUrl,searchWord){
	//consulta el numero de filas de la grilla
	return axios.get(apiUrl+'Rows', {
    		    withCredentials: true, 
    		    params: { 
    		        searchWord : searchWord,                
    		    } 
    		});
}

export function cargarFilas(apiUrl,searchWord,showRecords,offsetRecord){
	//trae las filas filas de la grilla
	return axios.get(apiUrl, {
				withCredentials: true, 
				params: { 
					searchWord : searchWord,
					showRecords : showRecords,
					offsetRecord : offsetRecord 
				} 
			});
}

export function eliminarFilas(apiUrl,id){
	//elimina una fila de la grilla
	return axios.delete(apiUrl,{            
        	    data: {id : id},
        	    withCredentials: true
        	});
}

export function insertarActualizarFila(method,apiUrl,arrayData){
	//inserta actualiza una fila en la grilla
	return axios({
        	    method: method,
        	    url: apiUrl,
        	    data: arrayData,
        	    withCredentials: true
        	});	
}

export function cargarDatosReporte(apiUrl,table,fecha1,fecha2){
	//cargar los datos del reporte
	return axios.get(apiUrl+table+'Report', {
	            withCredentials: true, 
	            params: { 
	                fecha1 : fecha1,
	                fecha2 : fecha2            
	            } 
	        });
}