import {time_periods} from '../../services/constants';
import {convertObjectToArray} from '../../services/utility';

export default function SelectPeriod(props) {
  const {selectedPeriod, updatePeriod} = props;
  let periodArr = convertObjectToArray(time_periods);
  let displayPeriod = periodArr.find(
    (period) => period.value === selectedPeriod
  );
  if (!displayPeriod) {
    displayPeriod = time_periods.THIS_YEAR; //fallback incase the time period is not found
  }
  return (
    <div className='dropdown mt-3 mt-sm-0'>
      <button
        type='button'
        className='btn btn-primary dropdown-toggle light fs-14'
        data-toggle='dropdown'
        aria-expanded='false'
      >
        {displayPeriod.display}
      </button>
      <div className='dropdown-menu'>
        {periodArr.map((period) => (
          <button
            key={period.value}
            className='dropdown-item'
            onClick={() => updatePeriod(period.value)}
          >
            {period.display}
          </button>
        ))}
      </div>
    </div>
  );
}
