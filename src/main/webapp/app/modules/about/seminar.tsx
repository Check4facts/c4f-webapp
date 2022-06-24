import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

const Seminar = () => {
  return (
    <>
      <div>
        <div className="imerida-img" style={{ maxWidth: 1000 }}>
          <img style={{ height: '100%', width: '100%' }} src="../../content/images/imerida.jpeg" />
        </div>
        {/* <div className="imerida-notes" style={{marginTop: 30, textAlign: "center"}}>
            <span>
            <b>1 η Διεθνής Επιστημονική Ημερίδα fact-checking στην Ελλάδα<br/>
            Αντιμετωπίζοντας την παραπληροφόρηση: Η συμβολή πανεπιστημίων και<br/>
            ερευνητικών κέντρων
            </b></span>
            <br/>
            <br/>
            <span>
            <b>1st International Scientific one-day conference on fact-checking in Greece 
                Tackling Misinformation: The Contribution of Universities and Research Centers
            </b>
            </span>
            <br/>
            <br/>
            <span>
            <b>Αθήνα, 4 Ιουλίου 2022, Αμφιθέατρο «Ιωάννης Δρακόπουλος», Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών<br/>
            Athens, 4 July, Amphitheater “Ioannis Drakopoulos”, National and Kapodistrian University of Athens
            </b>
            </span>
            <br/>
            <br/>
            <span>
            <b>Live streaming link (μόνο για παρακολούθηση/only for attendance):<br/>
             <a style={{color: "black"}} href="https://diavlos.grnet.gr/event/e4039">https://diavlos.grnet.gr/event/e4039</a><br/>
             <a style={{color: "black"}} href="https://diavlos.grnet.gr/en/event/e4039">https://diavlos.grnet.gr/en/event/e4039</a>
            </b>
            </span>
            <br/>
            <br/>
            <span>
            <b>Διαδικτυακή παρακολούθηση και υποβολή ερωτήσεων μέσω chat στο σύνδεσμο <br/>
              Online attendance and questions through chat on the following link: <br/> 
             <a style={{color: "black"}} href="https://uoa.webex.com/uoa/j.php?MTID=md0894d3cd587191e9110b0c3aae67484">https://uoa.webex.com/uoa/j.php?MTID=md0894d3cd587191e9110b0c3aae67484</a><br/>
            </b>
            </span>
            <br/>
            <br/>
            <a href='../../content/images/check4facts_program_athens.pdf'>Αναλυτικό πρόγραμμα / Detailed program</a>
          </div> */}
        <div style={{ maxWidth: 1000 }}>
          <p style={{ textAlign: 'center' }}>
            <strong>
              1<sup>η</sup> Διεθνής Επιστημονική Ημερίδα{' '}
            </strong>
            <strong>fact</strong>
            <strong>-</strong>
            <strong>checking</strong>
            <strong> </strong>
            <strong>στην Ελλάδα</strong>
          </p>
          <div id="ft1">
            <p style={{ textAlign: 'center' }}>
              <strong>Αντιμετωπίζοντας την παραπληροφόρηση: Η συμβολή πανεπιστημίων και ερευνητικών κέντρων</strong>
              <strong>
                <NavHashLink style={{ color: 'black' }} to={`#ftn1`} smooth replace={true}>
                  {'[1]'}
                </NavHashLink>
              </strong>
            </p>
          </div>
          <p style={{ textAlign: 'center' }}>
            <strong></strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>1st International Scientific one-day conference on fact-checking in Greece</strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>Tackling Misinformation: The Contribution of Universities and Research Centers</strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong></strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>
              <em>Αθήνα, 4 Ιουλίου 2022, Αμφιθέατρο «Ιωάννης Δρακόπουλος», Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών</em>
            </strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>
              <em>Athens, 4 July, Amphitheater “Ioannis Drakopoulos”, National and Kapodistrian University of Athens</em>
            </strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong></strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <b>Live streaming link (μόνο για παρακολούθηση / only for attendance)</b>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>
              <u>
                <a href="https://diavlos.grnet.gr/event/e4039">https://diavlos.grnet.gr/event/e4039</a>
                <br />
                <a href="https://diavlos.grnet.gr/en/event/e4039">https://diavlos.grnet.gr/en/event/e4039</a>
              </u>
            </strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>
              <u></u>
            </strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>Διαδικτυακή</strong>
            <strong> παρακολούθηση</strong>
            <strong> και</strong>
            <strong> υποβολή</strong>
            <strong> ερωτήσεων</strong>
            <strong> μέσω</strong>
            <strong> chat στο</strong>
            <strong> σύνδεσμο</strong>
            <strong>/</strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>
              Online attendance and questions through chat on the following link:
              <u>https://uoa.webex.com/uoa/j.php?MTID=md0894d3cd587191e9110b0c3aae67484</u>
            </strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong></strong>
          </p>
          <br />
          <p>
            <strong>10.30-11.00:</strong>
            Προσέλευση (θα προσφέρεται καφές)/Welcome coffee
          </p>
          <p>
            <strong></strong>
          </p>
          <br />
          <p>
            <strong>11.00-11.40:</strong>
            Χαιρετισμοί/ Introduction-Greetings
          </p>
          <br />
          <ol>
            <li>
              <p>
                <strong>Χρίστος Δήμας</strong>, Υφυπουργός Έρευνας και Τεχνολογίας
              </p>
              <p>
                <strong>Christos Dimas</strong>, Deputy Minister for Research and Technology
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Αθανάσιος Κυριαζής</strong>, Γενικός Γραμματέας Έρευνας και Καινοτομίας
              </p>
              <p>
                <strong>Athanassios Kyriazis</strong>, Secretary General of Research and Innovation
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Ξένη Χρυσοχόου, </strong>
                <strong>Πρόεδρος</strong> <strong> </strong> Επιστημονικού Συμβουλίου του Ελληνικού Ιδρύματος Έρευνας και Καινοτομίας
                (ΕΛ.ΙΔ.Ε.Κ.)
              </p>
              <p>
                <strong>Xenia Chryssochoou, </strong>
                <strong>President</strong>
                of the Scientific Council of Hellenic Foundation for Research and Innovation (H.F.R.I.)
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Μελέτιος-Αθανάσιος Δημόπουλος</strong>, Πρύτανης- Εθνικό και Καποδιστριακό πανεπιστήμιο Αθηνών
              </p>
              <p>
                <strong>Meletios-Athanassios Dimopoulos</strong>, Rector, National and Kapodistrian University of Athens.
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Χαράλαμπος Τσέκερης</strong>, Αντιπρόεδρος της Εθνικής Επιτροπής Βιοηθικής και Τεχνοηθικής (ΕΕΒ&amp;Τ)
              </p>
              <p>
                <strong>Charalambos Tsekeris</strong>, Vide-President of the Hellenic National Committee of Bio-ethics and Techno-ethics
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Ιωάννης Εμίρης</strong>, Πρόεδρος και Γενικός Διευθυντής Ερευνητικού Κέντρου «ΑΘΗΝΑ», Καθηγητής Τμήματος
                Πληροφορικής και Τηλεπικοινωνιών, Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών
              </p>
              <p>
                <strong>Ioannis Emiris</strong>, President and General Director of the Athena Research Center, Professor, Department of
                Informatics and Telecommunications, National and Kapodistrian University of Athens.
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Νίκος Δεμερτζής</strong>, Διευθυντής και Πρόεδρος του ΔΣ του Εθνικού Κέντρου Κοινωνικών Ερευνών, Καθηγητής Τμήματος
                Επικοινωνίας και ΜΜΕ, Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών
              </p>
              <p>
                <strong>Nicolas Demertzis</strong>, Director of EKKE and President of the Board of Administrators, Professor, Department of
                Communication and Media Studies, National and Kapodistrian University of Athens.
              </p>
            </li>
          </ol>
          <br />
          <p>
            <strong></strong>
          </p>
          <p>
            <strong>11.45-12.15: Πρώτη κεντρική ομιλία/ </strong>
            <strong>First </strong>
            <strong>keynote </strong>
            <strong>speech</strong>
          </p>
          <p>Michelle Amazeen- Associate Professor, Boston University</p>
          <p>
            <strong>
              <em>“The Promise and Pitfalls of Fact-checking 2.0”</em>
            </strong>
          </p>
          <br />
          <p>
            <strong>12.15-14.00: </strong>
            <strong>Πρώτη συνεδρία “Το έργο </strong>
            <strong>Check4</strong>
            <strong>facts”</strong>
          </p>
          <p>
            <strong> </strong>
            <strong>First session: “The Check4facts project” </strong>
          </p>
          <p>
            Συντονιστής/Session Moderator: Δρ. Μιχάλης Χατζηκωνσταντίνου, μέλος ομάδας check4facts/ Dr. Mihalis Chatzikonstantinou,
            check4facts team member
          </p>
          <p>
            Απόστολος Λιναρδής, Ερευνητής Βαθμίδας Α, Εθνικό Κέντρο Κοινωνικών Ερευνών- Σταμάτης Πουλακιδάκος, Επίκουρος Καθηγητής, Τμήμα
            Επικοινωνίας και Ψηφιακών Μέσων, Πανεπιστήμιο Δυτικής Μακεδονίας,
          </p>
          <p>
            <strong>
              <em>«Στάσεις και αντιλήψεις για την αξιοπιστία της δημόσιας πληροφόρησης στην Ελλάδα»</em>
            </strong>
          </p>
          <p>Apostolos Linardis, Grade A Researcher of the Institute for Social Research of the National Centre for Social Research</p>
          <p>Stamatis Poulakidakos, Assistant Professor, Department of Communication and Digital Media, University of Western Macedonia</p>
          <p>
            <strong>
              <em>“</em>
            </strong>
            <div id="ft2">
              <strong>
                <em>Attitudes and perceptions on the reliability of public information in Greece”</em>
              </strong>
              <strong>
                <NavHashLink style={{ color: 'black' }} to={`#ftn2`} smooth replace={true}>
                  {'[2]'}
                </NavHashLink>
              </strong>
            </div>
            <strong>
              <em></em>
            </strong>
          </p>
          <br />
          <p>Δρ. Αχιλλέας Καραδημητρίου, μέλος ομάδας ελεγκτών έργου check4facts</p>
          <p>Νάντια Βασιλειάδου, μέλος ομάδας ελεγκτών έργου check4facts</p>
          <p>
            <strong>
              <em>«Η εφαρμογή του ελέγχου εγκυρότητας δημόσιας πληροφόρησης στην Ελλάδα- Η οπτική του ελεγκτή»</em>
            </strong>
          </p>
          <p>Dr. Achilles Karadimitriou, fact-checker of the check4facts project</p>
          <p>Nadia Vassiliadou, fact-checker of the check4facts project</p>
          <p>
            <strong>“The implementation of fact-checking of public information in Greece- The fact-checker&apos;s perspective”</strong>
            <strong>
              <em></em>
            </strong>
          </p>
          <br />
          <p>Γιώργος Παπαστεφανάτος, Ερευνητής Β, Ερευνητικό Κέντρο Αθηνά</p>
          <p>
            Γιώργος Γιαννόπουλος, Επιστημονικός Συνεργάτης, Ερευνητικό Κέντρο Αθηνά
            <strong>
              <em>
                «Παρουσίαση της πλατφόρμας Check4facts και των τεχνολογιών μηχανικής μάθησης για υποβοήθηση του ελέγχου αξιοπιστίας
                δηλώσεων»
              </em>
            </strong>
          </p>
          <p>George Papastefanatos, Researcher Grade B, Athena Research Center</p>
          <p>George Giannopoulos, Scientific Associate, Athena Research Center</p>
          <p>
            <strong>
              <em>“</em>
            </strong>
            <strong>
              <em>Introducing the Check4facts platform and machine learning technologies to support public statements verification”</em>
            </strong>
          </p>
          <p>
            <strong></strong>
          </p>
          <br />
          <p>
            <strong>Σχολιασμός</strong>
            <strong>: Βασίλης</strong>
            <strong> Βασιλόπουλος</strong>
            <strong>, Δημοσιογράφος</strong>
            <strong></strong>
          </p>
          <p>
            <strong>Discussant: Vassilis Vassilopoulos, Journalist</strong>
          </p>
          <p>
            <strong></strong>
          </p>
          <br />
          <p>
            <strong>14.00-15.00:</strong>
            Ελαφρύ γεύμα/ Light lunch
          </p>
          <br />
          <p>
            <strong>15.00-15.30:</strong>
            <strong>Δεύτερη κεντρική ομιλία/ </strong>
            <strong>Second </strong>
            <strong>keynote </strong>
            <strong>speech</strong>
          </p>
          <p>
            Baybars Orsek, Director of international programming at the Poynter Institute and Director of the International Fact-Checking
            Network (IFCN)
          </p>
          <p>
            <em>
              “<strong>Fact-checking as a civil service to hold the powerful accountable”</strong>
            </em>
          </p>
          <br />
          <p>
            <strong></strong>
          </p>
          <p>
            <strong></strong>
          </p>
          <p>
            <strong></strong>
          </p>
          <p>
            <strong></strong>
          </p>
          <p>
            <strong>15.30-17.30:</strong>
            <strong>Δεύτερη συνεδρία «Η συμβολή Πανεπιστημίων και ερευνητικών κέντρων στο</strong>
            <strong>fact-</strong>
            <strong>checking στην Ελλάδα»</strong>
          </p>
          <p>
            <strong>Second Session “</strong>
            <strong>The contribution of Universities and Research Centers in fact-checking in Greece”</strong>
            <strong></strong>
          </p>
          <p>
            Συντονίστρια/Session Moderator: Μανίνα Κακεπάκη, Ερευνήτρια Β, Εθνικό Κέντρο Κοινωνικών Ερευνών/ Manina Kakepaki, Grade Β
            Researcher of the National Centre for Social Research
          </p>
          <br />
          <p>Νίκος Παναγιώτου, Αναπληρωτής Καθηγητής, Τμήμα Δημοσιογραφίας και ΜΜΕ, Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης</p>
          <p>Χρήστος Φραγκονικολόπουλος, Καθηγητής, Τμήμα Δημοσιογραφίας και ΜΜΕ, Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης</p>
          <p>
            <strong>
              <em>«Παραπληροφόρηση και ενημέρωση κατά την περίοδο της καραντίνας στην Ελλάδα»</em>
            </strong>
          </p>
          <p>Nickos Panagiotou, Associate Professor, Department of Journalism and Mass Media, Aristotle University of Thessaloniki</p>
          <p>Christos Frangonikolopoulos, Professor, Department of Journalism and Mass Media, Aristotle University of Thessaloniki</p>
          <p>
            <strong>
              <em>“Misinformation and information during the quarantine period in Greece”</em>
            </strong>
          </p>
          <br />
          <p>Αναστάσης Δρόσου, Ερευνητής Βαθμίδα Γ’, Εθνικό Κέντρο Έρευνας και Τεχνολογικής Ανάπτυξης</p>
          <p>Anastassis Drosou, Researcher Grade C, Centre for Research and Technology-Hellas</p>
          <p>
            <strong>
              <em>“Community-driven fact-checking for credible and citizen-centered policy making”</em>
            </strong>
          </p>
          <br />
          <p>
            Γιώργος Κουταλιέρης, Μηχανικός Έρευνας και Καινοτομίας, Ομάδα διαχείρισης έργου SocialTruth, Ερευνητικό Πανεπιστημιακό
            Ινστιτούτο Συστημάτων Επικοινωνιών &amp; Υπολογιστών
          </p>
          <strong>
            «Το οικοσύστημα υπηρεσιών επαλήθευσης πληροφοριών του έργου SocialTruth και τα εργαλεία που αναπτύχθηκαν για την διαρκή
            υποστήριξη του από ειδικούς και fact-checkers»
          </strong>
          <p>
            George Koutalieris, Research and Innovation Engineer, SocialTruth Project Coordination Team, Institute of Communication and
            Computer Systems
          </p>
          <strong>
            <q>
              The ecosystem of information verification services of the SocialTruth project and the tools developed to actively engage
              experts and fact-checkers for its continuous support
            </q>
          </strong>
          <br />
          <br />
          <p>
            Νίκος Δεμερτζής, Διευθυντής και Πρόεδρος του ΔΣ του Εθνικού Κέντρου Κοινωνικών Ερευνών, Καθηγητής Τμήματος Επικοινωνίας και ΜΜΕ,
            Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών
          </p>
          <p>
            Μανώλης Πλειώνης, Πρόεδρος του ΔΣ του Εθνικού Αστεροσκοπείου Αθηνών, Καθηγητής, Τμήμα Φυσικής, Αριστοτέλειο Πανεπιστήμιο
            Θεσσαλονίκης
          </p>
          <p>
            Ιωάννης Εμίρης, Πρόεδρος και Γενικός Διευθυντής Ερευνητικού Κέντρου Αθηνά, Καθηγητής Τμήματος Πληροφορικής και Τηλεπικοινωνιών,
            Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών
          </p>
          <p>
            <strong>
              <em>«Η βιωσιμότητα και εξέλιξη του έργου </em>
            </strong>
            <strong>
              <em>check4</em>
            </strong>
            <strong>
              <em>facts»</em>
            </strong>
          </p>
          <p>
            Nicolas Demertzis, Director of EKKE and President of the Board of Administrators, Professor, Department of Communication and
            Media Studies, National and Kapodistrian University of Athens
          </p>
          <p>
            Manolis Plionis, Director of the National Observatory of Athens and President of the Board of Administrators, Professor,
            Department of Physics, Aristotle University of Thessaloniki
          </p>
          <p>
            Ioannis Emiris, President and General Director of the Athena Research Center, Professor, Department of Informatics and
            Telecommunications, National and Kapodistrian University of Athens
            <strong>
              <em></em>
            </strong>
          </p>
          <p>
            <strong>
              <em>“</em>
            </strong>
            <strong>
              <em>The viability and evolution of the check4facts project”</em>
            </strong>
            <strong>
              <em></em>
            </strong>
          </p>
          <br />
          <p>
            <strong>Σχολιασμός: Βασίλης Βασιλόπουλος, Δημοσιογράφος</strong>
          </p>
          <p>
            <strong>Discussant: </strong>
            <strong>Vassilis </strong>
            <strong>Vassilopoulos, </strong>
            <strong>Journalist</strong>
          </p>
          <br />
          <p>17.30-18.00: Διάλειμμα για καφέ/ Coffee break</p>
          <br />
          <p>
            <strong>18.00-19.00: Στρογγυλό τραπέζι «Δημόσιες πολιτικές για την παραπληροφόρηση»</strong>
          </p>
          <p>
            <strong>Round Table “Public policies against misinformation”</strong>
          </p>
          <p>Συντονιστής/Moderator: Νίκος Δεμερτζής/ Nicolas Demertzis</p>
          <br />
          <p>
            <strong>Nikos Sarris</strong>, Project Coordinator, European Disinformation Observatory
          </p>
          <br />
          <p>
            <strong>Γιώργος Πλειός</strong>, Μέλος Εθνικού Συμβουλίου Ραδιοτηλεόρασης, Καθηγητής, Τμήμα Επικοινωνίας και ΜΜΕ, Εθνικό και
            Ακποδιστριακό ΠανεπΙστήμιο Αθηνών,
          </p>
          <p>
            George Pleios, Member of the National Council for Radio and Television, Professor, Department of Communication and Media
            Studies, National and Kapodistrian University of Athens
          </p>
          <br />
          <p>
            <strong>Παναγιώτης Μαντζούφας</strong>, Καθηγητής Συνταγματικού Δικαίου, Νομική Σχολή, Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης
          </p>
          <p>Panagiotis Mantzoufas, Professor of Constitutional law, Law School, Aristotle University of Thessaloniki</p>
          <div>
            <br />
            <hr style={{ textAlign: 'left', width: '33%' }} />
            <div id="ftn1">
              <p>
                <NavHashLink style={{ color: 'black' }} to={`#ft1`} smooth replace={true}>
                  {'[1]'}
                </NavHashLink>
                Η ημερίδα θα είναι υβριδική και η παρακολούθησή της θα μπορεί να γίνει είτε δια ζώσης είτε διαδικτυακά στο σύνδεσμο που
                αναφέρεται κάτω από τον τίτλο. Θα δοθούν βεβαιώσεις παρακολούθησης σε όσες/όσους επιθυμούν και μας δώσουν τα στοιχεία τους
                (ονοματεπώνυμο, e-mail), είτε στο διαδικτυακό σύνδεσμο, είτε δια ζώσης την ημέρα του συνεδρίου. The one-day conference will
                be hybrid, and anyone will be able to attend it either online or in person. Certificates of attendance will be given to
                those who give us their details (name, e-mail), either online or in-person on the day of the conference.
              </p>
            </div>
            <div id="ftn2">
              <p>
                <NavHashLink style={{ color: 'black' }} to={`#ft2`} smooth replace={true}>
                  {'[2]'}
                </NavHashLink>{' '}
                Οι εισηγήσεις των οποίων οι τίτλοι αναγράφονται και στα Ελληνικά και στα Αγγλικά θα πραγματοποιηθούν στα Ελληνικά. Οι
                εισηγήσεις των οποίων οι τίτλοι αναγράφονται μόνο στα Αγγλικά, θα πραγματοποιηθούν στα Αγγλικά. Κατά τη διάρκεια της
                ημερίδας για υπάρχει και διερμηνεία. Presentations whose titles are written in both Greek and English will be conducted in
                Greek. Presentations whose titles are written only in English, will be conducted in English. During the one-day conference
                there will be interpretation available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seminar;
