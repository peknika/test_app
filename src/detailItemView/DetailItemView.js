import React from 'react';
import cn from 'class-names';

import './DetailItemView.css';

const DetailedItemView = ({ item, isDetailed, dismissModal }) => (
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
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h4 className="modal-title w-100" id="myModalLabel">{item.name}</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={dismissModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="row">
                    <div id="img_wrap">
                        <img alt="" src={item.image_url} className='itemImage'/>
                    </div>
                    <div className="col-md-7 inline">
                        <h6>ABV: {item.abv}</h6>
                        <h6>EBC: {item.ebc}</h6>
                        <h6>IBU: {item.ibu}</h6>
                        <h6>PH: {item.ph}</h6>
                        <p><b>Description</b>: {item.description}</p>
                        <b>Tastes best with</b>:
                        <ul>
                            {item.food_pairing.map((i) => <li key={i}>{i}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default DetailedItemView;
