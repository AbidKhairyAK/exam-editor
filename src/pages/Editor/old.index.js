import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux"

import Editor from ".
import ImportSoal from "./ImportSoal"
import BankSoal from "./BankSoal"
import './module.css'

class SoalUjian extends Component {
	componentDidMount () {
		const { url, history, sumberSoal } = this.props;

		if (sumberSoal) {
			history.push(`${url}/soal-ujian/${sumberSoal}/178`)
		}
	}

	render() {
		const { url } = this.props;
		return (
			<div id="soal-ujian" className="px-3 pt-3">
				<Switch>
					<Route exact path={`${url}/soal-ujian/buat-soal-manual/:examId`} component={Editor} />
					<Route exact path={`${url}/soal-ujian/import-soal/:examId`} component={ImportSoal} />
					<Route exact path={`${url}/soal-ujian/bank-soal/:examId`} component={BankSoal} />
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		sumberSoal: state.settingsUjianReducer.sumberSoal
	};
};

export default connect(mapStateToProps)(SoalUjian);