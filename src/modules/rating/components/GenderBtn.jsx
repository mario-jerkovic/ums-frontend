
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default ({openHelperSidebar}) =>
  <div>
    <Button onClick={openHelperSidebar}  className="help__btn" bsStyle="default" bsSize="small">
      FAQ <Glyphicon glyph="cd" />
    </Button>
  </div>

