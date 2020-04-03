import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStream, editStream } from '../../actions/index';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = formValues => {
		// console.log(this.props);
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.stream) {
			return <div className='ui active centered inline loader' />;
		}

		return (
			<div>
				<h3> Edit a Stream </h3>
				<StreamForm
					onSubmit={this.onSubmit}
					// Note - lodash handles picking a certain key
					initialValues={_.pick(this.props.stream, 'title', 'description')}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
