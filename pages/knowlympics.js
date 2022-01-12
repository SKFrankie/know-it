import {KnowlympicsButton} from '../ui/Button'
import { useUserContext } from "../context/user";

const knowlympics = () => {
  const [currentUser] = useUserContext();
  return (
    <div>
    Knowlympics
      <KnowlympicsButton text="Start" disabled={!currentUser?.stars} />
    </div>
  )
}

export default knowlympics
