import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCloseDate } from '../../utils/getDates';

export default function Season(props) {
	const router = useRouter();
	const season = router.query;
	console.log('season:', season);
	let weeks = ['Pre-Season', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 'Post-Season'];
	let year = 2023;

	let links = [];
	
	let pollDate = new Date('6 April 2023 21:00 UTC');
	let today = new Date();
	//let today = new Date('3 May 2023 14:00 UTC');
	let week;

	if (today > pollDate) {
		week = 'Post-Season';
	} else if (today < pollDate) {
		week = 19;
	}

	if (week === 'Post-Season') {
		for (let i = 0; i < weeks.length; i++) {
			links.push(
				<li>
					<Link href={`./${year}/${weeks[i]}`}>{weeks[i]}</Link>
				</li>
			);
		}
	} else if (week === 19) {
		for (let i = 0; i < weeks.length - 1; i++) {
			links.push(
				<li>
					<Link href={`./${year}/${weeks[i]}`}>{weeks[i]}</Link>
				</li>
			);
		}
	} else {
		links.push(
			<li>
				<Link href={`./${year}/${weeks[0]}`}>{weeks[0]}</Link>
			</li>
		);
	}


    let links2 = [];

    //TODO: refactor
    //placeholder
    links2.push(<li><Link href={`./2024/Pre-Season`}>Pre-Season</Link></li>)
    links2.push(<li><Link href={`./2024/2`}>2</Link></li>)
    links2.push(<li><Link href={`./2024/3`}>3</Link></li>)
    links2.push(<li><Link href={`./2024/4`}>4</Link></li>)
    links2.push(<li><Link href={`./2024/5`}>5</Link></li>)
    links2.push(<li><Link href={`./2024/6`}>6</Link></li>)
    links2.push(<li><Link href={`./2024/7`}>7</Link></li>)
    links2.push(<li><Link href={`./2024/8`}>8</Link></li>)
    links2.push(<li><Link href={`./2024/9`}>9</Link></li>)
	links2.push(<li><Link href={`./2024/10`}>10</Link></li>)
	links2.push(<li><Link href={`./2024/11`}>11</Link></li>)
	links2.push(<li><Link href={`./2024/12`}>12</Link></li>)
	links2.push(<li><Link href={`./2024/13`}>13</Link></li>)
	links2.push(<li><Link href={`./2024/14`}>14</Link></li>)
	links2.push(<li><Link href={`./2024/15`}>15</Link></li>)
    links2.push(<li><Link href={`./2024/16`}>16</Link></li>)
	links2.push(<li><Link href={`./2024/17`}>17</Link></li>)
	links2.push(<li><Link href={`./2024/18`}>18</Link></li>)
	links2.push(<li><Link href={`./2024/19`}>19</Link></li>)
	links2.push(<li><Link href={`./2024/20`}>20</Link></li>)

    let currentWeek = getCloseDate();
    if(today >= currentWeek){
        links2.push(<li><Link href={`./2024/Post-Season`}>Post-Season</Link></li>);
	}

	let links3 = [];
	links3.push(<li><Link href={`./2025/Pre-Season`}>Pre-Season</Link></li>);
	links3.push(<li><Link href={`./2025/2`}>2</Link></li>);
	links3.push(<li><Link href={`./2025/3`}>3</Link></li>);
	links3.push(<li><Link href={`./2025/4`}>4</Link></li>);
	links3.push(<li><Link href={`./2025/5`}>5</Link></li>);
	links3.push(<li><Link href={`./2025/6`}>6</Link></li>);
	links3.push(<li><Link href={`./2025/7`}>7</Link></li>);
	links3.push(<li><Link href={`./2025/8`}>8</Link></li>);
	links3.push(<li><Link href={`./2025/9`}>9</Link></li>);
	links3.push(<li><Link href={`./2025/10`}>10</Link></li>);
	links3.push(<li><Link href={`./2025/11`}>11</Link></li>);
	links3.push(<li><Link href={`./2025/12`}>12</Link></li>);
	links3.push(<li><Link href={`./2025/13`}>13</Link></li>);
	links3.push(<li><Link href={`./2025/14`}>14</Link></li>);
	links3.push(<li><Link href={`./2025/15`}>15</Link></li>);
	links3.push(<li><Link href={`./2025/16`}>16</Link></li>);
	links3.push(<li><Link href={`./2025/17`}>17</Link></li>);

	return (
		<div>
			<h1>2025 Results</h1>
			<o>{links3.map((link) => link)}</o>
			<h1>2024 Results</h1>
			<o>{links2.map((link) => link)}</o>
			<h1>2023 Results</h1>
			<o>{links.map((link) => link)}</o>
		</div>
	);
}

