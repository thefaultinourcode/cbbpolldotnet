import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Season (props){
    const router = useRouter();
    const season = router.query;
    let weeks = ['Pre-Season', 2, 3, 4, 5];
    let year = 2023;

    let links = [];

    let pollDate = new Date('5 December 2022 15:00 UTC');
    let today = new Date();
    //let today = new Date('3 May 2023 14:00 UTC');
    let week;

    if(today > pollDate){
      week = 5;
    }
    else if (today < pollDate){
      week = 4;
    }

    if(week === 5){
        for(let i = 0; i < weeks.length; i++){
            links.push(<li><Link href={`./${year}/${weeks[i]}`}>{weeks[i]}</Link></li>)
        }    
    }
    else if (week === 4){
        for(let i = 0; i < weeks.length-1; i++){
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