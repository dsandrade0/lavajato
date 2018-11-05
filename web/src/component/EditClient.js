import React from 'react';
import {xfetch} from '../commons/Commons';

type NCSState = {
	client: object,
	inserted: boolean,
    isLoading: boolean,
}

class EditClient extends React.Component<{}, NCSState> {
	initialState: NCSState
	constructor(props: NCSProps) {
		super(props);
		this.initialState = {
			client: {},
			inserted: false,
            isLoading: false,
		};
		this.state = this.initialState;
	}

	componentDidMount() {
		this.setState({isLoading: true});
		xfetch('/client/'+this.props.match.params.clientId, {}, 'get')
			.then(resp => resp.json())
			.then(data => this.setState({client: data, isLoading: false})); 
	}

    handleInputChange = (ev: SynteticEvent<>) => {
        let target = ev.target;
        
		this.setState({
            client: target.name,
        });
    }

	handleSubmit = (e: SynteticEvent<>) => {
		e.preventDefault();
		const data = {
            clientId: Number.parseInt(this.props.match.params.clientId),
		};

        this.setState({
            inserted: true,
        });
	}

    render() {
        let {client, isLoading, inserted} = this.state;
		let resp = <div/>;
		if (inserted) {
			resp = (
				<div className='col-12 text-center'> 
					<label className='alert alert-success'>
						Cliente alterado com sucesso
					</label>
				</div>
			);
		}
		return(
			<div className="col-12 text-center">
				{resp}
				<form onSubmit={this.handleSubmit}>
					<div className="form-row">
						<div className="col-12">
							<input
                                name="nameClient"
								type="text"
								className="form-control"
								value={client.name}
                                onChange={this.handleInputChange}/>
						</div>
						<div className="col-12">
							<input
								name="email"
                                type="text"
								className="form-control"
								value={client.email}
                                onChange={this.handleInputChange}/>
						</div>
						<div className="col-12">
							<input
                                name="phone"
								type="text"
								className="form-control"
								value={client.phone}
                                onChange={this.handleInputChange}/>
						</div>
						<div className="col-12">
							<input
                                name="car"
								type="text"
								className="form-control"
								value={client.car}
                                onChange={this.handleInputChange}/>
						</div>
						<div className="col-12" style={({margin: '10px'})}>
							<button className="btn btn-success"> Alterar </button>
						</div>
					</div>
				</form>	
			</div>
		);
	}
}

export default EditClient;