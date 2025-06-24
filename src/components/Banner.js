import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {
    const {title, content, destination, buttonLabel} = data;

	return (
		<Row>
			<Col className="text-center responsive position-absolute top-50 start-50 translate-middle">
				<h1><b>{title}</b></h1>
				<h3 className="my-5">{content}</h3>
				<Button as={Link} variant="primary" to={destination}>{buttonLabel}</Button>
			</Col>
		</Row>
	)
}