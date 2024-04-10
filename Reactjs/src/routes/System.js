import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/SpecialtyRedux";
import ManageHandbook from "../containers/System/Handbook/ManageHandbook";
import ClinicRedux from "../containers/System/Clinic/ClinicRedux";
import Dashboard from "../containers/System/Admin/Dashboard";
import MedicalPackageRedux from "../containers/System/MedicalPackage/MedicalPackageRedux";
import MedicalPackage from "../containers/System/MedicalPackage/MedicalPackage";
class System extends Component {
  render() {
    // {this.props.isLoggedIn && <Header />}
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route path="/system/manage-clinic" component={ClinicRedux} />
              <Route
                path="/system/manage-handbook"
                component={ManageHandbook}
              />
              <Route
                path="/system/manage-medical-package"
                component={MedicalPackage}
              />
              <Route path="/system/dashboard" component={Dashboard} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
