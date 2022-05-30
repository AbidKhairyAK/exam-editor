import React, { Component } from "react";
import MessageAdd2 from "../../images/message-add-2.png";
import MessageEdit1 from "../../images/message-edit-1.png";
import RefreshSquare2 from "../../images/refresh-square-2.png";
import Clock from "../../images/clock.png";
import TimeStart from "../../images/timer-start.png";
import Global from "../../images/global.png";

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      listKelas: ["XII IPA 1", "XII IPA 2", "XII IPA 3"],
    };
    this.handleCloseKelas = this.handleCloseKelas.bind(this);
  }

  handleCloseKelas(index) {
    const state = [...this.state.listKelas];
    state.splice(index, 1);
    this.setState({
      listKelas: state,
    });
  }

  render() {
    const { listKelas } = this.state;
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <div
              className="card"
              style={{
                padding: "10px 20px 10px 20px",
                border: "1px solid #CFCFCF",
                boxShadow: "none",
                borderRadius: 10,
              }}
            >
              <div className="row">
                <div className="col-md-7">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="col-md-12 d-flex p-0 align-items-center mb-3">
                      <div className="mr-3">
                        <img src={RefreshSquare2} alt="icon" />
                      </div>
                      <div>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "20px",
                            letteSspacing: "0.2px",
                            color: "#000000",
                          }}
                        >
                          Tryout Kimia Dasar Semester Genap 2022
                        </p>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "20px",
                            letteSspacing: "0.2px",
                            color: "#000000",
                          }}
                        >
                          Kelas IPA
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex p-0 align-items-center mb-3">
                      <div className="mr-3">Icon</div>
                      <div>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "20px",
                            letteSspacing: "0.2px",
                            color: "#000000",
                          }}
                        >
                          Linda Merriyana Saputri S.Pd
                        </p>
                      </div>
                    </div>
                    <div>3</div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="col-md-12 d-flex p-0 align-items-center mb-3">
                      <div className="mr-3">
                        <img src={MessageEdit1} alt="icon" />
                      </div>
                      <div>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.2px",
                            color: "#8B29D9",
                          }}
                        >
                          Jumlah Soal
                        </p>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontSize: "13px",
                            lineHeight: "20px",
                            letterSpacing: "0.2px",
                            color: "#545454",
                          }}
                        >
                          25 Soal
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex p-0 align-items-center mb-3">
                      <div className="mr-3">Icon</div>
                      <div>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.2px",
                            color: "#24A060",
                          }}
                        >
                          Tipe Soal
                        </p>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontSize: "13px",
                            lineHeight: "20px",
                            letterSpacing: "0.2px",
                            color: "#545454",
                          }}
                        >
                          20 PG, 5 Esay
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex p-0 align-items-center mb-3">
                      <div className="mr-3">
                        <img src={MessageAdd2} alt="icon" />
                      </div>
                      <div>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.2px",
                            color: "#A02424",
                          }}
                        >
                          Total Nilai
                        </p>
                        <p
                          className="m-0"
                          style={{
                            fontFamily: "Mulish",
                            fontStyle: "normal",
                            fontSize: "13px",
                            lineHeight: "20px",
                            letterSpacing: "0.2px",
                            color: "#545454",
                          }}
                        >
                          100
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card"
              style={{
                padding: "10px 20px 10px 20px",
                border: "1px solid #CFCFCF",
                boxShadow: "none",
                borderRadius: 10,
              }}
            >
              <div className="row">
                <div className="col-md-7">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="col-md-8 p-0">
                        <div className="col-md-12 d-flex p-0 align-items-center mb-3">
                          <div className="mr-3">
                            <img src={TimeStart} alt="icon" />
                          </div>
                          <div>
                            <p
                              className="m-0"
                              style={{
                                fontFamily: "Mulish",
                                fontStyle: "normal",
                                fontWeight: 700,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0.2px",
                                color: "#018CDB",
                              }}
                            >
                              Mulai
                            </p>
                            <p
                              className="m-0"
                              style={{
                                fontFamily: "Mulish",
                                fontStyle: "normal",
                                fontSize: "13px",
                                lineHeight: "20px",
                                letterSpacing: "0.2px",
                                color: "#545454",
                              }}
                            >
                              Rabu, 03/04/2022 09:00
                            </p>
                          </div>
                        </div>
                        <div className="col-md-12 d-flex p-0 align-items-center">
                          <div className="mr-3">
                            <img src={Clock} alt="icon" />
                          </div>
                          <div>
                            <p
                              className="m-0"
                              style={{
                                fontFamily: "Mulish",
                                fontStyle: "normal",
                                fontWeight: 700,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0.2px",
                                color: "#A9019C",
                              }}
                            >
                              Selesai
                            </p>
                            <p
                              className="m-0"
                              style={{
                                fontFamily: "Mulish",
                                fontStyle: "normal",
                                fontSize: "13px",
                                lineHeight: "20px",
                                letterSpacing: "0.2px",
                                color: "#545454",
                              }}
                            >
                              Kamis, 04/04/2022 12:00
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">Col Md 4 Aja</div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3 p-0">
                        <div className="input-group">
                          <span
                            className="input-group-addon"
                            style={{
                              background: "#CFCFCF",
                              color: "#7B7B7B",
                              borderRadius: "8px 0px 0px 8px",
                            }}
                          >
                            <img src={Global} alt="icon" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            style={{
                              borderRadius: "0px 8px 8px 0px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="row">
                      <div className="col-md-12 d-flex align-items-center mb-2">
                        <div className="mr-3">Icon</div>
                        <div>
                          <p
                            className="m-0"
                            style={{
                              fontFamily: "Mulish",
                              fontStyle: "normal",
                              fontWeight: 700,
                              fontSize: "14px",
                              lineHeight: "20px",
                              letterSpacing: "0.2px",
                              color: "#3E9F6D",
                            }}
                          >
                            Kelas Peserta
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {listKelas.map((d, i) => (
                        <div key={i} className="col-md-6 mb-2 d-flex">
                          <div
                            style={{
                              background: "rgba(125, 201, 255, 0.16)",
                              borderRadius: "5px 0px 0px 5px",
                              height: "30px",
                              border: "1px solid #AADEFC",
                              cursor: "pointer",
                            }}
                            onClick={() => this.handleCloseKelas(i)}
                          >
                            <p
                              style={{
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 300,
                                fontSize: "10px",
                                color: "#007CC2",
                                padding: "7px 6px 7px 6px",
                              }}
                            >
                              &#x2715;
                            </p>
                          </div>
                          <div
                            style={{
                              background: "rgba(125, 201, 255, 0.16)",
                              borderRadius: "0px 5px 5px 0px",
                              height: "30px",
                              border: "1px solid #AADEFC",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 300,
                                fontSize: "12px",
                                letterSpacing: "0.2px",
                                color: "#007CC2",
                                padding: 5,
                              }}
                            >
                              {d}
                            </p>
                          </div>
                        </div>
                      ))}
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

export default Summary;
