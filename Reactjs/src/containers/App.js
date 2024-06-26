import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor.js";
import VerifyEmail from "./Patient/VerifyEmail";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import handbookHome from "./Patient/Handbook/handbookHome";
import specialtyHome from "./Patient/Specialty/specialtyHome";
import clinicHome from "./Patient/Clinic/clinicHome";
import doctorHome from "./Patient/Doctor/doctorHome";
import medicalPackageHome from "./Patient/MedicalPackage/MedicalPackageHome";
import DetailMedicalPackage from "./Patient/MedicalPackage/DetailMedicalPackage";
import historyBooking from "./Patient/HistoryBooking/historyBooking";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/doctor/"}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DEATAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.DEATAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DEATAIL_CLINIC} component={DetailClinic} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                  <Route path={"/handbook/"} component={handbookHome} />
                  <Route path={"/specialty/"} component={specialtyHome} />
                  <Route path={"/clinic/"} component={clinicHome} />
                  <Route path={"/doctors/"} component={doctorHome} />
                  <Route
                    path={"/medical-package/"}
                    component={medicalPackageHome}
                  />
                  <Route
                    path={"/history-booking/"}
                    component={historyBooking}
                  />
                  <Route
                    path={path.DEATAIL_MEDICAL_PACKAGE}
                    component={DetailMedicalPackage}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            {/* <ToastContainer
                  className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                  autoClose={false} hideProgressBar={true} pauseOnHover={false}
                  pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                  closeButton={<CustomToastCloseButton />}
              /> */}

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              // transition: Bounce
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
