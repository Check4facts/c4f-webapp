import React from 'react';
import { translate } from 'react-jhipster';
import SideMenuTemplate from "app/shared/layout/templates/side-menu-template";


export const Project = () => {

  const projectItems = [
    {
      id: "team",
      title: translate("about.project.sideMenu.team"),
      content: <div>
        <p>Το πρόγραμμα Check4Facts έχει το προνόμιο να αποκομίζει οφέλη από τη συνεργασία διεθνούς φήμης επιστημόνων με ευρύ έργο περί fake news, περί λαϊκισμού και πολιτικής, περί Μέσων Μαζικής Επικοινωνίας και δημοσιογραφίας.</p>
        <p>Η κεντρική ομάδα αποτελείται από τους εξής επιστήμονες:</p>
        <p>Καθηγητή Νίκο Δεμερτζή, Επιστημονικό Υπεύθυνο, Πρόεδρο του Εθνικού Κέντρου Κοινωνικών Ερευνών, Καθηγητή του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p>
        <p>Καθηγητή Γιώργο Πλειό, Πρόεδρο του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p>
        <p>Δρ. Χαράλαμπο Τσέκερη, ερευνητή, Εθνικό Κέντρο Κοινωνικών Ερευνών</p>
        <p>Δρ. Σταμάτη Πουλακιδάκο, ΕΔΙΠ του Τμήματος Επικοινωνίας και ΜΜΕ του Πανεπιστημίου Αθηνών</p>
        <p>Δρ. Γιώργο Παπαστεφανάτο,  ερευνητή του Κέντρο Αθηνά, ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p>
        <p>Δρ. Απόστολο Λινάρδη, ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p>
        <p>Δρ. Μανίνα Κακεπάκη, ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p>
        <p>Δρ. Χριστίνα Φρέντζου, ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p>
        <p>Δρ. Σοφία Καναούτη, συνεργάτιδα ερευνήτρια του Εθνικού Κέντρου Κοινωνικών Ερευνών</p>
        <p>Δρ. Μιχάλη Χατζηκωνσταντίνου, συνεργάτη ερευνητή του Εθνικού Κέντρου Κοινωνικών Ερευνών</p>
      </div>
    },
    {
      id: "funding",
      title: translate("about.project.sideMenu.funding"),
      content: <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
        <p>Curabitur consectetur scelerisque arcu, vel eleifend lorem molestie quis. Suspendisse fringilla pellentesque tincidunt. Phasellus aliquam varius placerat. Morbi ac finibus elit. Sed vel porttitor ante. Morbi ac lacinia purus. Mauris accumsan, lectus sit amet tincidunt facilisis, dui metus pellentesque justo, id dapibus libero ex eu libero. Mauris est felis, bibendum vel ligula eu, aliquam gravida felis. Duis laoreet pellentesque diam eget placerat. Vestibulum eleifend ac erat nec volutpat. Vivamus luctus lobortis orci vel sollicitudin. Nunc porttitor sagittis ante maximus rhoncus. Etiam molestie est in accumsan elementum.</p>
        <p>Nulla sit amet vestibulum eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis sollicitudin arcu nec hendrerit. Phasellus dapibus enim cursus purus lobortis, quis aliquam lacus feugiat. Maecenas augue libero, laoreet sit amet convallis ac, fermentum eu tellus. Sed sed cursus quam. Nulla a ultrices mauris. Pellentesque viverra dolor felis, nec tristique risus hendrerit vitae. Donec et diam eros. Donec egestas id urna vitae varius. Donec justo neque, imperdiet vel rutrum eget, scelerisque id massa. Integer ullamcorper vitae risus ac placerat. Suspendisse potenti. Proin quis consequat ipsum.</p>
      </div>
    },
    {
      id: "collaborating",
      title: translate("about.project.sideMenu.collaborating"),
      content: <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
        <p>Curabitur consectetur scelerisque arcu, vel eleifend lorem molestie quis. Suspendisse fringilla pellentesque tincidunt. Phasellus aliquam varius placerat. Morbi ac finibus elit. Sed vel porttitor ante. Morbi ac lacinia purus. Mauris accumsan, lectus sit amet tincidunt facilisis, dui metus pellentesque justo, id dapibus libero ex eu libero. Mauris est felis, bibendum vel ligula eu, aliquam gravida felis. Duis laoreet pellentesque diam eget placerat. Vestibulum eleifend ac erat nec volutpat. Vivamus luctus lobortis orci vel sollicitudin. Nunc porttitor sagittis ante maximus rhoncus. Etiam molestie est in accumsan elementum.</p>
        <p>Nulla sit amet vestibulum eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis sollicitudin arcu nec hendrerit. Phasellus dapibus enim cursus purus lobortis, quis aliquam lacus feugiat. Maecenas augue libero, laoreet sit amet convallis ac, fermentum eu tellus. Sed sed cursus quam. Nulla a ultrices mauris. Pellentesque viverra dolor felis, nec tristique risus hendrerit vitae. Donec et diam eros. Donec egestas id urna vitae varius. Donec justo neque, imperdiet vel rutrum eget, scelerisque id massa. Integer ullamcorper vitae risus ac placerat. Suspendisse potenti. Proin quis consequat ipsum.</p>
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
