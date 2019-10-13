/**
* GlobalFunctions
*
* Contiene todas las funciones globales de la APP
* @author Hector Morales <warrior1987@gmail.com>
*
*/

import configJson from '../configuration/configuration.json';

export function divMouseOver(field,e){
	//cambia el color al pasar por encima	
	if(e.target.id){ 
		if(e.target.id=== field){
			e.target.style.cursor = 'pointer';
			e.target.style.backgroundColor = LightenDarkenColor(configJson.fondoMenu,20);
		}
	}
}

export function divMouseOut(field,e){
	//cambia el color al salir del div
	if(e.target.id){ 
		if(e.target.id=== field){
			e.target.style.cursor = 'default';
			e.target.style.backgroundColor = configJson.fondoMenu;
		}
	}	
}

function LightenDarkenColor(col,amt) { 
	var usePound = false; 
	if ( col[0] == "#" ) { 
		col = col.slice(1); 
		usePound = true; 
	} var num = parseInt(col,16); 
	var r = (num >> 16) + amt; 
	if ( r > 255 ) r = 255; 
	else if (r < 0) r = 0; 
	var b = ((num >> 8) & 0x00FF) + amt; 
	if ( b > 255 ) b = 255; 
	else if (b < 0) b = 0; 
	var g = (num & 0x0000FF) + amt; 
	if ( g > 255 ) g = 255; 
	else if ( g < 0 ) g = 0; 
	return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16); 
}