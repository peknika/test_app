import React from 'react';
import cn from 'class-names';
import _ from 'lodash';

import './DetailModal.css';
import beerDefault from './beerDefault.png'

const DetailModal = ({ item, isDetailed, dismissModal }) => {
    const {
        image_url,
        abv, ebc,
        ibu, ph,
        srm,
        attenuation_level,
        description,
        food_pairing,
        ingredients
    } = item;
    const  { malt, hops, yeast} = ingredients;


    return (
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
                        <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={dismissModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div id="img_wrap">
                            <img alt="" src={image_url ? image_url : beerDefault} className='itemImage'/>
                        </div>
                        <p>ABV: {abv}</p>
                        <p>EBC: {ebc}</p>
                        <p>IBU: {ibu}</p>
                        <p>PH: {ph}</p>
                        <p>SRM: {srm}</p>
                        <p>Attenuation level: {attenuation_level}</p>
                        <p><b>Description</b>: {description}</p>
                        <b>Tastes best with</b>:
                        <ul>
                            {food_pairing.map((i) => <li key={i}>{i}</li>)}
                        </ul>
                        <b>Ingredients</b>:
                        <p>Malt:</p>
                        <ul>
                            {malt.map(({name, amount, attribute}) =>
                                <li key={_.uniqueId()}>{ name}: {attribute} {amount.value} {amount.unit}</li>)}
                        </ul>
                        <p>Hops:</p>
                        <ul>
                            {hops.map(({name, amount, attribute}) =>
                                <li key={_.uniqueId()}>{name}: {attribute} {amount.value} {amount.unit}</li>)}
                        </ul>
                        <p>Yeast: {yeast}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
