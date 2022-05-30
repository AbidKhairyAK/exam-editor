import React, { Component } from 'react'
import CKEditor from "ckeditor4-react"

import ModalWrapper from './ModalWrapper/index.js'
import { editorToolbar } from '../constants/editor'

class QuestionEditorModal extends Component {
	state = {
		editorContentRows: [],
		editorContent: '',
	}

	componentDidMount () {
		if (!this.props.editorData.questions) return
		const editorContent = this.props.editorData.questions.reduce((questionAcc, question) => {
			let questionText = questionAcc
			questionText += '<p>' + question.question_text.replace(/(<([^>]+)>)/ig, '').replace('/[\n\r]/g', '') + '</p>\n'
			questionText += !question.options ? '' : question.options.reduce((optionAcc, option, index, options) => {
				let optionText = optionAcc
				optionText += '<p>' + option.option_text.replace(/(<([^>]+)>)/ig, '').replace('/[\n\r]/g', '') + '</p>\n'
				optionText += index === options.length - 1 ? '<p>&nbsp;</p>\n' : ''
				return optionText
			}, '')
			return questionText
		}, '')

		this.setState({ editorContent })
	}

	handleChange = e => {
		const editorContent = e.editor.getData()
		const rowSplittedContents = editorContent.split("\n")
		const editorContentRows = []
		for (let i = 0; i < rowSplittedContents.length; i++) {
			if (rowSplittedContents[i] !== "") {
				// regex menghilangkan nomor / pg di depan text
				let string = rowSplittedContents[i]
				string = rowSplittedContents[i].replace(/>\s*([a-zA-Z0-9]+)(\s*)\./g, ">")
				editorContentRows.push(string)
			}
		}
		this.setState({ editorContent, editorContentRows })
	}

	handleFormSubmit = e => {
		e.preventDefault()

		const optionCount = this.props.editorData.optionCount || 0
		const editorContentRows = this.state.editorContentRows
		const resultWrapper = []
		let itemWrapper = {}
		let options = []

		// perulangan terhadap setiap baris dari konten editor
		for (let i = 0; i < editorContentRows.length; i++) {

			// jika bukan baris pertama, maka dilakukan pemeriksaan tambahan
			if (i > 0) {

				// jika sebelumnya baris kosong, maka dianggap sebagai soal
				if (
					editorContentRows[i - 1].trim() === "<p>&nbsp;</p>" &&
					editorContentRows[i].trim().length > 0
				) {
					itemWrapper.question = editorContentRows[i].trim()
				}

				// jika tidak, maka dianggap sebagai jawaban
				else if (editorContentRows[i].trim().length > 0) {
					// jika baris sebelumnya adalah baris kosong dan jumlah jawaban belum cukup,
					// maka tambahkan baris ini sebagai jawaban
					if (
						editorContentRows[i - 1].trim() === "<p>&nbsp;</p>" &&
						options.length <= optionCount &&
						editorContentRows[i].trim().length > 0
					) {
						options.push(editorContentRows[i].trim())
					}

					// jika baris ini bukan baris kosong dan jumlah jawaban belum cukup dan sudah ada soal,
					// maka tambahkan baris ini sebagai jawaban
					else if (
						itemWrapper.question &&
						options.length <= optionCount &&
						editorContentRows[i].trim() !== "<p>&nbsp;</p>"
					) {
						options.push(editorContentRows[i].trim())
					}
				}
			}

			// jika baris pertama, maka dianggap sebagai soal
			else {
				itemWrapper.question = editorContentRows[i].trim()
			}

			// jika pertanyaan sudah ada
			// dan jumlah jawaban lebih atau sama dengan maksimal jawaban
			// atau baris selanjutnya merupakan baris kosong
			// maka pasang jawaban yang terkumpul dan reset wrapper
			if (
				itemWrapper.question && (
					options.length >= optionCount || (
						editorContentRows[i + 1] &&
						editorContentRows[i + 1].trim() === "<p>&nbsp;</p>"
					) ||
					editorContentRows[i + 1] === undefined
				)
			) {
				itemWrapper.options = options
				resultWrapper.push(itemWrapper)
				options = []
				itemWrapper = {}
			}
		}

		this.props.onSubmit(resultWrapper)
	}

	render() {
		return <ModalWrapper
			isShow={this.props.isShow}
			toggleModal={this.props.toggleModal}
			title="Editor Soal"
			className="modal-lg"
		>
			<form onSubmit={this.handleFormSubmit}>
				<CKEditor
					data={this.state.editorContent}
					onChange={this.handleChange}
					config={{ height: '50vh', toolbar: editorToolbar }}
				/>
				<div className="d-flex justify-content-center mt-3">
					<button className="btn btn-primary"><b>Submit</b></button>
				</div>
			</form>
		</ModalWrapper>
	}
}

export default QuestionEditorModal
