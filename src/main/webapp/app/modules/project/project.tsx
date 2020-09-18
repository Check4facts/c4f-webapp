import './project.scss';
import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { NavHashLink } from 'react-router-hash-link';


export const Project = () => {

  // only consider an event active if its event id is an odd number
  const isActive = hash => (match, location) => location.hash === hash;

  return (
    <div>
      <Row>
        <Col md={3}>
          <div className="d-none d-sm-block project-side-menu">
            <NavHashLink isActive={isActive('#team')} to="#team" smooth replace={false}><Translate contentKey="project.sideMenu.team"/></NavHashLink>
            <NavHashLink isActive={isActive('#funding')} to="#funding" smooth replace={false}><Translate contentKey="project.sideMenu.funding"/></NavHashLink>
            <NavHashLink isActive={isActive('#collaborating')} to="#collaborating" smooth replace={false}><Translate contentKey="project.sideMenu.collaborating"/></NavHashLink>
            <NavHashLink isActive={isActive('#experts')} to="#experts" smooth replace={false}><Translate contentKey="project.sideMenu.experts"/></NavHashLink>
          </div>
        </Col>
        <Col md={9}>
          <Container>
            <Row className="my-5" id="team">
              <Col>
                <h1 className="text-center">
                  {translate("project.sideMenu.team")}
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
                <p>Curabitur consectetur scelerisque arcu, vel eleifend lorem molestie quis. Suspendisse fringilla pellentesque tincidunt. Phasellus aliquam varius placerat. Morbi ac finibus elit. Sed vel porttitor ante. Morbi ac lacinia purus. Mauris accumsan, lectus sit amet tincidunt facilisis, dui metus pellentesque justo, id dapibus libero ex eu libero. Mauris est felis, bibendum vel ligula eu, aliquam gravida felis. Duis laoreet pellentesque diam eget placerat. Vestibulum eleifend ac erat nec volutpat. Vivamus luctus lobortis orci vel sollicitudin. Nunc porttitor sagittis ante maximus rhoncus. Etiam molestie est in accumsan elementum.</p>
                <p>Nulla sit amet vestibulum eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis sollicitudin arcu nec hendrerit. Phasellus dapibus enim cursus purus lobortis, quis aliquam lacus feugiat. Maecenas augue libero, laoreet sit amet convallis ac, fermentum eu tellus. Sed sed cursus quam. Nulla a ultrices mauris. Pellentesque viverra dolor felis, nec tristique risus hendrerit vitae. Donec et diam eros. Donec egestas id urna vitae varius. Donec justo neque, imperdiet vel rutrum eget, scelerisque id massa. Integer ullamcorper vitae risus ac placerat. Suspendisse potenti. Proin quis consequat ipsum.</p>
              </Col>
            </Row>
            <Row className="my-5" id="funding">
              <Col>
                <h1 className="text-center">
                  {translate("project.sideMenu.funding")}
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
                <p>Curabitur consectetur scelerisque arcu, vel eleifend lorem molestie quis. Suspendisse fringilla pellentesque tincidunt. Phasellus aliquam varius placerat. Morbi ac finibus elit. Sed vel porttitor ante. Morbi ac lacinia purus. Mauris accumsan, lectus sit amet tincidunt facilisis, dui metus pellentesque justo, id dapibus libero ex eu libero. Mauris est felis, bibendum vel ligula eu, aliquam gravida felis. Duis laoreet pellentesque diam eget placerat. Vestibulum eleifend ac erat nec volutpat. Vivamus luctus lobortis orci vel sollicitudin. Nunc porttitor sagittis ante maximus rhoncus. Etiam molestie est in accumsan elementum.</p>
                <p>Nulla sit amet vestibulum eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis sollicitudin arcu nec hendrerit. Phasellus dapibus enim cursus purus lobortis, quis aliquam lacus feugiat. Maecenas augue libero, laoreet sit amet convallis ac, fermentum eu tellus. Sed sed cursus quam. Nulla a ultrices mauris. Pellentesque viverra dolor felis, nec tristique risus hendrerit vitae. Donec et diam eros. Donec egestas id urna vitae varius. Donec justo neque, imperdiet vel rutrum eget, scelerisque id massa. Integer ullamcorper vitae risus ac placerat. Suspendisse potenti. Proin quis consequat ipsum.</p>
              </Col>
            </Row>
            <Row className="my-5" id="collaborating">
              <Col>
                <h1 className="text-center">
                  {translate("project.sideMenu.collaborating")}
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
                <p>Curabitur consectetur scelerisque arcu, vel eleifend lorem molestie quis. Suspendisse fringilla pellentesque tincidunt. Phasellus aliquam varius placerat. Morbi ac finibus elit. Sed vel porttitor ante. Morbi ac lacinia purus. Mauris accumsan, lectus sit amet tincidunt facilisis, dui metus pellentesque justo, id dapibus libero ex eu libero. Mauris est felis, bibendum vel ligula eu, aliquam gravida felis. Duis laoreet pellentesque diam eget placerat. Vestibulum eleifend ac erat nec volutpat. Vivamus luctus lobortis orci vel sollicitudin. Nunc porttitor sagittis ante maximus rhoncus. Etiam molestie est in accumsan elementum.</p>
                <p>Nulla sit amet vestibulum eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis sollicitudin arcu nec hendrerit. Phasellus dapibus enim cursus purus lobortis, quis aliquam lacus feugiat. Maecenas augue libero, laoreet sit amet convallis ac, fermentum eu tellus. Sed sed cursus quam. Nulla a ultrices mauris. Pellentesque viverra dolor felis, nec tristique risus hendrerit vitae. Donec et diam eros. Donec egestas id urna vitae varius. Donec justo neque, imperdiet vel rutrum eget, scelerisque id massa. Integer ullamcorper vitae risus ac placerat. Suspendisse potenti. Proin quis consequat ipsum.</p>
              </Col>
            </Row>
            <Row className="my-5" id="experts">
              <Col>
                <h1 className="text-center">
                  {translate("project.sideMenu.experts")}
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
                <p>Curabitur consectetur scelerisque arcu, vel eleifend lorem molestie quis. Suspendisse fringilla pellentesque tincidunt. Phasellus aliquam varius placerat. Morbi ac finibus elit. Sed vel porttitor ante. Morbi ac lacinia purus. Mauris accumsan, lectus sit amet tincidunt facilisis, dui metus pellentesque justo, id dapibus libero ex eu libero. Mauris est felis, bibendum vel ligula eu, aliquam gravida felis. Duis laoreet pellentesque diam eget placerat. Vestibulum eleifend ac erat nec volutpat. Vivamus luctus lobortis orci vel sollicitudin. Nunc porttitor sagittis ante maximus rhoncus. Etiam molestie est in accumsan elementum.</p>
                <p>Nulla sit amet vestibulum eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis sollicitudin arcu nec hendrerit. Phasellus dapibus enim cursus purus lobortis, quis aliquam lacus feugiat. Maecenas augue libero, laoreet sit amet convallis ac, fermentum eu tellus. Sed sed cursus quam. Nulla a ultrices mauris. Pellentesque viverra dolor felis, nec tristique risus hendrerit vitae. Donec et diam eros. Donec egestas id urna vitae varius. Donec justo neque, imperdiet vel rutrum eget, scelerisque id massa. Integer ullamcorper vitae risus ac placerat. Suspendisse potenti. Proin quis consequat ipsum.</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Project;
