import { useRouter } from 'next/router';
import ApplicationData from '../../models/ApplicationData';
import TeamData from '../../models/TeamData';
import UserBallot from '../../models/UserBallot';
import { connectMongo } from "../../utils/connect";

export default function UserRanking (props){
    const router = useRouter();
    const { id } = router.query;   
}