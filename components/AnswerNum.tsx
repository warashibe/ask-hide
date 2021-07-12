
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, fas } from '@fortawesome/free-solid-svg-icons'

interface Props {
  Num:number;
}

export default function Component({Num}: Props) {
  return (
    <div className="text-sm text-blue-500">
      <FontAwesomeIcon icon={faComment} className="inline-block h-4 pb-1 mr-2"/>
      {Num}
    </div>
  );
}
