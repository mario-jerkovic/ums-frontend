
import React, {Component} from 'react';
import {stack as Menu} from 'react-burger-menu';

export default class HelpSideBar extends Component {
  
  static PropTypes = {
    close: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired
  };
  
  stateChanged = (state) => {
    if (!state.isOpen) {
      this.props.close()
    }
  };

  render() {
    return (
      <Menu right onStateChange={this.stateChanged}  isOpen={this.props.isOpen} width={300}>
        <div>
          1. Червона лінія відмежовує ті заявки з прохідним балом на
          бюджетну форму навчання. Всі заявки які вище червоної межі
          проходять, нижче - ні
        </div>
        <br/>
        <div>
          2. Синя лінія відмежовує заявки які можуть будти зараховані
          на конктрактну форму навчання.
        </div>
      </Menu>
    )
  }
}