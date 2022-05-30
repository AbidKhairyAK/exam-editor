import React, { Component } from 'react'

import ModalWrapper from './ModalWrapper/index.js'

class QuestionTypeModal extends Component {
	state = {
		questionType: this.props.availableTypes.length ? this.props.availableTypes[0] : '',
		optionCount: '',
		tags: ''
	}

	handleFormChange = stateName => event => {
		this.setState({ [stateName]: event.target.value })
	}

	handleFormSubmit = event => {
		event.preventDefault()
		this.props.addQuestionType(this.state)
		this.props.toggleModal()
	}

	render() {
		return <ModalWrapper
			isShow={this.props.isShow}
			toggleModal={this.props.toggleModal}
			title="Pilih Tipe Soal"
		>
			<form onSubmit={this.handleFormSubmit}>
				<table className="w-100">
					<tbody>
						<tr>
							<td>Tipe Soal</td>
							<td className="py-2">
								<select
									className="form-control"
									onChange={this.handleFormChange('questionType')}
									required
								>
									<option value="">- Pilih tipe soal -</option>
									{this.props.availableTypes.map(({ value, label }) =>
										<option value={value} key={value}>{label}</option>
									)}
								</select>
							</td>
						</tr>

						{this.state.questionType !== 'essay' &&
							<tr>
								<td>Jumlah Opsi Jawaban</td>
								<td className="py-2">
									<input
										className="form-control"
										placeholder="Tentukan jumlah opsi jawaban"
										type="number"
										min="1" max="100"
										value={this.state.optionCount}
										onChange={this.handleFormChange('optionCount')}
										required
									/>
								</td>
							</tr>
						}

						<tr>
							<td>Label Soal</td>
							<td className="py-2">
								<input
									className="form-control"
									placeholder="Digunakan saat pencarian soal"
									value={this.state.tags}
									onChange={this.handleFormChange('tags')}
								/>
							</td>
						</tr>
					</tbody>
				</table>

				<div className="d-flex justify-content-center mt-3">
					<button className="btn btn-primary"><b>Tambah Tipe Soal</b></button>
				</div>
			</form>
		</ModalWrapper>
	}
}

export default QuestionTypeModal