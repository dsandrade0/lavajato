import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {xfetch} from '../commons/Commons';

type LCState = {
	clients: Array,
	isLoading: boolean,
}

class ListClient extends React.Component<{}, LCState> {
	initialState: LCState
	constructor(props) {
		super(props);
		this.initialState = {
			clients: [],
			isLoading: false,
		};
		this.state = this.initialState;
	}

	componentDidMount() {
		this.setState({isLoading: true});
		// xfetch é um método criado usando a biblioteca fetch para facilitar o trabalho
		// Olhar em commons/Commons.js
		xfetch('/clients', {}, 'get')
			.then(res => res.json())
			.then(data => this.setState({clients: data, isLoading: false}));
	}

	render() {
		const {clients, isLoading} = this.state;

		if(isLoading) {
			return <div> Carregando <i className="fa fa-spinner fa-spin"/> </div>;
		}

		return (
			<div className="col-12 text-center">
				<table className="table table-hover">
					<thead>
						<tr>
							<th> Nome </th>
							<th> Telefone </th>
							<th> Email </th>
							<th> Veiculo </th>
							<th> Acao </th>
						</tr>
					</thead>
					<tbody>
						{clients.map((v, k) => {
							return (
								<tr key={k}>
									<td> {v.name} </td>
									<td> {v.phone} </td>
									<td> {v.email} </td>
									<td> {v.car} </td>
									<td> 
										<Link to={'/wash/'+v.id}> 
											<span title='Novo Servico' className="fa fa-plus"/>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ListClient;
