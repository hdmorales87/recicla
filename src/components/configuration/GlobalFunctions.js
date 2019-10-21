/**
* GlobalFunctions
*
* Contiene todas las funciones globales de la APP
* @author Hector Morales <warrior1987@gmail.com>
*
*/

export function divMouseOver(field,color,e){
	//cambia el color al pasar por encima		
	if(e.currentTarget.id){ 
		if(e.currentTarget.id=== field){
			e.currentTarget.style.cursor = 'pointer';
			e.currentTarget.style.backgroundColor = LightenDarkenColor(color,20);
		}
	}
}

export function divMouseOut(field,color,e){	
	//cambia el color al salir del div
	if(e.currentTarget.id){ 
		if(e.currentTarget.id=== field){
			e.currentTarget.style.cursor = 'default';
			e.currentTarget.style.backgroundColor = color;
		}
	}	
}

function LightenDarkenColor(col,amt) { 
	var usePound = false; 
	if ( col[0] === "#" ) { 
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

export function detectaDispostivo(){
	let nVer   = navigator.appVersion;
	let ua     = navigator.userAgent;
	let os     = '-';
	let cs     = '';
	let osType = 'desktop';

	let clientStrings = [
		{
		  s: 'Windows 10',
		  r: /(Windows 10.0|Windows NT 10.0)/
		},
		{
		  s: 'Windows 8.1',
		  r: /(Windows 8.1|Windows NT 6.3)/
		},
		{
		  s: 'Windows 8',
		  r: /(Windows 8|Windows NT 6.2)/
		},
		{
		  s: 'Windows 7',
		  r: /(Windows 7|Windows NT 6.1)/
		},
		{
		  s: 'Windows Vista',
		  r: /Windows NT 6.0/
		},
		{
		  s: 'Windows Server 2003',
		  r: /Windows NT 5.2/
		},
		{
		  s: 'Windows XP',
		  r: /(Windows NT 5.1|Windows XP)/
		},
		{
		  s: 'Windows 2000',
		  r: /(Windows NT 5.0|Windows 2000)/
		},
		{
		  s: 'Windows ME',
		  r: /(Win 9x 4.90|Windows ME)/
		},
		{
		  s: 'Windows 98',
		  r: /(Windows 98|Win98)/
		},
		{
		  s: 'Windows 95',
		  r: /(Windows 95|Win95|Windows_95)/
		},
		{
		  s: 'Windows NT 4.0',
		  r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
		},
		{
		  s: 'Windows CE',
		  r: /Windows CE/
		},
		{
		  s: 'Windows 3.11',
		  r: /Win16/
		},
		{
		  s: 'Android',
		  r: /Android/
		},
		{
		  s: 'Open BSD',
		  r: /OpenBSD/
		},
		{
		  s: 'Sun OS',
		  r: /SunOS/
		},
		{
		  s: 'Linux',
		  r: /(Linux|X11)/
		},
		{
		  s: 'iOS',
		  r: /(iPhone|iPad|iPod)/
		},
		{
		  s: 'Mac OS X',
		  r: /Mac OS X/
		},
		{
		  s: 'Mac OS',
		  r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
		},
		{
		  s: 'QNX',
		  r: /QNX/
		},
		{
		  s: 'UNIX',
		  r: /UNIX/
		},
		{
		  s: 'BeOS',
		  r: /BeOS/
		},
		{
		  s: 'OS/2',
		  r: /OS\/2/
		},
		{
		  s: 'Search Bot',
		  r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
		}
	];

	let id=0;	

	for(id in clientStrings){
		cs = clientStrings[id];		
		if(cs.r.test(ua)){
		 	os = cs.s;
		 	break;
		}				
	}

	let osVersion = '-'

	if (/Windows/.test(os)){
		osVersion = /Windows (.*)/.exec(os)[1];
		os        = 'Windows';
		osType    = 'desktop';
	}
		

	if(os === 'Mac OS X'){
		osVersion = /Mac OS X (10[._\d]+)/.exec(ua)[1];
		osType    = 'desktop';
	}
		

	if(os === 'Android'){
		osVersion = /Android ([._\d]+)/.exec(ua)[1];
		osType    = 'movil';
	}
		

	if(os === 'iOS'){
		// iOS 8+ UA changed
		if(/(iphone|ipod|ipad).* os 8_/.test(ua.toLowerCase())){
			osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0]
			osType    = 'movil'
		}			
		else{
			osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
			osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
			osType    = 'movil';
		}			
	}
      	

	return {
		os        : os,
		osVersion : osVersion,
		osType    : osType,
		//ANDROID: 'Android'
		//IOS: 'iOS'
	}	

}