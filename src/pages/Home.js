import Banner from '../components/Banner';

export default function Home() {
	const data ={
		title: "Blog App",
		content: "Blog App Client",
		destination: "/posts",
		buttonLabel: "START POSTING"
	}

	return (
		<>
			<Banner data={data}/>
		</>
	)
}