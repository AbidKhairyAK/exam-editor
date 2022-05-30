import React, { Component } from "react";
import Select from "react-select";
import Switch from "react-switch";

class FormUjian extends Component {
  constructor() {
    super();
    this.state = {
      optionSumberSoal: [
        {
          value: "buat-soal-manual",
          label: "Buat Soal Manual",
        },
        {
          value: "import-soal",
          label: "Import Soal",
        },
        {
          value: "bank-soal",
          label: "Bank Soal",
        },
      ],
    };
    this.handleChangeSumberSoal = this.handleChangeSumberSoal.bind(this);
  }

  handleChangeSumberSoal(text) {
    this.setState({
      sumberSoal: text.value,
    });
  }

  render() {
    const { optionSumberSoal } = this.state;

    return (
      <div className="col-md-12">
        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Sumber Soal</label>
          </div>
          <div className="col-md-10 mb-3">
            <Select
              options={optionSumberSoal}
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Soal Acak</label>
          </div>
          <div className="col-md-10 mb-3">
            {/* <Select
              placeholder="Atur Soal Acak"
              name="exam_cat_id"
              simpleValue
              value={this.state.exam_cat_id}
              clearable={false}
              onChange={text =>
                  this.handleChangeMultiSelect("exam_cat_id", text)
              }
              options={this.state.dataKategori}
              isLoading={this.state.isLoadingDataKategori}
            /> */}
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Jawaban Acak</label>
          </div>
          <div className="col-md-10 mb-3">
            {/* <Select
              placeholder="Atur Jawaban Acak"
              name="exam_cat_id"
              simpleValue
              value={this.state.exam_cat_id}
              clearable={false}
              onChange={text =>
                  this.handleChangeMultiSelect("exam_cat_id", text)
              }
              options={this.state.dataKategori}
              isLoading={this.state.isLoadingDataKategori}
            /> */}
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Bobot Soal Otomatis
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Aturan Skor Soal
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>

                    <div className="col-md-10">
                      {true && (
                        <div className="d-flex align-items-center">
                          <div className="mr-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                            >
                              PENGATURAN
                            </button>
                          </div>
                          <div>
                            <p className="text-muted align-self-center">
                              Penetapan aturan nilai per soal ujian online
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Tampilkan Nilai Uian
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Tampilkan Jawaban Soal
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Tampilkan Peringkat{" "}
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                    <div className="col-md-10">
                      {true && (
                        <div className="d-flex align-items-center">
                          <div className="mr-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                            >
                              PENGATURAN
                            </button>
                          </div>
                          <div>
                            <p className="text-muted align-self-center">
                              Atur tampilan peringkat pencapaian nilai peserta
                              ujian
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Tampilkan Kelulusan{" "}
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                    <div className="col-md-10">
                      {true && (
                        <div className="d-flex align-items-center">
                          <div className="mr-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                            >
                              PENGATURAN
                            </button>
                          </div>
                          <div>
                            <p className="text-muted align-self-center">
                              Atur tampilan jawaban benar setelah ujian online
                              selesai
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Kartu Soal</label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Status Ujian Online
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Switch
                        onColor="#00A4BA"
                        offColor="#F1F1F1"
                        onHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={37}
                        width={65}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default FormUjian;
