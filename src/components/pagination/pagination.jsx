import React from 'react';

export default function Pagination(props) {
  const {data, updateData} = props;
  const currentPage = data.current_page;
  const pagesCount = data.last_page;
  const links = [];

  const loop = (limStart, limEnd) => {
    for (let i = limStart; i <= limEnd; i++) {
      links.push(
        <li
          className={`page-item ${currentPage === i ? 'active' : ''}`}
          key={`page-${i}`}
        >
          <button className='page-link' onClick={() => updateData(i)}>
            {i}
          </button>
        </li>
      );
    }
  };
  if (currentPage === 1) {
    loop(1, pagesCount < 3 ? pagesCount : 3);
  } else if (currentPage < pagesCount) {
    loop(currentPage - 1, currentPage + 1);
  } else {
    let loopStart = pagesCount - 3;
    console.log(loopStart);
    console.log(pagesCount);
    loop(loopStart > 0 ? loopStart : 1, pagesCount);
  }
  return (
    <div className='w-100 row justify-content-center '>
      <div className='col'>
        Showing {data.from}-{data.to} of {data.total}
      </div>
      <div className='col row justify-content-center'>
        <nav>
          <ul class='pagination pagination-circle'>{links}</ul>
        </nav>
      </div>
      <div className='col'></div>
    </div>
  );
}
