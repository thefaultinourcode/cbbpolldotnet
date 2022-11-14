import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Season (props){
    const router = useRouter();
    const season = router.query;
    let weeks = ['Pre-Season', 2];
    let year = 2023;

    let links = [];

    let pollDate = new Date('14 November 2022 15:00 UTC');
    let today = new Date();
    //let today = new Date('31 October 2022 14:00 UTC');
    let week;

    if(today > pollDate){
      week = 2;
    }
    else{
      week = "Pre-Season";
    }

    if(week === 2){
        for(let i = 0; i < weeks.length; i++){
            links.push(<li><Link href={`./${year}/${weeks[i]}`}>{weeks[i]}</Link></li>)
        }    
    }
    else{
        links.push(<li><Link href={`./${year}/${weeks[0]}`}>{weeks[0]}</Link></li>)
    }

    return(
        <div>
            <h1>{season.season} Results</h1>
            <o>{links.map(link => link)}</o>
        </div>
    );
}