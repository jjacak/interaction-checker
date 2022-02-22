import React from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import Card from './Card';
import classes from './Modal.module.css';

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay = (props) => {
	return (
		<div className={classes.modal}>
			<header className={classes.header}>
				<h1 className={classes.title}>{props.title}</h1>
			</header>
			<main className={classes.content}>
				<div>{props.children}</div>
				<div className={classes.actions}>
					<Button type="button" onClick={props.onClick}>Close</Button>
				</div>
			</main>
		</div>
	);
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{createPortal(
				<Backdrop onClick={props.onClick} />,
				document.getElementById('modal-root')
			)}
			{createPortal(
				<Overlay title={props.title} onClick={props.onClick}>{props.children}</Overlay>,
				document.getElementById('modal-root')
			)}
		</React.Fragment>
	);
};

export default Modal;