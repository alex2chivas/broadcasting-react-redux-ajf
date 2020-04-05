import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onDelete = id => {
		this.props.deleteStream(id);
	};

	renderActions() {
		return (
			<React.Fragment>
				<button
					onClick={() => this.onDelete(this.props.match.params.id)}
					className='ui button negative'
				>
					Delete
				</button>
				<Link to='/' className='ui button'>
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	renderConent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete the stream?';
		}

		return `Are you sure you want to delete the stream with title : ${this.props.stream.title}`;
	}

	render() {
		return (
			<Modal
				title='Delete Stream'
				content={this.renderConent()}
				actions={this.renderActions()}
				onStay={e => e.stopPropagation()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
