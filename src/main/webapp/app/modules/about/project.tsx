import React from 'react';
import {Translate, translate} from 'react-jhipster';
import SideMenuTemplate from "app/shared/layout/templates/side-menu-template";
import {Col, Container, Row} from 'reactstrap';


export const Project = () => {

  const projectItems = [
    {
      id: "project",
      title: translate("about.project.sideMenu.project.name"),
      content: <div className="text-justify">
        <p>{translate("about.project.sideMenu.project.project-sub1")}</p>
        <p>{translate("about.project.sideMenu.project.project-sub2")}</p>
        <p>{translate("about.project.sideMenu.project.project-sub3")}</p>
        <p>{translate("about.project.sideMenu.project.project-sub4")}</p>
        <p>{translate("about.project.sideMenu.project.project-sub5")}</p>
        <p>{translate("about.project.sideMenu.project.project-sub6")}</p>
        <p>{translate("about.project.sideMenu.project.project-sub7")}</p>
        <ol>
          <li><p>{translate("about.project.sideMenu.project.project-sub8")}</p></li>
          <li><p>{translate("about.project.sideMenu.project.project-sub9")}</p></li>
          <li><p>{translate("about.project.sideMenu.project.project-sub10")}</p></li>
        </ol>
      </div>
    },
    {
      id: "team",
      title: translate("about.project.sideMenu.team"),
      content: <div className="text-justify">
        <p>Το πρόγραμμα Check4Facts έχει το προνόμιο να αποκομίζει οφέλη από τη συνεργασία διεθνούς φήμης επιστημόνων με ευρύ έργο περί fake news, περί λαϊκισμού και πολιτικής, περί Μέσων Μαζικής Επικοινωνίας και δημοσιογραφίας.</p>
        <p>Η κεντρική ομάδα αποτελείται από τους εξής επιστήμονες:</p>
        <ul>
          <li><p>Καθηγητή Νίκο Δεμερτζή, Επιστημονικό Υπεύθυνο, Πρόεδρο του Εθνικού Κέντρου Κοινωνικών Ερευνών, Καθηγητή του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p></li>
          <li><p>Καθηγητή Γιώργο Πλειό, Πρόεδρο του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p></li>
          <li><p>Δρ. Απόστολο Λιναρδή, ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Αχιλλέα Καραδημητρίου, συνεργάτη ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Μανίνα Κακεπάκη, ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Μιχάλη Χατζηκωνσταντίνου, συνεργάτη ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Σοφία Καναούτη, συνεργάτιδα ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Σταμάτη Πουλακιδάκο, Επίκουρο Καθηγητή του Τμήματος Επικοινωνίας και Ψηφιακών Μέσων του Πανεπιστημίου Δυτικής Μακεδονίας.</p></li>
          <li><p>Δρ. Χαράλαμπο Τσέκερη, ερευνητή, Εθνικό Κέντρο Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Χριστίνα Φρέντζου, Ειδική Τεχνική Επιστήμονα του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Νάντια Βασιλειάδου, δημοσιογράφος και συνεργάτιδα ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών.</p></li>
        </ul>
        <p>Και η τεχνική ομάδα αποτελείται από τους εξής:</p>
        <ul>
          <li><p>Δρ. Γιώργο Παπαστεφανάτο, Eρευνητή του Κέντρου Αθηνά, συνεργαζόμενο ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Γιώργο Γιαννόπουλο, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
          <li><p>Κωνσταντίνο Αλέξη, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
          <li><p>Σταύρο Μαρούλη, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
          <li><p>Αστέρη Γιαννούδη, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
        </ul>
      </div>
    },
    {
      id: "funding",
      title: translate("about.project.sideMenu.funding"),
      content: <div className="text-justify">
        <p>Το έργο χρηματοδοτήθηκε από το <a href="http://www.elidek.gr/en/homepage/">Ελληνικό Ίδρυμα Έρευνας και Καινοτομίας</a> (grant agreement HFRI-FM17-2283) για την περίοδο 2019-2022, για τον έλεγο της αξιοπιστίας πολιτικών δηλώσεων γύρω από την εγκληματικότητα και το μεταναστευτικό/προσφυγικό ζήτημα. Με την προσθήκη του ελέγχου της αξιοπιστίας ειδήσεων γύρω από την κλιματική αλλαγή και την υγεία/πανδημία, από το 2022 και μετά, αυτοχρηματοδοτείται και εκτελείται μέσω της συνεργασίας οκτώ ερευνητικών και πανεπιστημιακών φορέων.</p>
      </div>
    },
    {
      id: "collaborating",
      title: translate("about.project.sideMenu.collaborating"),
      content: <div className="text-justify">
        <div><img src="../../content/images/ekke-logo.png" alt="ekke logo" width="80" height="80"/>
          <div className="mt-3"><a href="https://www.ekke.gr">Εθνικό Κέντρο Κοινωνικών Ερευνών</a></div>
        </div>
        <div className="mt-4"><img src="../../content/images/media-uoa-logo.jpg" alt="uoa media logo" width="150" height="80"/>
          <div className="mt-3"><a href="https://www.media.uoa.gr/">Τμήμα Επικοινωνίας και Μέσων Μαζικής Ενημέρωσης - ΕΚΠΑ</a></div>
        </div>
        <div className="mt-4"><img src="../../content/images/athena-logo.png" alt="athena logo" width="80" height="80"/>
          <div className="mt-3"><a href="https://www.athenarc.gr/">Ερευνητικό Κέντρο Αθηνά</a></div>
        </div>
        <div className="mt-4"><img src="../../content/images/iccs-logo.jpg" alt="iccs logo" width="80" height="80"/>
          <div className="mt-3"><a href="https://www.iccs.gr/">Ερευνητικό Πανεπιστημιακό Ινστιτούτο
            Συστημάτων Επικοινωνιών & Υπολογιστών</a></div>
        </div>
        <div className="mt-4"><img src="../../content/images/hcmr-logo.jpg" alt="hcmr logo" width="80" height="80"/>
          <div className="mt-3"><a href="https://www.hcmr.gr/">Ελληνικό Κέντρο Θαλασσίων Ερευνών</a></div>
        </div>
      </div>
    },
    // {
    //   id: "experts",
    //   title: translate("about.project.sideMenu.experts"),
    //   content: <div className="text-justify">
    //     <p> </p>
    //   </div>
    // }
  ];

  return (
    <Container>
      <Row>
        <Col sm="12">
          <div className="text-center">
            <h1 className="text-center mt-5">
              <Translate contentKey="about.project.title"/>
            </h1>
            <p className="text-secondary fs-15 mb-5 pb-3"></p>
          </div>
        </Col>
      </Row>
      <SideMenuTemplate items={projectItems} />
    </Container>
  );
}

export default Project;
