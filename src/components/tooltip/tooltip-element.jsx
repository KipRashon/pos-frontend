import React, {useEffect} from 'react';
import $ from 'jquery';

export default function ToolTipElement(props) {
  const {children, tooltip} = props;
  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
  }, []);
  return (
    <div
      className='link w-50 '
      data-toggle='tooltip'
      data-placement='bottom'
      title={tooltip}
    >
      {children}
    </div>
  );
}
