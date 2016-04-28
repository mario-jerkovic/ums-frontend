import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

/**
 * button that calls statistics sidebar;
 * @param openSidebar
 */
export default ({openSidebar}) =>
  <div>
    <Button onClick={openSidebar}  className="help__btn" bsStyle="default" bsSize="small">
      Гендерна статистика <Glyphicon glyph="stats" />
    </Button>
  </div>
