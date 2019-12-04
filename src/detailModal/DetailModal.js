import React from 'react';
import cn from 'class-names';

import './DetailModal.css';
import beerDefault from './beerDefault.png'

const DetailModal = ({ item, isDetailed, dismissModal }) => (
    <div
        role="document"
        className={cn({
            'modal': true,
            'modal-full-height': true,
            'modal-top': true,
            fade: isDetailed,
            show: isDetailed
        })}
        style={isDetailed ? {display: 'block'} : {display: 'none'}}
    >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h4 className="modal-title w-100" id="myModalLabel">{item.name}</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={dismissModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div id="img_wrap">
                        <img alt="" src={item.image_url ? item.image_url : beerDefault} className='itemImage'/>
                    </div>
                    <p>ABV: {item.abv}</p>
                    <p>EBC: {item.ebc}</p>
                    <p>IBU: {item.ibu}</p>
                    <p>PH: {item.ph}</p>
                    <p><b>Description</b>: {item.description}</p>
                    <b>Tastes best with</b>:
                    <ul>
                        {item.food_pairing.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
export default DetailModal;
