// import React from 'react'
// import './rules.css';
// import Header from '../Header/Header';
// const Rules = () => {
//   return (
//     <div className='rules'>
//       <Header/>
//       <div className='rules2'>
//       <div className='rules__title'>
//           <div className='text_title'>Правила игры</div>
//           </div>
//
//
//
//           <div className='rules__block1'>
//           <div className='rules__block2'>
//         Ход игры: Игроки ходят по очереди. Игрок имеет право перемещать по одной фигуре за каждый ход. Если перемещаемая вами фигура заканчивает свой ход на поле, занятом фигурой противника, то вы можете взять или «съесть» фигуру соперника. Для этого нужно убрать фигуру соперника с доски и на её поле поставить свою фигуру, которой вы ходили. Как только вы сделаете ход, который приведёт к поимке короля вашего противника, вы выиграете. Это означает «Поставить мат» - ситуация, когда у оппонента не остаётся другого хода, чтобы спасти своего короля. В шахматах нельзя делать ход, который сразу подвергает вашего короля немедленному взятию.
//
//         </div>
//           </div>
//           </div>
//     </div>
//
//   )
// }
//
// export default Rules
import React from 'react'
import {Link} from "react-router-dom";
import './rules.css';
import Header from '../Header/Header';
const Rules = () => {
    return (
        <div className='rules'>
            <Header/>
            <div className='rules2'>
                <button className='button_nazad'>
                    <div className='button_nazad1'>
                        <Link to={"/"}><div className='button_text'>НАЗАД</div></Link>
                    </div>
                </button>
                <div className='rules__title'>
                    <div className='text_title'>Правила игры</div>
                </div>



                <div className='rules__block1'>
                    <div className='rules__block2'>
                        Ход игры: Игроки ходят по очереди. Игрок имеет право перемещать по одной фигуре за каждый ход. Если перемещаемая вами фигура заканчивает свой ход на поле, занятом фигурой противника, то вы можете взять или «съесть» фигуру соперника. Для этого нужно убрать фигуру соперника с доски и на её поле поставить свою фигуру, которой вы ходили. Как только вы сделаете ход, который приведёт к поимке короля вашего противника, вы выиграете. Это означает «Поставить мат» - ситуация, когда у оппонента не остаётся другого хода, чтобы спасти своего короля. В шахматах нельзя делать ход, который сразу подвергает вашего короля немедленному взятию.

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Rules