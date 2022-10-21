import connectMongo from '../util/connectMongo';
import TeamData from '../models/TeamData';

export const getServerSideProps = async () => {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING DOCUMENTS');
    const tests = await TeamData.find();
    console.log('FETCHED DOCUMENTS');

    return {
      props: {
        tests: JSON.parse(JSON.stringify(tests)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default function Home({ tests }) {
    // ...
    return (
      //   ...
      <div className={styles.grid}>
        {tests.map((test) => (
          <a
            href="https://nextjs.org/docs"
            key={test._id}

          >
            <h2>{test.name} &rarr;</h2>
          </a>
        ))}
      </div>
      // ...
    );
  }
  