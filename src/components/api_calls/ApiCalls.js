/**
* ApiCalls
*
* Contiene todas las llamadas a la API
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import axios from 'axios';
import globalState from '../configuration/GlobalState';

const path = "http://"+window.location.hostname+":5000/";

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

export function loadComboBoxDataGrid(apiField,where){
	//carga el combobox dinamico 
	return axios.get(path+apiField, {withCredentials: true,params: { where : where}});
}

export function consultarFilas(apiField,searchWord,date1,date2){
	var companyData = globalState.getState().companyData;
	var id_empresa = 0;
	if(companyData !== undefined){
		id_empresa = globalState.getState().companyData[0].id;
	}	
	//consulta el numero de filas de la grilla
	return axios.get(path+apiField+'Rows', {
    		    withCredentials: true, 
    		    params: { 
    		        searchWord : searchWord, 
    		        id_empresa : id_empresa,
    		        date1 	   : date1,
    		        date2      : date2               
    		    } 
    		});
}

export function cargarFilas(apiField,searchWord,showRecords,offsetRecord,date1,date2){
	var companyData = globalState.getState().companyData;	
	var id_empresa = 0;
	if(companyData !== undefined){
		id_empresa = globalState.getState().companyData[0].id;
	}
	//trae las filas filas de la grilla
	return axios.get(path+apiField, {
				withCredentials: true, 
				params: { 
					searchWord   : searchWord,
					showRecords  : showRecords,
					offsetRecord : offsetRecord,
					id_empresa   : id_empresa,
					date1        : date1,
					date2 		 : date2					
				} 
			});
}

export function eliminarFilas(apiField,id){
	//elimina una fila de la grilla
	return axios.delete(path+apiField,{            
        	    data: {id : id},
        	    withCredentials: true
        	});
}

export function insertarActualizarFila(method,apiField,arrayData){
	//inserta actualiza una fila en la grilla
	return axios({
        	    method: method,
        	    url: path+apiField,
        	    data: arrayData,
        	    withCredentials: true
        	});	
}

export function cargarDatosReporte(table,fecha1,fecha2){
	//cargar los datos del reporte
	return axios.get(path+table+'Report', {
	            withCredentials: true, 
	            params: { 
	                fecha1 : fecha1,
	                fecha2 : fecha2            
	            } 
	        });
}

export function sendEmailPassword(email){	
	//envia correo para cambiar password
	return axios({
        	    method: 'post',
        	    url: path+'emailPassword',
        	    data: { 'email': email },
        	    withCredentials: true
        	});	
}

export function checkToken(email,token){	
	//chequea si el token del correo es el vigente
	return axios({
        	    method: 'post',
        	    url: path+'checkToken',
        	    data: { 'email': email,'token': token },
        	    withCredentials: true
        	});	
}

export function updatePassword(email,password){	
	//actualiza el password
	return axios({
        	    method: 'post',
        	    url: path+'updatePassword',
        	    data: { 'email': email,'password': password },
        	    withCredentials: true
        	});	
}

export function uploaderFile(file,table,field,id,folder){	
	var formData = new FormData();
	formData.append("file", file);
	formData.append("table", table);
	formData.append("field", field);
	formData.append("id", id);
	formData.append("folder", folder);
	//enviar el archivo
	return axios.post(path+'uploaderFile',
				formData,
				{
	            	withCredentials: true,	            
	           		headers: {
            			'content-type': 'multipart/form-data'
        			} 
	        	}
	        );
}

export function listadoPermisos(idRol){		
	//consulta el numero de filas de la grilla
	return axios.get(path+'listadoPermisos', {
    		    withCredentials: true, 
    		    params: {  
    		    	idRol : idRol       
    		    } 
    		});
}

export function guardaPermisos(idRol,arrayPermisos){	
	//actualiza los permisos
	return axios({
        	    method: 'post',
        	    url: path+'guardaPermisos',
        	    data: { 'idRol': idRol,'arrayPermisos': arrayPermisos },
        	    withCredentials: true
        	});	
}

export function validarPermiso(idRol,idPermiso){
	//consulta el numero de filas de la grilla
	return axios.get(path+'validarPermiso', {
    		    withCredentials: true, 
    		    params: {  
    		    	idRol 	  : idRol,
    		    	idPermiso : idPermiso      
    		    } 
    		});
}