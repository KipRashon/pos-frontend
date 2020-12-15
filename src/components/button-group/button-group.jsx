import React, {useEffect, useState} from 'react';

export default function ButtonGroup(props) {
  const {buttons, selected, updateChangeSelected} = props;
  const [selectedValue, setSelectedValue] = useState('');
  useEffect(() => {
    if (selected || selected === 0) {
      setSelectedValue(selected);
    }
  }, [selected]);
  return (
    <div className='btn-group col-12' role='group' aria-label='Button group'>
      {buttons.map((btn) => (
        <button
          type='button'
          className={`btn btn-${
            selectedValue === btn.value ? 'dark' : 'white border-dark'
          }`}
          onClick={() => {
            setSelectedValue(btn.value);
            updateChangeSelected(btn.value);
          }}
        >
          {btn.display}
        </button>
      ))}
    </div>
  );
}
