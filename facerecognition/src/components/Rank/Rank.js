import React from 'react';


const Rank = ({userName,userEntries}) => {
    return (
        <div>
            <div className='white f2 b dark-green'>
              {`${userName}, your curent entry count is...`}
            </div>
            <div className='white f1 b dark-green'>
              {`${userEntries}`}
            </div>
        </div>
    );
}

export default Rank;