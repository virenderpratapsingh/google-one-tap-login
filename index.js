import React, {useEffect, useState} from 'react';
export default props => {
	const [showOverlay, setShowOverlay] = useState(false);
	useEffect(()=>{
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		document.querySelector('body').appendChild(script);
		window.onGoogleLibraryLoad = () => {
			oneTapInit();
		}
	}, []);
	const handleMoment = (momentType, action, reason) => {
		if(props.overlay && action === 'displayed'){
			setShowOverlay(true);
		}else if(props.overlay && action !== 'notdisplayed'){
			setShowOverlay(false);
		}
		props.onPrompt && props.onPrompt(momentType, action, reason);
	}
	const checkIfGoogleOneTapToBeShown = () => {
		if(props.doNotDisplay && props.doNotDisplay()){
			return false;
		}
		return true;
	}
	const oneTapCallback = (response) => {
		props.onSuccess && props.onSuccess(response);
	}
	const oneTapInit = () => {
		if(!google){
			props.onError && props.onError({msg: 'Some error occured while loading the Google Script.'});
		}
		if(!checkIfGoogleOneTapToBeShown()){
			return;
		}
		google.accounts.id.initialize({client_id: props.clientId, callback: oneTapCallback});
		google.accounts.id.prompt(notification => {
			const momentType = notification.getMomentType();
			if(notification.isDisplayed()) {
				setTimeout(()=>{ handleMoment(momentType, 'displayed', 'displayed'); }, 500);
			} else if(notification.isNotDisplayed()){
				handleMoment(momentType, 'notdisplayed', notification.getNotDisplayedReason());
			} else if(notification.isSkippedMoment()) {
				handleMoment(momentType, 'skipped', notification.getSkippedReason());
			} else if(notification.isDismissedMoment()) {
				handleMoment(momentType, 'dismissed', notification.getDismissedReason());
			}
		});
	}
	return props.overlay && showOverlay ? props.overlay : null;
}
