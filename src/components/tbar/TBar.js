/**
* CLASS Tbar
*
* Contiene el componente principal de la Toolbar
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import configJson from '../configuration/configuration.json';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import MaterialIcon from 'material-icons-react';
import './tbar.css';

class TBar extends Component {

	render() {
		var lengthTbar = this.props.items.length;
        var display = "table-cell";      
        if(lengthTbar === 1){
            display = "block";  
        } 
		return <div style={{backgroundColor : configJson.windowColor }} className="tbarContainer" >
                {                                                              
                    this.props.items.map((items,i) => {//cargar la tbar
                        return (<div className="tbarButton" key={i} style={{width:items.width,height:items.height,display:display}}  >                                    
	                               	<div style={{display:items.display}}>
		                                <div id={"tbarButton"+i} style={{width:'calc(100% - 5px)',float:'left',display:items.display,cursor:'pointer'}} onClick={items.function} onMouseOut={divMouseOut.bind(this,"tbarButton"+i,configJson.windowColor)} onMouseOver={divMouseOver.bind(this,"tbarButton"+i,configJson.windowColor)}> 
		                                    <MaterialIcon size={24} icon={items.icon} invert/>
		                                    <button className="save">{items.title}</button>                                             
		                                </div>
		                                {//la barra separadora
		                                   i < this.props.items.length-1 ? 
		                                      <div className="tbarSeparator" style={{height:items.height}}></div>
		                                   : ''
		                                }
	                                </div>
	                            </div>	                        
                        )
                    })                   
                }
                </div>
	} 

}

export default TBar