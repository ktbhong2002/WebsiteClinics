import React, { Fragment, Component } from 'react';

import './CustomToast.scss';
// import { FormattedMessage, FormattedTime } from 'react-intl';
import CustomScrollBar from './CustomScrollbars';

export class CustomToast extends Component {
  render() {
    const { titleId, message, messageId, time } = this.props;
    return (
      <div className="custom-toast">
        <div className="toast-title">
          {time && (
            <span className="date">
              {/* <FormattedTime hour="numeric" minute="numeric" second="numeric" hour12 value={time} /> */}
              {time}
            </span>
          )}
          <i className="fa fa-fw fa-exclamation-triangle" />
          <FormattedMessage id={titleId} />
        </div>
        {message && typeof message === 'object' ? (
          <CustomScrollBar autoHeight autoHeightMin={50} autoHeightMax={100}>
            {message.map((msg, index) => (
              <Fragment key={index}>
                <div className="toast-content">{msg}</div>
              </Fragment>
            ))}
          </CustomScrollBar>
        ) : (
          <div className="toast-content">{message || (messageId ? { messageId } : null)}</div>
        )}
      </div>
    );
  }
}

// export class CustomToastCloseButton extends Component {
//   render() {
//     return (
//       <button type="button" className="toast-close" onClick={this.props.closeToast}>
//         <i className="fa fa-fw fa-times-circle" />
//       </button>
//     );
//   }
// }
