import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropAtelier from "../propAtelier/propAtelier"
import AjoutAtelier from './../newAtelier/NewAtelier'

class Dashboard extends Component {


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    console.log('localStorage.local sur dashbord' + localStorage.id);

    const { user } = this.props.auth;

    return (
      <div>
        <div style={{ height: "75vh" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <h4>

                  <p className="flow-text grey-text text-darken-1">
                    {" "}
                    <span style={{ fontFamily: "" }}> Bonjour </span> Chef 👏 {user.nom.split(" ")[0]}

                  </p>
                </h4>
                <button  className="btn btn-secondary"
                  onClick={()=>{
                    document.getElementById('ajoutatelier').style.display = "block";
                    document.getElementById('tableau').style.display = "none";
                  }
                  
                  }
                  >Ajout atelier</button>
                  <button 
                  onClick={()=>{
                    document.getElementById('ajoutatelier').style.display = "none";
                    document.getElementById('tableau').style.display = "block";
                  }
                  
                  }
                  className="btn btn-secondary" id="bottou">Listes des ateliers</button>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Deconnecter
            </button>
              </div>
              <div className="col-md-10">
                <PropAtelier />
                <AjoutAtelier/>
              </div>
              
            </div>
          </div>


        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
