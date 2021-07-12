
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, fas } from '@fortawesome/free-solid-svg-icons'

interface Props {
  Num:number;
}

export default function Component({Num}: Props) {
  return (
    <div className="text-sm text-blue-500 items-center">
      <FontAwesomeIcon icon={faComment} className="inline-block h-3 mr-1 align-middle"/>
        {Num}
    </div>
  );
}
