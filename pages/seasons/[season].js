import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Season (props){
    const router = useRouter();
    const season = router.query;
    let weeks = ['Pre-Season', 2];
    let year = 2023;

    let links = [];
    for(let i = 0; i < weeks.length; i++){
        links.push(<li><Link href={`./${year}/${weeks[i]}`}>{weeks[i]}</Link></li>)
    }

    return(
        <div>
            <h1>{season.season} Results</h1>
            <o>{links.map(link => link)}</o>
        </div>
    );
}