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
          <li><p>Δρ. Γιώργο Παπαστεφανάτο, Eρευνητή του Ερευνητικού Κέντρου Αθηνά, συνεργαζόμενο ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Γιώργο Γιαννόπουλο, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
          <li><p>Κωνσταντίνο Αλέξη, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
          <li><p>Σταύρο Μαρούλη, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
          <li><p>Κωνσταντίνο Κοζάνη, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
          <li><p>Αστέρη Γιαννούδη, ερευνητικό συνεργάτη του Ερευνητικού Κέντρου Αθηνά</p></li>
        </ul>
      </div>
    },
    {
      id: "funding",
      title: translate("about.project.sideMenu.funding"),
      content: <div className="text-justify">
        <p>Το έργο χρηματοδοτήθηκε από το <a href="http://www.elidek.gr/en/homepage/">Ελληνικό Ίδρυμα Έρευνας και Καινοτομίας</a> (grant agreement HFRI-FM17-2283) για την περίοδο 2019-2022, για τον έλεγο της αξιοπιστίας πολιτικών δηλώσεων γύρω από την εγκληματικότητα και το μεταναστευτικό/προσφυγικό ζήτημα. Με την προσθήκη του ελέγχου της αξιοπιστίας ειδήσεων γύρω από την κλιματική αλλαγή και την υγεία/πανδημία, από το 2022 και μετά, το έργο αυτοχρηματοδοτείται και εκτελείται μέσω της συνεργασίας οκτώ ερευνητικών και πανεπιστημιακών φορέων.</p>
      </div>
    },
    {
      id: "Cooperation Framework",
      title: "Πλαίσιο Συνεργασίας",
      content: <div className="text-justify">
        <p>Το έργο Check4Facts/Science υλοποιείται συνεργατικά μέσω της από 15 Φεβρουαρίου 2022 Σύμβασης συνεργασίας, μεταξύ ερευνητικών οργανισμών, η οποία έχει υπογραφεί από τους εξής φορείς:</p>
        <ul>
          <li><p>ΕΚΚΕ, Εθνικό Κέντρο Κοινωνικών Ερευνών, νομίμως εκπροσωπούμενο από την Καθηγήτρια Βασιλική Γεωργιάδου</p></li>
          <li><p>Ερευνητικό Κέντρο «Αθηνά», νομίμως εκπροσωπούμενο από τον Καθηγητή Γιάννη Εμίρη</p></li>
          <li><p>ΕΚΕΤΑ, Εθνικό Κέντρο Έρευνας και Τεχνολογικής Ανάπτυξης, νομίμως εκπροσωπούμενο από τον Διευθυντή Ερευνών Δρ. Δημήτριο Τζοβάρα</p></li>
          <li><p>ΕΛΚΕΘΕ, Ελληνικό Κέντρο Θαλάσσιων Ερευνών, νομίμως εκπροσωπούμενο από τον καθηγητή Αντώνη Μαγουλά</p></li>
          <li><p>Εθνικό Αστεροσκοπείο Αθηνών, νομίμως εκπροσωπούμενο από τον καθηγητή Μανώλη Πλειώνη</p></li>
          <li><p>ΙΙΒΕΑΑ, Ίδρυμα Ιατροβιολογικών Ερευνών της Ακαδημίας Αθηνών, νομίμως εκπροσωπούμενο από τον καθηγητή Δημήτρη Θάνο</p></li>
          <li><p>ΕΠΙΣΕΥ, Ερευνητικό Πανεπιστημιακό Ινστιτούτο Συστημάτων Επικοινωνιών και Υπολογιστών, νομίμως εκπροσωπούμενο από τον καθηγητή Ιωάννη Ψαρρά</p></li>
          <li><p>Το Εργαστήριο Κοινωνικής Έρευνας στα ΜΜΕ, του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών, νομίμως εκπροσωπούμενο από τον καθηγητή Γιώργο Πλειό</p></li>
          <li><p>Το Εργαστήριο Κοινωνικών και Μεταναστευτικών Σπουδών της Σχολής Κοινωνικών και Ανθρωπιστικών Επιστημών, του Πανεπιστημίου Δυτικής Μακεδονίας, νομίμως εκπροσωπούμενο από την Καθηγήτρια κα Δόμνα Μιχαήλ</p></li>
        </ul>
        <p>Η διαχείριση του έργου γίνεται από Επιτροπή, αποτελούμενη από εκπροσώπους όλων των συμμετεχόντων φορέων, με Συντονιστή Εταίρο το ΕΚΚΕ, και Επιστημονικό Υπεύθυνο τον Καθηγητή του Πανεπιστημίου Αθηνών κ. Νίκο Δεμερτζή.</p>
        <p>Στο πλαίσιο της υλοποίησης του έργου και για τη διασταύρωση έγκυρων πληροφοριών γύρω από την πανδημία και την κλιματική αλλαγή, η ομάδα έργου συνεργάζεται με τους εξής συμβούλους παροχής πληροφοριών και δεδομένων:</p>
        <ul>
          <li><p>Tον κ. Νίκο Μιχαλόπουλο από το Εθνικό Αστεροσκοπείο Αθηνών (ΕΑΑ)</p></li>
          <li><p>Tον κ. Δημήτρη Βελαώρα από το Ελληνικό Κέντρο Θαλάσσιων Ερευνών (ΕΛΚΕΘΕ)</p></li>
          <li><p>Tον κ. Χρήστο Ζέρβα από το  Ίδρυμα Ιατροβιολογικών Ερευνών της Ακαδημίας Αθηνών (ΙΙΒΕΑΑ)</p></li>
          <li><p>Tον κ. Γιώργο Κουταλιέρη από το Ερευνητικό Πανεπιστημιακό Ινστιτούτο Συστημάτων, Επικοινωνιών και Υπολογιστών (ΕΠΙΣΕΥ)</p></li>
          <li><p>Tον κ. Μαρία Τσούρμα, από το Εθνικό Κέντρο Έρευνας και Τεχνολογικής Ανάπτυξης (ΕΚΕΤΑ)</p></li>
        </ul>
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
        <div className="mt-4"><img src="../../content/images/logo-noa.jpg" alt="noa logo" width="80" height="80"/>
          <div className="mt-3"><a href="https://www.astro.noa.gr/">Εθνικό Αστεροσκοπείο Αθηνών</a></div>
        </div>
        <div className="mt-4"><img src="../../content/images/iibea-large-logo.jpg" alt="iibea logo" width="123" height="86"/>
          <div className="mt-3"><a href="http://www.bioacademy.gr/">Ίδρυμα Ιατροβιολογικών Ερευνών Ακαδημίας Αθηνών</a></div>
        </div>
        <div className="mt-4"><img src="../../content/images/eketa-logo.png" alt="eketa logo" height="60"/>
          <div className="mt-3"><a href="https://www.certh.gr/">Εθνικό Κέντρο Έρευνας και Τεχνολογικής Ανάπτυξης</a></div>
        </div>
        <div className="mt-4">
          <img src="../../content/images/smslab-logo.webp" alt="smslab logo" width="123" height="86"/>
          <div className="mt-3"><a href="https://smslab.edu.uowm.gr/">Εργαστήριο Κοινωνικών και Μεταναστευτικών Σπουδών της Σχολής Κοινωνικών και Ανθρωπιστικών Επιστημών, του Πανεπιστημίου Δυτικής Μακεδονίας</a></div>
        </div>
      </div>
    }
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
