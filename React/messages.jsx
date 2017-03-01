import React from 'react'
import * as styles from './messages.styles';

const Error = (props) => {
    return (
        <div className={styles.errorMessage}>
            <div className={styles.errorIcon}></div>
            {props.children}
        </div>
    )
};

const Information = (props) => {
    return (
        <div className={styles.infoMessage}>
            <div className={styles.infoIcon}></div>
            {props.children}
        </div>
    )
};

const Success = (props) => {
    return (
        <div className={styles.successMessage}>
            <div className={styles.successIcon}></div>
            {props.children}
        </div>
    )
};

const Warning = (props) => {
    return (
        <div className={styles.warningMessage}>
            <div className={styles.warningIcon}></div>
            {props.children}
        </div>
    )
};

export {Error, Information, Success, Warning};