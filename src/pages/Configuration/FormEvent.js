import React, { Component } from "react";
import { toast } from 'react-toastify'
import axios from "../../axios";
import qs from "qs";
import Select from "react-select";
import Switch from "react-switch";

class FormEvent extends Component {
  constructor() {
    super();
    this.state = {
      dataKategori: [],
      isLoadingDataKategori: false,
      dataGuru: [],
      isLoadingDataGuru: false,
      dataMapel: [],
      isLoadingDataMapel: false,
    };
  }

  componentDidMount() {
    this.loadDataKategori();
    this.loadDataGuru();
    this.loadDataMapel();
  }

  loadDataKategori() {
    this.setState({ isLoadingDataKategori: true });

    const params = qs.stringify({
      locale: "id",
      platform: "web",
    });

    axios({
      method: "post",
      url: "/exam/category-mapel-kelas?" + params,
    })
      .then((response) => {
        const result = response.data;
        if (result.status) {
          const dataKategori = result.data.category.map((item) => ({
            value: item.exam_cat_id,
            label: item.exam_cat_name,
          }));

          this.setState({
            dataKategori,
            isLoadingDataKategori: false,
          });
        } else {
          if (Array.isArray(result.text)) {
            result.text.map((item) => {
              toast(item)
              return true;
            });
          } else {
            toast(result.text)
          }

          this.setState({ isLoadingDataKategori: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoadingDataKategori: false });
        toast("Gagal terhubung ke server!")
      });
  }

  loadDataGuru() {
    this.setState({ isLoadingDataGuru: true });

    const params = qs.stringify({
      level: "guru",
    });

    axios({
      method: "post",
      url: "/user?" + params,
    })
      .then((response) => {
        const result = response.data;
        if (result.success) {
          const dataGuru = result.data.map((item) => ({
            value: item.user_id,
            label: item.user_nama,
          }));

          this.setState({
            dataGuru,
            isLoadingDataGuru: false,
          });
        } else {
          if (Array.isArray(result.message)) {
            result.message.map((item) => {
              toast(item)

              return true;
            });
          } else {
            toast(result.message);
          }

          this.setState({ isLoadingDataGuru: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoadingDataGuru: false });
        toast("Gagal terhubung ke server!");
      });
  }

  loadDataMapel() {
    this.setState({ isLoadingDataMapel: true });

    const params = qs.stringify({
      locale: "id",
      platform: "web",
    });

    axios({
      method: "post",
      url: "/exam/category-mapel-kelas?" + params,
    })
      .then((response) => {
        const result = response.data;
        if (result.status) {
          const dataMapel = result.data.mapel.map((item) => ({
            value: item.mapel_id,
            label: item.mapel_nama,
          }));

          this.setState({
            dataMapel,
            isLoadingDataMapel: false,
          });
        } else {
          if (Array.isArray(result.text)) {
            result.text.map((item) => {
              toast(item);

              return true;
            });
          } else {
            toast(result.text);
          }

          this.setState({ isLoadingDataMapel: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoadingDataMapel: false });
        toast("Gagal terhubung ke server!");
      });
  }

  render() {
    const {
      dataKategori,
      isLoadingDataKategori,
      dataGuru,
      isLoadingDataGuru,
      dataMapel,
      isLoadingDataMapel,
    } = this.state;

    return (
      <div className="col-md-12">
        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Kategori</label>
          </div>
          <div className="col-md-10 mb-3">
            <Select
              placeholder="Pilih Kategori"
              options={dataKategori}
              isLoading={isLoadingDataKategori}
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Guru</label>
          </div>
          <div className="col-md-10 mb-3">
            <Select
              placeholder="Pilih Nama Guru"
              options={dataGuru}
              isLoading={isLoadingDataGuru}
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Mata Pelajaran
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <Select
              placeholder="Pilih Mata Pelajaran"
              options={dataMapel}
              isLoading={isLoadingDataMapel}
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Judul</label>
          </div>
          <div className="col-md-10 mb-3">
            <input
              name="judul"
              type="text"
              className="form-control"
              placeholder="isi judul ujian online"
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Keterangan</label>
          </div>
          <div className="col-md-10 mb-3">
            <input
              name="keterangan"
              type="text"
              className="form-control"
              placeholder="isi keterangan ujian online"
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Skema Waktu Ujian
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <Select
              placeholder="Pilih Skema Waktu Ujian"
              // options={this.state.dataKategori}
              // isLoading={this.state.isLoadingDataKategori}
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Waktu Ujian</label>
          </div>
          <div className="col-md-10 mb-3">
            <div className="row">
              <div className="col-md-4">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <label className="form-label font-weight-bold">
                        Mulai
                      </label>
                    </div>
                    <div className="col-md-10">
                      <input
                        name="waktuUjianMulai"
                        type="text"
                        className="form-control"
                        placeholder="waktu mulai ujian"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <label className="form-label font-weight-bold">
                        Selesai
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        name="waktuUjianSelesai"
                        type="text"
                        className="form-control"
                        placeholder="waktu selesai ujian"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <label className="form-label font-weight-bold">
                        Pelaksanaan
                      </label>
                    </div>
                    <div className="col-md-8">
                      <input
                        name="waktuUjianPelaksanaan"
                        type="text"
                        className="form-control"
                        placeholder="waktu pelaksanaan"
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
              Waktu Pengerjaan
            </label>
          </div>
          <div className="col-md-10 mb-3">
            <input
              name="waktuPengerjaan"
              type="text"
              className="form-control"
              placeholder="atur waktu pengerjaan ujian online (dalam menit)"
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Kelas Peserta</label>
          </div>
          <div className="col-md-10 mb-3">
            <input
              name="kelasPeserta"
              type="text"
              className="form-control"
              placeholder="penetapan kelas peserta ujian online"
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">
              Keluar Layar Ujian
            </label>
          </div>
          <div className="col-md-2 mb-3">
            <input
              name="keluarLayarUjian"
              type="text"
              className="form-control"
              placeholder="keluar layar ujian"
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2 mb-3">
            <label className="form-label font-weight-bold">Token Ujian</label>
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
                              Atur penggunaan token untuk memulai ujian online
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
              Share Social Media
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
                              Atur penggunaan sosial media untuk membagikan
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
      </div>
    );
  }
}

export default FormEvent;
