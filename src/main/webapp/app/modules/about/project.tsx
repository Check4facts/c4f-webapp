import React from 'react';
import { translate } from 'react-jhipster';
import SideMenuTemplate from "app/shared/layout/templates/side-menu-template";


export const Project = () => {

  const projectItems = [
    {
      id: "project",
      title: translate("about.project.sideMenu.project"),
      content: <div data-class="text-justify">
        <p>Το παρόν έργο ανταποκρίνεται στην ανάγκη να υπάρξει επιστημονική γνώση και διάλογος για τον έλεγχο της αξιοπιστίας του δημόσιου λόγου στην Ελλάδα. Πιο συγκεκριμένα, η ιστοσελίδα check4facts εστιάζει σε δύο ιδιαίτερα σημαντικές θεματικές ενότητες του πολιτικού λόγου: το προσφυγικό/μεταναστευτικό ζήτημα, και την εγκληματικότητα. Οι δύο αυτές θεματικές συχνά συνδέονται και χαρακτηρίζονται από αξιοσημείωτη και διαρκή παρουσία στη δημόσια σφαίρα.</p>
        <p>Η αποξένωση των πολιτών από το πολιτικό σύστημα, η δυσπιστία απέναντι στους ειδικούς, η θεώρηση της πολιτικής ως παιχνίδι εξουσίας/στρατηγικής, που επωφελείται από την περιορισμένη γνώση των πολιτών σε σχέση με την πολιτική σφαίρα και τα δικαιώματά τους, ενισχύουν αυτό που ονομάζεται «οικονομία της προσοχής» (‘attention economy’), η οποία περιλαμβάνει την εφαρμογή μεθόδων “neuro marketing” και προπαγανδιστικών πρακτικών που αποσκοπούν να επηρεάσουν τα συναισθήματα και τις συμπεριφορές των πολιτών.</p>
        <p>Μακριά από πολιτικές, μηντιακές σκοπιμότητες και εντυπωσιοθηρικές- εμπορευματοποιημένες λογικές, η πλατφόρμα check4facts.gr προσφέρει ένα χρήσιμο εργαλείο ουσιαστικής συμμετοχής των πολιτών στο δημόσιο διάλογο. Την κύρια ευθύνη για τη μεθοδολογία εξακρίβωσης της εγκυρότητας των δημόσια εκφερόμενων πληροφοριών έχει η επιστημονική ομάδα της πλατφόρμας, της οποίας πυρήνας είναι επιστήμονες με μακροχρόνια πείρα στην καταγραφή και ανάλυση του δημόσια εκφερόμενου λόγου, προερχόμενοι από το Εθνικό Κέντρο Κοινωνικών Ερευνών, το Ερευνητικό Κέντρο «Αθηνά» και το Τμήμα Επικοινωνίας και ΜΜΕ του Εθνικού και Καποδιστριακού Πανεπιστημίου Αθηνών.</p>
        <p>Πρωταρχικός στόχος της ιστοσελίδας check4facts.gr είναι να ελέγχει την πληροφορία και να τη δημοσιεύει με τα απαραίτητα υποστηρικτικά στοιχεία, είτε πρόκειται εν τέλει για λανθασμένη πληροφορία, που απέχει, δηλαδή, λιγότερο ή περισσότερο από την πραγματικότητα, είτε πρόκειται για αληθή πληροφορία, οπότε ο οργανισμός, βάσει των πηγών του επιβεβαιώνει την εγκυρότητά της.</p>
        <p>Η συλλογή των προς έλεγχο δηλώσεων/πληροφοριών πραγματοποιείται μέσω της συνεχούς παρακολούθησης του περιεχομένου των μέσων ενημέρωσης (έντυπων και ηλεκτρονικών), των ιστοσελίδων πολιτικών και κομμάτων, των λογαριασμών των δημόσιων προσώπων στα μέσα κοινωνικής δικτύωσης και των κοινοβουλευτικών συζητήσεων, είτε ζωντανών, είτε καταγεγραμμένων. Οι προς έλεγχο δηλώσεις υφίστανται αρχικά αλγοριθμική επεξεργασία, η οποία προσφέρει μια πρώτη «εκτίμηση» εγκυρότητας.</p>
        <p>Στη συνέχεια, για την εξακρίβωση των υπό έλεγχο πληροφοριών, οι ελεγκτές δημόσιας πληροφόρησης του check4facts.gr αντλούν πληροφορίες από διαθέσιμα πρωτογενή ή/και δευτερογενή στοιχεία και συνεργάζονται με εξειδικευμένους επιστήμονες, λειτουργούς, εμπειρογνώμονες από δημόσιους και ιδιωτικούς φορείς, προκειμένου ο έλεγχος εγκυρότητας της πληροφορίας να γίνεται δια της προσπέλασης όλων των διαθέσιμων πρωτογενών ή/και δευτερογενών πηγών.</p>
        <p>Εξετάζοντας τον δημόσιο λόγο βουλευτών και κομμάτων, το πρόγραμμα κινείται προς τρεις κατευθύνσεις:</p>
        <ol>
          <li><p>Την ανάπτυξη της ψηφιακής πλατφόρμας check4facts.gr, για να φιλοξενήσει και να υποστηρίξει τις δράσεις του.</p></li>
          <li><p>Την έρευνα του δημόσιου λόγου όπως καταγράφεται στα ΜΜΕ και σε άλλες πηγές, με διαφορετικούς βαθμούς αξιοπιστίας.</p></li>
          <li><p>Την εκπαίδευση του κοινού, μέσω ειδικού, ελεύθερα προσβάσιμου περιεχομένου, ώστε οι πολίτες να μπορούν να αναγνωρίζουν, να ελέγχουν και να επαληθεύουν ή να απορρίπτουν πολιτικές πληροφορίες καλλιεργώντας ψηφιακές δεξιότητες και «πολιτική νοημοσύνη».</p></li>
        </ol>
      </div>
    },
    {
      id: "team",
      title: translate("about.project.sideMenu.team"),
      content: <div>
        <p>Το πρόγραμμα Check4Facts έχει το προνόμιο να αποκομίζει οφέλη από τη συνεργασία διεθνούς φήμης επιστημόνων με ευρύ έργο περί fake news, περί λαϊκισμού και πολιτικής, περί Μέσων Μαζικής Επικοινωνίας και δημοσιογραφίας.</p>
        <p>Η κεντρική ομάδα αποτελείται από τους εξής επιστήμονες:</p>
        <ul>
          <li><p>Καθηγητή Νίκο Δεμερτζή, Επιστημονικό Υπεύθυνο, Πρόεδρο του Εθνικού Κέντρου Κοινωνικών Ερευνών, Καθηγητή του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p></li>
          <li><p>Καθηγητή Γιώργο Πλειό, Πρόεδρο του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p></li>
          <li><p>Δρ. Χαράλαμπο Τσέκερη, ερευνητή, Εθνικό Κέντρο Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Σταμάτη Πουλακιδάκο, ΕΔΙΠ του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p></li>
          <li><p>Δρ. Γιώργο Παπαστεφανάτο,  ερευνητή του Κέντρο Αθηνά, ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Απόστολο Λινάρδη, ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Μανίνα Κακεπάκη, ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Χριστίνα Φρέντζου, ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Σοφία Καναούτη, συνεργάτιδα ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
          <li><p>Δρ. Μιχάλη Χατζηκωνσταντίνου, συνεργάτη ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p></li>
        </ul>
      </div>
    },
    {
      id: "funding",
      title: translate("about.project.sideMenu.funding"),
      content: <div>
        <p>Το έργο συγχρηματοδοτήθηκε από το Ελληνικό Ίδρυμα Έρευνας και Καινοτομίας και τη Γενική Γραμματεία Έρευνας και Καινοτομίας (grant agreement HFRI-FM17-2283).</p>
      </div>
    },
    {
      id: "collaborating",
      title: translate("about.project.sideMenu.collaborating"),
      content: <div>
        <ul>
          <li><p>Εθνικό Κέντρο Κοινωνικών Ερευνών</p></li>
          <li><p>Εργαστήριο Κοινωνικής Έρευνας στα ΜΜΕ- Τμήμα Επικοινωνίας και ΜΜΕ- Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών</p></li>
          <li><p>Ερευνητικό Κέντρο Αθηνά</p></li>
        </ul>
      </div>
    },
    {
      id: "experts",
      title: translate("about.project.sideMenu.experts"),
      content: <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
        <p>Curabitur consectetur scelerisque arcu, vel eleifend lorem molestie quis. Suspendisse fringilla pellentesque tincidunt. Phasellus aliquam varius placerat. Morbi ac finibus elit. Sed vel porttitor ante. Morbi ac lacinia purus. Mauris accumsan, lectus sit amet tincidunt facilisis, dui metus pellentesque justo, id dapibus libero ex eu libero. Mauris est felis, bibendum vel ligula eu, aliquam gravida felis. Duis laoreet pellentesque diam eget placerat. Vestibulum eleifend ac erat nec volutpat. Vivamus luctus lobortis orci vel sollicitudin. Nunc porttitor sagittis ante maximus rhoncus. Etiam molestie est in accumsan elementum.</p>
        <p>Nulla sit amet vestibulum eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis sollicitudin arcu nec hendrerit. Phasellus dapibus enim cursus purus lobortis, quis aliquam lacus feugiat. Maecenas augue libero, laoreet sit amet convallis ac, fermentum eu tellus. Sed sed cursus quam. Nulla a ultrices mauris. Pellentesque viverra dolor felis, nec tristique risus hendrerit vitae. Donec et diam eros. Donec egestas id urna vitae varius. Donec justo neque, imperdiet vel rutrum eget, scelerisque id massa. Integer ullamcorper vitae risus ac placerat. Suspendisse potenti. Proin quis consequat ipsum.</p>
      </div>
    }
  ];

  return (
    <SideMenuTemplate items={projectItems} />
  );
}

export default Project;
