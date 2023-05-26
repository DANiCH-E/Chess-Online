import React from 'react'
import '../Win/endgame.css';
import {Link, useParams} from "react-router-dom";
const Fail = () => {
    return(
        <div className='block'>

            <div className='text'>Поражение</div>
            <button className='button_nazad100'>
                <Link to={"/"}><div className='button_text102'>ВЕРНУТЬСЯ К МЕНЮ</div></Link>

            </button>
        </div>
    )

}

export default Fail;