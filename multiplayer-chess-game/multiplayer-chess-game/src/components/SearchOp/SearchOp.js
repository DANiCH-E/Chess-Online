import React from 'react'
import './search.css';
import {Link, useParams} from "react-router-dom";
import Header from '../Header/Header';

const SearchOp = () => {
  return (
      <div>
        <Header/>
        <div className='search text'>
          <div className='search1'>
            <div className='text1'>
              Поиск соперника...
            </div>
          </div>



        </div>
      </div>

  )
}

export default SearchOp