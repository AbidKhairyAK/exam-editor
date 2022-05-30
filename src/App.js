import { NavLink, Outlet } from 'react-router-dom';

import FavoriteChart from "./images/favorite-chart.png";
import GalleryFavorite from "./images/gallery-favorite.png";
import MessageAdd1 from "./images/message-add-1.png";
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">

      <div
        id="create-ujian"
        className="card p-0 mx-5 my-4"
        style={{ background: "linear-gradient(270deg, #E73D7A 34.95%, #A9019C 75.08%)", borderRadius: 15, boxShadow: "0px 4px 5px 5px rgba(0, 0, 0, 0.07)", fontFamily: "Mulish", fontStyle: 'normal',}}
      >
        <div
          className="card"
          style={{ borderRadius: 15, marginTop: 30, marginBottom: 0,}}
        >
          <div
            className="card"
            style={{ background: "#E8FCFF", height: 90, borderTopLeftRadius: 15, borderTopRightRadius: 15, margin: 0, marginBottom: 15, boxShadow: "none", border: "none" }}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <div
                    className="col-md-12 d-flex justify-content-center align-items-center"
                    style={{ height: 90 }}
                  >
                    <div
                      className="mr-2"
                      style={{ fontFamily: "Mulish", fontStyle: "normal", fontWeight: 700, fontSize: "50px", lineHeight: "22px", letterSpacing: " 0.2px", color: "#4E4E4E",}}
                    >
                      3
                    </div>
                    <div>
                      <p className="title-tab-header">Langkah Praktis</p>
                      <p className="sub-title-tab-header">Buat Event Ujian Online</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 pl-1 pr-1">
                  <NavLink
                    className={({ isActive }) => isActive ? `wrap-tab-header active arrow-bottom` : `wrap-tab-header`}
                    to="/configuration"
                  >
                    <div
                      className="col-md-12 d-flex justify-content-center align-items-center"
                      style={{ height: 90 }}
                    >
                      <div className="mr-2">
                        <img src={FavoriteChart} alt="icon" />
                      </div>
                      <div>
                        <p className="title-tab-header-content">Pengaturan</p>
                        <p className="sub-title-tab-header-content">Ujian Online</p>
                      </div>
                    </div>
                  </NavLink>
                </div>
                <div className="col-md-3 pl-1 pr-1">
                  <NavLink
                    className={({ isActive }) => isActive ? `wrap-tab-header active arrow-bottom` : `wrap-tab-header`}
                    to="/editor"
                  >
                    <div
                      className="col-md-12 d-flex justify-content-center align-items-center"
                      style={{ height: 90 }}
                    >
                      <div className="mr-2">
                        <img src={MessageAdd1} alt="icon" />
                      </div>
                      <div>
                        <p className="title-tab-header-content">Soal Ujian</p>
                        <p className="sub-title-tab-header-content">
                          Buat soal dan jawaban
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </div>
                <div className="col-md-3 pl-1 pr-1">
                  <NavLink
                    className={({ isActive }) => isActive ? `wrap-tab-header last active arrow-bottom` : `wrap-tab-header last`}
                    to="/summary"
                  >
                    <div
                      className="col-md-12 d-flex justify-content-center align-items-center"
                      style={{ height: 90 }}
                    >
                      <div className="mr-2">
                        <img src={GalleryFavorite} alt="icon" />
                      </div>
                      <div>
                        <p className="title-tab-header-content">Pratinjau</p>
                        <p className="sub-title-tab-header-content">Ujian Online</p>
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>

            </div>
          </div>

          <Outlet />

          <div className="container mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted">Auto Saved 09/2/22 07:34:23</p>
              </div>

              <div>
                <button className="btn btn-danger">
                  <i className="fa fa-chevron-right"></i> Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />

    </div>
  );
}

export default App;
