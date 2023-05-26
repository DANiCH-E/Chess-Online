import React from 'react'
import './endgame.css';
import {Link, useParams} from "react-router-dom";
const Win = () => {
    return(
//     <div>
//         <div className='b-container'>
//     Sample Text

// </div>
// <div class="b-popup">
//     <div class="b-popup-content">
//         Text in Popup
//     </div>
// </div>
//     </div>



        <div>

            <div className='text'>dbsjcwsejnwlnwlndsk,c,scnldvdlkbvkdn,xnc</div>
            <div class="b-popup">
                <div className='block'>

                    <div className='text'>Победа!</div>
                    <button className='button_nazad100'>
                        <Link to={"/"}><div className='button_text102'>ВЕРНУТЬСЯ К МЕНЮ</div></Link>

                    </button>
                </div>
            </div>
        </div>

    )

}

export default Win;