import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fecthStreams } from '../../actions';
import { Link } from 'react-router-dom';
import StreamCreate from './StreamCreate';

class StreamList extends Component {
	componentDidMount() {
		this.props.fecthStreams();
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className='right floated content'>
					<button className='ui button primary'>Edit</button>
					<button className='ui button negative'>Delete</button>
				</div>
			);
		}
	}

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div className='item' key={stream.id}>
					{this.renderAdmin(stream)}
					<i className='large middle aligned icon camera' />
					<div className='content'>
						{stream.title}
						<div className='description'>{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to='/streams/new' className='ui button primary'>
						Create Stream
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className='ui celled list'>{this.renderList()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	// Note neeed to turn into an array Obect.values does the job
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { fecthStreams })(StreamList);
