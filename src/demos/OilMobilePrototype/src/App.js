import React, { Component } from 'react';
import ReactDOM from "react-dom";
import bg from './idealoHome.png';
import './App.css';

class Oil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSecondary: false
    }
  }

  showSecondary() {
    this.setState({
      showSecondary: true
    });
  }

  hideSecondary() {
    this.setState({
      showSecondary: false
    });
  }

  toggleSecondary() {
    this.setState({
      showSecondary: !this.state.showSecondary
    });
  }

  render() {
    const OilSecondary = (
      <div className="OilSecondary">
        <div className="OilSecondaryClose" onClick={() => this.toggleSecondary()}>
          <svg width="22" height="22" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle fill="#757575" cx="14" cy="14" r="14"/>
              <path d="M19.845 18.094a.425.425 0 0 1 .124.312c0 .125-.042.23-.124.313l-1.182 1.156a.386.386 0 0 1-.28.125.42.42 0 0 1-.31-.125L14 15.781l-4.073 4.094a.386.386 0 0 1-.28.125.42.42 0 0 1-.31-.125l-1.182-1.156a.425.425 0 0 1-.124-.313c0-.125.042-.229.124-.312L12.26 14 8.155 9.937c-.207-.208-.207-.416 0-.624l1.15-1.188c.125-.083.23-.125.313-.125a.42.42 0 0 1 .31.125L14 12.188l4.073-4.063c.124-.083.228-.125.31-.125a.42.42 0 0 1 .311.125l1.15 1.188c.208.208.208.406 0 .593l-4.103 4.063 4.104 4.125z" fill="#FFF" opacity=".883"/>
            </g>
          </svg>
        </div>
        <h1 className="OilHeading">
          Konzerngesellschaften
        </h1>
        <p className="OilText">
          Hier steht eine Liste von Konzerngesellschaften im Text. Das ist übrigens Blindtext. 
        </p>
        <p className="OilText">
          @Leisure BR BV<br />
          AWIN AG<br />
          Axel Springer Auto Verlag GmbH<br />
          Axel Springer Mediahouse Berlin GmbH<br />
          Axel Springer SE<br />
          B.Z. Ullstein GmbH<br />
          BILD GmbH & Co. KG<br />
          Bonial International GmbH<br />
          CASAMUNDO GmbH<br />
          COMPUTER BILD Digital GmbH<br />
          Contact Impact GmbH<br />
          DanCenter A/S <br />
          finanzen.net GmbH<br />
          idealo internet GmbH<br />
          Immonet GmbH<br />
          Immosolve GmbH<br />
          Immowelt AG<br />
          infoRoad GmbH<br />
          meinestadt GmbH<br />
          MeinProspekt GmbH<br />
          StepStone Deutschland GmbH / Stepstone Group<br />
          Transfermarkt GmbH & Co. KG<br />
          Traum-Ferienwohnungen GmbH<br />
          Umzugsauktion GmbH & Co. KG<br />
          upday GmbH & Co. KG<br />
          Vertical Media GmbH<br />
          Visoon Video Impact GmbH & Co. KG<br />
          Visual Meta GmbH<br />
          WeltN24 GmbH<br />
          YOURCAREERGROUP GmbH
        </p>
      </div>
    );
    
    const OilEl = (
      <div className="Oil">
        {this.state.showSecondary ? OilSecondary : null}
        
        <div className="OilContent">
          <h1 className="OilHeading">
            Bitte stimmen Sie zu
          </h1>
          <p className="OilText">
            Die Website verwendet Cookies, Web Beacons, JavaScript und ähnliche Technologien. Bitte stimmen Sie zu, dass die <a className="OilTextLink" onClick={() => this.toggleSecondary()}>Konzerngesellschaften der Axel Springer SE</a> und ausgewählte andere Unternehmen für die bedarfsgerechte Gestaltung, für Marktforschung oder für Werbung Nutzungsprofile bei Verwendung von Pseudonymen erstellen und diese an Dritte weitergegeben. Diese Nutzungsprofile dürfen nicht mit Daten über den Träger des Pseudonyms zusammengeführt werden. Detaillierte Informationen und Hinweise zu Ihrem Widerspruchsrecht finden Sie in der Datenschutzerklärung.
          </p>
        </div>
        <div className="OilFooter">
          <a className="OilButton">
            OK
          </a>
        </div>
      </div>
    );

    return ReactDOM.createPortal(
      OilEl,
      document.body
    );
  }
};

class App extends Component {
  componentDidMount() {
    const styles = "overflow: hidden; position: relative; height: 100%;";

    document.documentElement.setAttribute("style", styles);
    document.body.setAttribute("style", styles);
    // const marginTop = (document.documentElement.clientHeight - 200).toString()
    // document.getElementsByClassName("OilContent")[0].style.marginTop = marginTop + "px";

  }

  render() {
    return (
      <div className="App">
        <Oil />
        <div className="content">
          <img className="OilBg" src={bg} alt="" />
        </div>
      </div>
    );
  }
}

export default App;
