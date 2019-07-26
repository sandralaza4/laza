import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ListTout extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };

    }
    componentDidMount() {
        axios.get('https://blacken.herokuapp.com/api/users/newArticle')
            .then(response => {
                console.log('i am a response', response)
                this.setState({ produit: response.data });
                console.log('i am a produit', this.state.produit)
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return <div>
            <div className="container-fluid">
            <div className="row view-group" id="colonne">
                {
                    (this.state.produit.length > 0) ? (this.state.produit.filter((params)=>params.visib).map((obj) => {
                        

                        return  <div class="item col-xs-4 col-lg-4" id="carte">

                        <div className="card card-cascade narrower card-ecommerce">
                                <img   width="auto" id="imageproduit" height="230px"    src={'https://blacken.herokuapp.com/api/users/newArticleImage/' + obj.image} alt={obj.image} />
                                
                            <div className="card-body card-body-cascade">

                                <center><h6 id="description"><span id="nomproduit">{obj.titre}</span></h6></center>
                                        <div className="row">
                                            <div className="col-md-6">
                                            
                                                <p className="card-text"><strong><span id="description">Description</span></strong>&nbsp;&nbsp; <div id="point">{obj.description}</div> </p>
                                                <p className="card-text"><strong><span id="description">Date</span></strong>&nbsp;&nbsp; <div id="point">{obj.date}</div> </p>
                                                <p className="card-text"><strong><span id="description">Nombre de place disponible</span></strong>&nbsp;&nbsp; <div id="point">{obj.duree}</div> </p>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="card-text"><strong><span id="description">Horaire de debut</span></strong>&nbsp;&nbsp; <div id="point">{obj.debut}</div> </p>
                                                <p className="card-text"  id="colonne2"><strong><span id="description">Durée de l'atelier</span></strong>&nbsp;&nbsp; <div id="point">{obj.duree}</div> </p>
                                                <p className="card-text"><strong><span id="description">Nombre de place reserve</span></strong>&nbsp;&nbsp; <div id="point">{obj.placeRes}</div> </p>
                                            </div>
                                        </div>
                                <span className="spanprix">
                                    <strong>Prix: {obj.prix} €</strong>
                                </span><br />
                                <button class="btn btn-success" onClick={() => {
                                        confirmAlert({
                                            customUI: ({ onClose }) => {
                                                return (
                                                   
                                                        <div className='custom-ui' id="popups">
                                                            <div >
                                                                <h4>Inscription pour l 'Atelier {obj.Titre}</h4>
                                                                <input name="nom" onChange={this.handleChange}
                                                                    value={this.state.value} placeholder="Nom" /><br></br>
                                                                <input name="prenom" placeholder="Prenom" onChange={this.handleChange} value={this.state.value} /><br></br>
                                                                <input name="phone" placeholder="Numero téléphone" onChange={this.handleChange} value={this.state.value} /><br></br>
                                                                <input name="email" placeholder="Email" onChange={this.handleChange} value={this.state.value} /><br></br>

                                                                <button className="btn btn-succes" onClick={() => {
                                                                    axios.post("https://blacken.herokuapp.com/api/users/particulier/" + obj._id, {
                                                                        nom: this.state.nom,
                                                                        prenom: this.state.prenom,
                                                                        phone: this.state.phone,
                                                                        email: this.state.email

                                                                    }).then(res => {
                                                                        console.log(res.data);
                                                                        axios.get("https://blacken.herokuapp.com/api/users/newArticle").then(res => {

                                                                            this.setState({ profil: res.data })
                                                                            console.log(this.state.profil)

                                                                        })
                                                                    })

                                                                    onClose();
                                                                }}
                                                                >
                                                                    confirmer
                                                                </button>
                                                                <button  className="btn btn-danger" onClick={onClose}>No</button>
                                                            </div>

                                                        </div>
                                                );
                                            }
                                        });
                                    }} >S'inscrire</button>

                                </div>
                            </div>

</div> })) : ('')
                }
</div>
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}
            </div>
        );
    }
}